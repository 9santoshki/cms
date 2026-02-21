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
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
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
