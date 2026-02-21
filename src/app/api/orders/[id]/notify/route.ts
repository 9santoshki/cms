import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { query } from '@/lib/db/connection';
import { sendShipmentEmail, sendDeliveryEmail, sendRefundEmail } from '@/lib/email';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Validate admin session
    const session = await getSessionFromCookieWithDB(request);

    if (!session || (session.role !== 'admin' && session.role !== 'moderator')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const params = await context.params;
    const orderId = params.id;
    const body = await request.json();
    const { type, ...emailData } = body;

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Email type is required' },
        { status: 400 }
      );
    }

    // Fetch order details
    const orderResult = await query(
      `SELECT o.*, u.name as customer_name, u.email as customer_email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = $1`,
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const order = orderResult.rows[0];

    // Send appropriate email based on type
    let result;
    switch (type) {
      case 'shipment':
        result = await sendShipmentEmail(order.customer_email, {
          orderId: order.id,
          customerName: order.customer_name,
          trackingNumber: emailData.trackingNumber,
          carrier: emailData.carrier,
          trackingUrl: emailData.trackingUrl,
          estimatedDelivery: emailData.estimatedDelivery,
        });
        break;

      case 'delivery':
        result = await sendDeliveryEmail(order.customer_email, {
          orderId: order.id,
          customerName: order.customer_name,
          deliveryDate: emailData.deliveryDate || new Date().toISOString(),
        });
        break;

      case 'refund':
        result = await sendRefundEmail(order.customer_email, {
          orderId: order.id,
          customerName: order.customer_name,
          refundAmount: emailData.refundAmount || parseFloat(order.total_amount),
          refundReason: emailData.refundReason,
          refundDate: emailData.refundDate || new Date().toISOString(),
        });
        break;

      default:
        return NextResponse.json(
          { success: false, error: `Invalid email type: ${type}. Valid types: shipment, delivery, refund` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: {
        message: `${type} email sent successfully to ${order.customer_email}`,
        result,
      },
    });
  } catch (error: any) {
    console.error('Error sending order notification email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
