import { formatOrderNumber } from './orderUtils';

const SELLER_NAME    = 'Colour My Space';
const SELLER_GSTIN   = ''; // e.g. '29ABCDE1234F1Z5'
const SELLER_ADDRESS = 'Bengaluru, Karnataka';
const SELLER_STATE   = 'Karnataka';
const SELLER_WEBSITE = 'colourmyspace.com';

interface AddrObj {
  name?: string; address?: string; city?: string; state?: string;
  zipCode?: string; country?: string; phone?: string;
}
interface InvoiceItem {
  product_name?: string; name?: string;
  quantity: number; price: number | string; hsn_code?: string;
}
interface InvoiceOrder {
  id: number | string; created_at?: string;
  total_amount: number | string; tax_amount?: number | string | null;
  shipping_amount?: number | string | null;
  payment_id?: string;
  shipping_address?: any; billing_address?: any; customer?: any;
  items?: InvoiceItem[];
  user_gstin?: string | null;
}

function parseAddr(raw: any): AddrObj | null {
  if (!raw) return null;
  if (typeof raw === 'string') { try { return JSON.parse(raw); } catch { return null; } }
  return raw as AddrObj;
}

function fmt(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function addrBlock(addr: AddrObj | null): string {
  if (!addr) return '—';
  const lines: string[] = [];
  if (addr.name)    lines.push(`<strong>${addr.name}</strong>`);
  if (addr.address) lines.push(addr.address);
  const cityLine = [addr.city, addr.state].filter(Boolean).join(', ')
    + (addr.zipCode ? ` - ${addr.zipCode}` : '');
  if (cityLine.trim()) lines.push(cityLine);
  if (addr.country && addr.country.toLowerCase() !== 'india') lines.push(addr.country);
  if (addr.phone) lines.push(`Ph: ${addr.phone}`);
  return lines.join('<br>');
}

export function generateInvoiceHTML(order: InvoiceOrder): string {
  const items          = order.items || [];
  const total          = parseFloat(String(order.total_amount ?? 0));
  const taxTotal       = order.tax_amount != null ? parseFloat(String(order.tax_amount)) : 0;
  const shippingAmount = order.shipping_amount != null ? parseFloat(String(order.shipping_amount)) : 0;

  // Prices in DB are GST-inclusive.
  // GST Amount = Price × gstRate / (100 + gstRate)
  // Taxable    = Price - GST Amount  =  Price × 100 / (100 + gstRate)
  const gstRate = taxTotal > 0 && total > taxTotal
    ? (taxTotal / (total - taxTotal)) * 100   // back-compute rate % (e.g. 18)
    : 0;
  const hasTax = gstRate > 0;

  // Same state (Karnataka) → CGST + SGST; different state → IGST.
  const shipAddr     = parseAddr(order.shipping_address) || parseAddr(order.customer) || null;
  const billAddr     = parseAddr(order.billing_address) || shipAddr;
  const buyerState   = shipAddr?.state?.trim() ?? '';
  const isIntraState = buyerState.toLowerCase() === SELLER_STATE.toLowerCase();

  const invoiceNo   = formatOrderNumber(order.id);
  const invoiceDate = order.created_at
    ? new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // ── Per-item rows ─────────────────────────────────────────────────────────
  const itemRows = items.map((item, i) => {
    const unitInclusive = parseFloat(String(item.price ?? 0));
    const qty           = item.quantity || 1;
    const lineTotal     = unitInclusive * qty;

    // Taxable value = Price × 100 / (100 + gstRate)
    const taxableLine = hasTax ? lineTotal * 100 / (100 + gstRate) : lineTotal;
    const unitRate    = hasTax ? unitInclusive * 100 / (100 + gstRate) : unitInclusive;

    // Intra: CGST = taxable × (gstRate/2) / 100,  SGST = same,  IGST = 0
    // Inter: IGST = taxable × gstRate / 100,       CGST = 0,     SGST = 0
    const cgst = isIntraState ? taxableLine * (gstRate / 2) / 100 : 0;
    const sgst = isIntraState ? taxableLine * (gstRate / 2) / 100 : 0;
    const igst = isIntraState ? 0 : taxableLine * gstRate / 100;

    return `
      <tr>
        <td style="text-align:center">${i + 1}</td>
        <td>${item.product_name || item.name || 'Product'}</td>
        <td style="text-align:center">${item.hsn_code || '—'}</td>
        <td style="text-align:center">${qty}</td>
        <td style="text-align:right">₹${fmt(unitRate)}</td>
        <td style="text-align:right">₹${fmt(taxableLine)}</td>
        <td style="text-align:right">${hasTax ? `₹${fmt(cgst)}` : '—'}</td>
        <td style="text-align:right">${hasTax ? `₹${fmt(sgst)}` : '—'}</td>
        <td style="text-align:right">${hasTax ? `₹${fmt(igst)}` : '—'}</td>
        <td style="text-align:right">${hasTax ? `₹${fmt(cgst + sgst + igst)}` : '—'}</td>
        <td style="text-align:right">₹${fmt(lineTotal)}</td>
      </tr>`;
  }).join('');

  // ── Tax summary ───────────────────────────────────────────────────────────
  const taxableTotal = total - taxTotal;
  const halfRate     = gstRate / 2;
  const cgstTotal    = isIntraState ? taxTotal / 2 : 0;
  const sgstTotal    = isIntraState ? taxTotal / 2 : 0;
  const igstTotal    = isIntraState ? 0 : taxTotal;

  const shippingRow = shippingAmount > 0
    ? `<tr><td>Shipping</td><td style="text-align:right">₹${fmt(shippingAmount)}</td></tr>`
    : '';

  const taxSummaryRows = hasTax ? `
    <tr><td>Taxable Value</td><td style="text-align:right"><strong>₹${fmt(taxableTotal)}</strong></td></tr>
    <tr><td>CGST (${halfRate}%)</td><td style="text-align:right">₹${fmt(cgstTotal)}</td></tr>
    <tr><td>SGST (${halfRate}%)</td><td style="text-align:right">₹${fmt(sgstTotal)}</td></tr>
    <tr><td>IGST (${isIntraState ? 0 : gstRate}%)</td><td style="text-align:right">₹${fmt(igstTotal)}</td></tr>
    <tr><td><strong>Total Tax</strong></td><td style="text-align:right"><strong>₹${fmt(taxTotal)}</strong></td></tr>
    ${shippingRow}
    <tr style="background:#f0f0f0"><td><strong>Grand Total</strong></td><td style="text-align:right"><strong>₹${fmt(total)}</strong></td></tr>
  ` : `
    ${shippingRow}
    <tr style="background:#f0f0f0"><td><strong>Grand Total</strong></td><td style="text-align:right"><strong>₹${fmt(total)}</strong></td></tr>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Tax Invoice – ${invoiceNo}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #222; background: #fff; padding: 28px 32px; max-width: 900px; margin: 0 auto; }
  h1.invoice-title { text-align: center; font-size: 20px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 16px; }
  .top-grid, .addr-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #ccc; margin-bottom: 12px; }
  .top-grid > div, .addr-grid > div { padding: 10px 12px; }
  .top-grid > div:first-child, .addr-grid > div:first-child { border-right: 1px solid #ccc; }
  .box-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #666; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 6px; }
  .seller-name { font-size: 14px; font-weight: 700; color: #c19a6b; margin-bottom: 3px; }
  .kv { margin-bottom: 3px; line-height: 1.5; }
  .kv-label { font-weight: 600; color: #444; }
  table.items { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 12px; }
  table.items th { background: #f2f2f2; border: 1px solid #ccc; padding: 6px 7px; font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: .03em; white-space: nowrap; text-align: left; }
  table.items td { border: 1px solid #ddd; padding: 6px 7px; vertical-align: middle; }
  table.items tbody tr:nth-child(even) { background: #fafafa; }
  .summary-wrap { display: flex; justify-content: flex-end; margin-bottom: 20px; }
  table.summary { width: 300px; border-collapse: collapse; font-size: 12px; }
  table.summary td { border: 1px solid #ccc; padding: 6px 10px; }
  table.summary tr:last-child td { font-size: 13px; font-weight: 700; }
  .sig-box { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; font-size: 11px; color: #555; }
  .sig-line { border-top: 1px solid #aaa; margin-top: 40px; padding-top: 4px; text-align: center; width: 180px; }
  .footer { border-top: 1px solid #ddd; padding-top: 10px; text-align: center; font-size: 10px; color: #999; }
  @media print { body { padding: 12px 16px; } @page { size: A4 portrait; margin: 10mm; } }
</style>
</head>
<body>

<h1 class="invoice-title">Tax Invoice</h1>

<div class="top-grid">
  <div>
    <div class="box-label">Seller Details</div>
    <div class="seller-name">${SELLER_NAME}</div>
    ${SELLER_GSTIN ? `<div class="kv">GSTIN: <strong>${SELLER_GSTIN}</strong></div>` : ''}
    <div class="kv">${SELLER_ADDRESS}</div>
  </div>
  <div>
    <div class="box-label">Invoice Details</div>
    <div class="kv"><span class="kv-label">Invoice No.:</span> ${invoiceNo}</div>
    <div class="kv"><span class="kv-label">Invoice Date:</span> ${invoiceDate}</div>
    <div class="kv"><span class="kv-label">Place of Supply:</span> ${buyerState || '—'}</div>
    <div class="kv"><span class="kv-label">Supply Type:</span> ${isIntraState ? 'Intra-State (CGST + SGST)' : 'Inter-State (IGST)'}</div>
    ${order.payment_id ? `<div class="kv"><span class="kv-label">Payment Ref.:</span> <span style="font-size:10px">${order.payment_id}</span></div>` : ''}
  </div>
</div>

<div class="addr-grid">
  <div>
    <div class="box-label">Bill To</div>
    ${addrBlock(billAddr)}
    ${order.user_gstin ? `<br><span style="font-size:11px">GSTIN: <strong>${order.user_gstin}</strong></span>` : ''}
  </div>
  <div><div class="box-label">Ship To</div>${addrBlock(shipAddr)}</div>
</div>

<table class="items">
  <thead>
    <tr>
      <th style="width:32px;text-align:center">Sr.</th>
      <th>Description</th>
      <th style="width:54px;text-align:center">HSN</th>
      <th style="width:40px;text-align:center">Qty</th>
      <th style="width:80px;text-align:right">Rate</th>
      <th style="width:90px;text-align:right">Taxable Value</th>
      <th style="width:72px;text-align:right">CGST</th>
      <th style="width:72px;text-align:right">SGST</th>
      <th style="width:60px;text-align:right">IGST</th>
      <th style="width:72px;text-align:right">Total Tax</th>
      <th style="width:90px;text-align:right">Line Total</th>
    </tr>
  </thead>
  <tbody>${itemRows}</tbody>
</table>

<div class="summary-wrap">
  <table class="summary"><tbody>${taxSummaryRows}</tbody></table>
</div>

<div class="sig-box">
  <div style="font-size:10px;color:#aaa;max-width:300px">
    This is a computer-generated invoice and does not require a physical signature.
  </div>
  <div><div class="sig-line">Authorised Signatory<br><strong>${SELLER_NAME}</strong></div></div>
</div>

<div class="footer">Thank you for shopping with ${SELLER_NAME} &nbsp;·&nbsp; ${SELLER_WEBSITE}</div>

<script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`;
}

export function printInvoice(order: InvoiceOrder): void {
  const win = window.open('', '_blank', 'width=1000,height=750');
  if (!win) {
    alert('Please allow pop-ups to download the invoice.');
    return;
  }
  win.document.write(generateInvoiceHTML(order));
  win.document.close();
}
