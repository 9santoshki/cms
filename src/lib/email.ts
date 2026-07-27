/**
 * Email Service - Send order confirmation and other emails
 * Supports Resend (recommended) and Nodemailer (SMTP fallback)
 */

import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'resend'; // 'resend' or 'smtp'
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@colourmyspace.com';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'Colour My Space';

/**
 * Send email using Resend API
 */
async function sendWithResend(to: string, subject: string, html: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: subject,
      html: html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return await response.json();
}

/**
 * Send email using SMTP (Nodemailer)
 */
async function sendWithSMTP(to: string, subject: string, html: string) {
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration incomplete');
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: to,
    subject: subject,
    html: html,
  });

  return info;
}

/**
 * Main email sending function
 */
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    if (EMAIL_PROVIDER === 'resend') {
      return await sendWithResend(to, subject, html);
    } else if (EMAIL_PROVIDER === 'smtp') {
      return await sendWithSMTP(to, subject, html);
    } else {
      throw new Error(`Unknown email provider: ${EMAIL_PROVIDER}`);
    }
  } catch (err: unknown) {
    console.error('Error sending email:', err);
    throw err;
  }
}

/**
 * Format currency in Indian Rupees
 */
function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

/**
 * Format date in Indian locale
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Generate order confirmation email HTML
 */
