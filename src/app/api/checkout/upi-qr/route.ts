/**
 * Generates a UPI "Scan and Pay" QR code for the given amount, using the
 * merchant VPA/payee name configured in site_settings (Dashboard → Settings).
 *
 * The QR encodes a standard UPI deep link (upi://pay?...) understood by every
 * UPI app (BHIM, GPay, PhonePe, etc.), with the order amount pre-filled so the
 * customer only has to scan and confirm.
 */
import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getSettings } from '@/lib/db/settings';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    const { amount } = await request.json();
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      return NextResponse.json({ success: false, error: 'A valid amount is required' }, { status: 400 });
    }

    const settings = await getSettings();
    if (!settings.upi.enabled || !settings.upi.vpa) {
      return NextResponse.json({ success: false, error: 'UPI payment is not available' }, { status: 400 });
    }

    const upiUri =
      `upi://pay?pa=${encodeURIComponent(settings.upi.vpa)}` +
      `&pn=${encodeURIComponent(settings.upi.payee_name || 'Merchant')}` +
      `&am=${numericAmount.toFixed(2)}` +
      `&cu=INR` +
      `&tn=${encodeURIComponent('Order payment')}`;

    const qrDataUrl = await QRCode.toDataURL(upiUri, { width: 320, margin: 1 });

    return NextResponse.json({
      success: true,
      data: {
        qr_data_url: qrDataUrl,
        vpa: settings.upi.vpa,
        payee_name: settings.upi.payee_name,
        amount: numericAmount,
      },
    });
  } catch (err) {
    console.error('[checkout/upi-qr] Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to generate payment QR code' }, { status: 500 });
  }
}