export function generateOrderConfirmationEmail(orderData: {
  orderId: string | number;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image_url?: string;
  }>;
  totalAmount: number;
  shippingAddress?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    phone?: string;
  };
  paymentStatus?: string;
}): string {
  const { orderId, customerName, orderDate, items, totalAmount, shippingAddress, paymentStatus } = orderData;

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #f0ebe5;">
        <div style="display: flex; align-items: center;">
          ${item.image_url ? `
            <img src="${item.image_url}" alt="${item.name}"
                 style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
          ` : ''}
          <div>
            <div style="font-weight: 500; color: #1a1a1a; margin-bottom: 4px;">${item.name}</div>
            <div style="font-size: 14px; color: #888;">Qty: ${item.quantity}</div>
          </div>
        </div>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #f0ebe5; text-align: right; font-weight: 600; color: #1a1a1a;">
        ${formatCurrency(item.price * item.quantity)}
      </td>
    </tr>
  `).join('');

  let shippingHtml = '';
  if (shippingAddress) {
    shippingHtml = `
      <div style="margin-top: 30px;">
        <h3 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #c19a6b; margin-bottom: 12px;">
          Delivery Address
        </h3>
        <div style="color: #666; line-height: 1.6;">
          ${shippingAddress.name ? `<div style="font-weight: 500; color: #1a1a1a;">${shippingAddress.name}</div>` : ''}
          ${shippingAddress.address ? `<div>${shippingAddress.address}</div>` : ''}
          <div>
            ${shippingAddress.city ? shippingAddress.city : ''}${shippingAddress.state ? ', ' + shippingAddress.state : ''}${shippingAddress.zipCode ? ' - ' + shippingAddress.zipCode : ''}
          </div>
          ${shippingAddress.country ? `<div>${shippingAddress.country}</div>` : ''}
          ${shippingAddress.phone ? `<div>Phone: ${shippingAddress.phone}</div>` : ''}
        </div>
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Colour My Space</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f3f0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3f0; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px; text-align: center;">
                  <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 40px; color: #28a745;">✓</span>
                  </div>
                  <h1 style="margin: 0; font-size: 28px; color: #ffffff; font-weight: 500;">Order Confirmed!</h1>
                  <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 16px;">Thank you for your purchase, ${customerName}</p>
                </td>
              </tr>

              <!-- Order Details -->
              <tr>
                <td style="padding: 40px;">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                    <div>
                      <h3 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #c19a6b; margin: 0 0 12px 0;">
                        Order Information
                      </h3>
                      <div style="color: #666; line-height: 1.8;">
                        <div><strong style="color: #1a1a1a;">Order ID:</strong> #${orderId}</div>
                        <div><strong style="color: #1a1a1a;">Date:</strong> ${formatDate(orderDate)}</div>
                        <div>
                          <strong style="color: #1a1a1a;">Status:</strong>
                          <span style="display: inline-block; margin-left: 8px; padding: 4px 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; background: #d1fae5; color: #065f46; border-radius: 12px;">
                            ${paymentStatus || 'Paid'}
                          </span>
                        </div>
                      </div>
                    </div>
                    ${shippingAddress ? `<div>${shippingHtml}</div>` : ''}
                  </div>

                  <!-- Order Items -->
                  <div style="margin-top: 30px;">
                    <h3 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #c19a6b; margin: 0 0 16px 0;">
                      Order Items
                    </h3>
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #f0ebe5;">
                      ${itemsHtml}
                    </table>
                  </div>

                  <!-- Total -->
                  <div style="margin-top: 24px; padding: 24px; background: linear-gradient(135deg, #faf9f7 0%, #f5f3f0 100%); border-radius: 12px; border-top: 2px solid #c19a6b;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a;">
                        Grand Total
                      </span>
                      <span style="font-size: 24px; font-weight: 600; color: #c19a6b;">
                        ${formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>

                  <!-- CTA Button -->
                  <div style="margin-top: 30px; text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/orders"
                       style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #c19a6b 0%, #a67c52 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                      View Order Details
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px; background-color: #faf9f7; border-top: 1px solid #f0ebe5; text-align: center;">
                  <p style="margin: 0 0 15px; color: #666; font-size: 14px; line-height: 1.6;">
                    We'll notify you when your order is ready for delivery.
                  </p>
                  <p style="margin: 0 0 15px; color: #666; font-size: 14px; line-height: 1.6;">
                    Need help? Contact us at:<br>
                    <a href="tel:+919513351833" style="color: #c19a6b; text-decoration: none;">+91 95133 51833</a> |
                    <a href="mailto:rajnishkumarranjan@gmail.com" style="color: #c19a6b; text-decoration: none;">rajnishkumarranjan@gmail.com</a>
                  </p>
                  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #f0ebe5;">
                    <p style="margin: 0; color: #888; font-size: 12px;">
                      Colour My Space<br>
                      Indiranagar, Bengaluru<br>
                      <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #c19a6b; text-decoration: none;">${process.env.NEXT_PUBLIC_APP_URL}</a>
                    </p>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(
  customerEmail: string,
  orderData: Parameters<typeof generateOrderConfirmationEmail>[0]
) {
  const subject = `Order Confirmation #${orderData.orderId} - Colour My Space`;
  const html = generateOrderConfirmationEmail(orderData);

  return await sendEmail(customerEmail, subject, html);
}

/**
 * Generate shipment notification email HTML
 */
export function generateShipmentEmail(orderData: {
  orderId: string | number;
  customerName: string;
  trackingNumber?: string;
  carrier?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
}): string {
  const { orderId, customerName, trackingNumber, carrier, trackingUrl, estimatedDelivery } = orderData;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Shipped - Colour My Space</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f3f0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3f0; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px; text-align: center;">
                  <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 40px;">📦</span>
                  </div>
                  <h1 style="margin: 0; font-size: 28px; color: #ffffff; font-weight: 500;">Your Order Has Shipped!</h1>
                  <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 16px;">Hi ${customerName}, your order is on its way</p>
                </td>
              </tr>

              <!-- Shipment Details -->
              <tr>
                <td style="padding: 40px;">
                  <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #c19a6b; margin: 0 0 16px 0;">
                      Shipment Information
                    </h3>
                    <div style="color: #666; line-height: 1.8;">
                      <div><strong style="color: #1a1a1a;">Order ID:</strong> #${orderId}</div>
                      ${trackingNumber ? `<div><strong style="color: #1a1a1a;">Tracking Number:</strong> ${trackingNumber}</div>` : ''}
                      ${carrier ? `<div><strong style="color: #1a1a1a;">Carrier:</strong> ${carrier}</div>` : ''}
                      ${estimatedDelivery ? `<div><strong style="color: #1a1a1a;">Estimated Delivery:</strong> ${estimatedDelivery}</div>` : ''}
                    </div>
                  </div>

                  <!-- CTA Button -->
                  ${trackingUrl ? `
                  <div style="margin-top: 30px; text-align: center;">
                    <a href="${trackingUrl}"
                       style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #c19a6b 0%, #a67c52 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                      Track Your Order
                    </a>
                  </div>
                  ` : ''}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px; background-color: #faf9f7; border-top: 1px solid #f0ebe5; text-align: center;">
                  <p style="margin: 0 0 15px; color: #666; font-size: 14px; line-height: 1.6;">
                    Need help? Contact us at:<br>
                    <a href="tel:+919513351833" style="color: #c19a6b; text-decoration: none;">+91 95133 51833</a> |
                    <a href="mailto:rajnishkumarranjan@gmail.com" style="color: #c19a6b; text-decoration: none;">rajnishkumarranjan@gmail.com</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Generate delivery confirmation email HTML
 */
export function generateDeliveryEmail(orderData: {
  orderId: string | number;
  customerName: string;
  deliveryDate: string;
}): string {
  const { orderId, customerName, deliveryDate } = orderData;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Delivered - Colour My Space</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f3f0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3f0; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px; text-align: center;">
                  <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 40px; color: #28a745;">🎉</span>
                  </div>
                  <h1 style="margin: 0; font-size: 28px; color: #ffffff; font-weight: 500;">Your Order Has Been Delivered!</h1>
                  <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 16px;">Hi ${customerName}, enjoy your new purchase</p>
                </td>
              </tr>

              <!-- Delivery Details -->
              <tr>
                <td style="padding: 40px;">
                  <div style="margin-bottom: 30px; text-align: center;">
                    <h3 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #c19a6b; margin: 0 0 16px 0;">
                      Delivery Confirmed
                    </h3>
                    <p style="color: #666; line-height: 1.8;">
                      <strong style="color: #1a1a1a;">Order ID:</strong> #${orderId}<br>
                      <strong style="color: #1a1a1a;">Delivered on:</strong> ${formatDate(deliveryDate)}
                    </p>
                  </div>

                  <div style="margin: 30px 0; padding: 20px; background: #fef3c7; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                      <strong>Love your purchase?</strong><br>
                      We'd appreciate it if you could leave a review!
                    </p>
                  </div>

                  <!-- CTA Button -->
                  <div style="margin-top: 30px; text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/orders"
                       style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #c19a6b 0%, #a67c52 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                      Leave a Review
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px; background-color: #faf9f7; border-top: 1px solid #f0ebe5; text-align: center;">
                  <p style="margin: 0 0 15px; color: #666; font-size: 14px; line-height: 1.6;">
                    Thank you for shopping with Colour My Space!
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Generate refund confirmation email HTML
 */
export function generateRefundEmail(orderData: {
  orderId: string | number;
  customerName: string;
  refundAmount: number;
  refundReason?: string;
  refundDate: string;
}): string {
  const { orderId, customerName, refundAmount, refundReason, refundDate } = orderData;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Refund Processed - Colour My Space</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f3f0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3f0; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px; text-align: center;">
                  <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 40px; color: #1e40af;">💳</span>
                  </div>
                  <h1 style="margin: 0; font-size: 28px; color: #ffffff; font-weight: 500;">Refund Processed</h1>
                  <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 16px;">Hi ${customerName}, your refund has been initiated</p>
                </td>
              </tr>

              <!-- Refund Details -->
              <tr>
                <td style="padding: 40px;">
                  <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #c19a6b; margin: 0 0 16px 0;">
                      Refund Information
                    </h3>
                    <div style="color: #666; line-height: 1.8;">
                      <div><strong style="color: #1a1a1a;">Order ID:</strong> #${orderId}</div>
                      <div><strong style="color: #1a1a1a;">Refund Amount:</strong> ${formatCurrency(refundAmount)}</div>
                      <div><strong style="color: #1a1a1a;">Processed on:</strong> ${formatDate(refundDate)}</div>
                      ${refundReason ? `<div><strong style="color: #1a1a1a;">Reason:</strong> ${refundReason}</div>` : ''}
                    </div>
                  </div>

                  <div style="margin: 30px 0; padding: 20px; background: #dbeafe; border-radius: 8px;">
                    <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6; text-align: center;">
                      <strong>Please note:</strong> It may take 5-7 business days for the refund to reflect in your account, depending on your bank or payment provider.
                    </p>
                  </div>

                  <!-- CTA Button -->
                  <div style="margin-top: 30px; text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/orders"
                       style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #c19a6b 0%, #a67c52 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                      View Order History
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px; background-color: #faf9f7; border-top: 1px solid #f0ebe5; text-align: center;">
                  <p style="margin: 0 0 15px; color: #666; font-size: 14px; line-height: 1.6;">
                    If you have any questions, please contact us at:<br>
                    <a href="tel:+919513351833" style="color: #c19a6b; text-decoration: none;">+91 95133 51833</a> |
                    <a href="mailto:rajnishkumarranjan@gmail.com" style="color: #c19a6b; text-decoration: none;">rajnishkumarranjan@gmail.com</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Send shipment notification email
 */
export async function sendShipmentEmail(
  customerEmail: string,
  orderData: Parameters<typeof generateShipmentEmail>[0]
) {
  const subject = `Your Order #${orderData.orderId} Has Shipped - Colour My Space`;
  const html = generateShipmentEmail(orderData);

  return await sendEmail(customerEmail, subject, html);
}

/**
 * Send delivery confirmation email
 */
export async function sendDeliveryEmail(
  customerEmail: string,
  orderData: Parameters<typeof generateDeliveryEmail>[0]
) {
  const subject = `Your Order #${orderData.orderId} Has Been Delivered - Colour My Space`;
  const html = generateDeliveryEmail(orderData);

  return await sendEmail(customerEmail, subject, html);
}

/**
 * Send refund confirmation email
 */
export async function sendRefundEmail(
  customerEmail: string,
  orderData: Parameters<typeof generateRefundEmail>[0]
) {
  const subject = `Refund Processed for Order #${orderData.orderId} - Colour My Space`;
  const html = generateRefundEmail(orderData);

  return await sendEmail(customerEmail, subject, html);
}

// ─── Supplier coordination emails ─────────────────────────────────────────────

// ─── Internal utilities ───────────────────────────────────────────────────────

/** Escape user-supplied strings before embedding them in HTML email templates. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate variant assignment notification email for a supplier.
 * Sent when admin assigns a new product variant to the supplier.
 */
export function generateVariantAssignmentEmail(data: {
  supplierName: string;
  productName: string;
  variantName: string;
  sku?: string;
  price: number;
  assignedByName: string;
}): string {
  const { supplierName, productName, variantName, sku, price, assignedByName } = data;
  const portalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/supplier`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Variant Assignment - Colour My Space</title>
    </head>
    <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f5f3f0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f3f0;padding:40px 20px;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.04);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);padding:40px;text-align:center;">
                <div style="width:80px;height:80px;margin:0 auto 20px;background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:40px;">📦</span>
                </div>
                <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:500;">New Product Assignment</h1>
                <p style="margin:10px 0 0;color:rgba(255,255,255,0.8);font-size:16px;">Hi ${escapeHtml(supplierName)}, you've been assigned a new variant to supply</p>
              </td>
            </tr>

            <!-- Details -->
            <tr>
              <td style="padding:40px;">
                <h3 style="font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#c19a6b;margin:0 0 16px 0;">
                  Variant Details
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ebe5;border-radius:8px;overflow:hidden;">
                  <tr style="background:#faf9f7;">
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;width:40%;">Product</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;font-weight:500;">${escapeHtml(productName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;border-top:1px solid #f0ebe5;">Variant</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-top:1px solid #f0ebe5;">${escapeHtml(variantName) || 'Default'}</td>
                  </tr>
                  ${sku ? `
                  <tr style="background:#faf9f7;">
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;border-top:1px solid #f0ebe5;">SKU</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;font-family:monospace;border-top:1px solid #f0ebe5;">${escapeHtml(sku)}</td>
                  </tr>` : ''}
                  <tr ${sku ? '' : 'style="background:#faf9f7;"'}>
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;border-top:1px solid #f0ebe5;">Price</td>
                    <td style="padding:12px 16px;font-size:14px;color:#c19a6b;font-weight:600;border-top:1px solid #f0ebe5;">₹${Number(price).toFixed(2)}</td>
                  </tr>
                  <tr ${sku ? 'style="background:#faf9f7;"' : ''}>
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;border-top:1px solid #f0ebe5;">Assigned by</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-top:1px solid #f0ebe5;">${escapeHtml(assignedByName)}</td>
                  </tr>
                </table>

                <div style="margin:24px 0;padding:16px;background:rgba(193,154,107,0.08);border-left:4px solid #c19a6b;border-radius:0 8px 8px 0;">
                  <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                    <strong style="color:#1a1a1a;">Action required:</strong> Please log in to your supplier portal and update the stock quantity for this variant so customers can place orders.
                  </p>
                </div>

                <div style="margin-top:30px;text-align:center;">
                  <a href="${portalUrl}"
                     style="display:inline-block;padding:16px 32px;background:linear-gradient(135deg,#c19a6b 0%,#a67c52 100%);color:#ffffff;text-decoration:none;border-radius:8px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">
                    Update Stock in Portal
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 40px;background-color:#faf9f7;border-top:1px solid #f0ebe5;text-align:center;">
                <p style="margin:0;color:#888;font-size:13px;line-height:1.6;">
                  Colour My Space · Indiranagar, Bengaluru<br>
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#c19a6b;text-decoration:none;">${process.env.NEXT_PUBLIC_APP_URL}</a>
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

/** Send variant assignment notification to supplier */
export async function sendVariantAssignmentEmail(
  supplierEmail: string,
  data: Parameters<typeof generateVariantAssignmentEmail>[0]
) {
  const subject = `New Product Assignment: ${data.productName} – Colour My Space`;
  const html = generateVariantAssignmentEmail(data);
  return await sendEmail(supplierEmail, subject, html);
}

/**
 * Generate restock request email for a supplier.
 * Sent when admin manually requests a supplier to restock a variant.
 */
export function generateRestockRequestEmail(data: {
  supplierName: string;
  productName: string;
  variantName: string;
  sku?: string;
  currentStock: number;
  requestedByName: string;
  adminNote?: string;
}): string {
  const { supplierName, productName, variantName, sku, currentStock, requestedByName, adminNote } =
    data;
  const portalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/supplier`;
  const isZero = currentStock <= 0;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restock Request - Colour My Space</title>
    </head>
    <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f5f3f0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f3f0;padding:40px 20px;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.04);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,${isZero ? '#991b1b 0%,#b91c1c' : '#92400e 0%,#b45309'} 100%);padding:40px;text-align:center;">
                <div style="width:80px;height:80px;margin:0 auto 20px;background:${isZero ? 'rgba(254,226,226,0.9)' : 'rgba(254,243,199,0.9)'};border-radius:50%;display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:40px;">${isZero ? '🚨' : '⚠️'}</span>
                </div>
                <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:500;">
                  ${isZero ? 'Item Out of Stock' : 'Low Stock Alert'}
                </h1>
                <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:16px;">
                  Hi ${escapeHtml(supplierName)}, your stock replenishment is needed
                </p>
              </td>
            </tr>

            <!-- Details -->
            <tr>
              <td style="padding:40px;">

                <!-- Alert box -->
                <div style="margin-bottom:24px;padding:16px;background:${isZero ? 'rgba(254,226,226,0.6)' : 'rgba(254,243,199,0.6)'};border-left:4px solid ${isZero ? '#ef4444' : '#f59e0b'};border-radius:0 8px 8px 0;">
                  <p style="margin:0;font-size:14px;color:${isZero ? '#991b1b' : '#92400e'};line-height:1.6;font-weight:500;">
                    ${isZero
                      ? 'This item is <strong>out of stock</strong>. Customers cannot place orders until stock is updated.'
                      : `This item has <strong>only ${currentStock} unit${currentStock === 1 ? '' : 's'} remaining</strong>. Please restock soon.`}
                  </p>
                </div>

                <h3 style="font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#c19a6b;margin:0 0 16px 0;">
                  Item Details
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ebe5;border-radius:8px;overflow:hidden;margin-bottom:24px;">
                  <tr style="background:#faf9f7;">
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;width:40%;">Product</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;font-weight:500;">${escapeHtml(productName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;border-top:1px solid #f0ebe5;">Variant</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-top:1px solid #f0ebe5;">${escapeHtml(variantName) || 'Default'}</td>
                  </tr>
                  ${sku ? `
                  <tr style="background:#faf9f7;">
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;border-top:1px solid #f0ebe5;">SKU</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;font-family:monospace;border-top:1px solid #f0ebe5;">${escapeHtml(sku)}</td>
                  </tr>` : ''}
                  <tr ${sku ? 'style="background:#faf9f7;"' : ''}>
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;border-top:1px solid #f0ebe5;">Current Stock</td>
                    <td style="padding:12px 16px;font-size:14px;font-weight:700;color:${isZero ? '#ef4444' : '#f59e0b'};border-top:1px solid #f0ebe5;">
                      ${isZero ? '0 units (OUT OF STOCK)' : `${currentStock} units`}
                    </td>
                  </tr>
                  <tr ${sku ? '' : 'style="background:#faf9f7;"'}>
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;border-top:1px solid #f0ebe5;">Requested by</td>
                    <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-top:1px solid #f0ebe5;">${escapeHtml(requestedByName)}</td>
                  </tr>
                </table>

                ${adminNote ? `
                <div style="margin-bottom:24px;padding:16px;background:#f0f9ff;border-left:4px solid #3b82f6;border-radius:0 8px 8px 0;">
                  <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#1e40af;text-transform:uppercase;letter-spacing:0.5px;">Note from Admin</p>
                  <p style="margin:0;font-size:14px;color:#1e3a8a;line-height:1.6;">${escapeHtml(adminNote)}</p>
                </div>` : ''}

                <div style="margin-top:30px;text-align:center;">
                  <a href="${portalUrl}"
                     style="display:inline-block;padding:16px 32px;background:linear-gradient(135deg,#c19a6b 0%,#a67c52 100%);color:#ffffff;text-decoration:none;border-radius:8px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">
                    Update Stock Now
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 40px;background-color:#faf9f7;border-top:1px solid #f0ebe5;text-align:center;">
                <p style="margin:0;color:#888;font-size:13px;line-height:1.6;">
                  Colour My Space · Indiranagar, Bengaluru<br>
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#c19a6b;text-decoration:none;">${process.env.NEXT_PUBLIC_APP_URL}</a>
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

/** Send restock request email to supplier */
export async function sendRestockRequestEmail(
  supplierEmail: string,
  data: Parameters<typeof generateRestockRequestEmail>[0]
) {
  const urgency = data.currentStock <= 0 ? '🚨 URGENT: ' : '⚠️ ';
  const subject = `${urgency}Restock Needed: ${data.productName} – Colour My Space`;
  const html = generateRestockRequestEmail(data);
  return await sendEmail(supplierEmail, subject, html);
}

/**
 * Send a stock discrepancy alert to all admin email addresses.
 * Called when stock deduction fails after a confirmed payment — the payment
 * is already captured so the order must NOT be cancelled, but admins need to
 * know to reconcile inventory manually.
 */
export async function sendStockDiscrepancyAlert(data: {
  orderId: number;
  variantId: number;
  quantity: number;
  error: string;
}): Promise<void> {
  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);

  if (adminEmails.length === 0) {
    console.warn('[sendStockDiscrepancyAlert] ADMIN_EMAILS not configured — alert not sent');
    return;
  }

  const subject = `⚠️ Stock Discrepancy: Order #${data.orderId} — Manual Action Required`;
  const html = `
    <!DOCTYPE html><html><body style="font-family:sans-serif;padding:24px;">
      <h2 style="color:#991b1b;">⚠️ Stock Deduction Failed — Action Required</h2>
      <p>A payment was successfully captured but the inventory could not be automatically updated.</p>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">Order ID</td><td style="padding:8px;border:1px solid #e5e7eb;">#${data.orderId}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">Variant ID</td><td style="padding:8px;border:1px solid #e5e7eb;">${data.variantId}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">Quantity</td><td style="padding:8px;border:1px solid #e5e7eb;">${data.quantity}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">Error</td><td style="padding:8px;border:1px solid #e5e7eb;color:#991b1b;">${escapeHtml(data.error)}</td></tr>
      </table>
      <p style="margin-top:16px;"><strong>Action required:</strong> Log in to the admin dashboard and manually update the stock for variant #${data.variantId} to reflect the deduction of ${data.quantity} unit(s) sold in Order #${data.orderId}.</p>
      <p style="color:#6b7280;font-size:13px;">Colour My Space · ${process.env.NEXT_PUBLIC_APP_URL}</p>
    </body></html>
  `;

  for (const email of adminEmails) {
    try {
      await sendEmail(email, subject, html);
    } catch (err) {
      console.error(`[sendStockDiscrepancyAlert] Failed to send to ${email}:`, err);
    }
  }
}
