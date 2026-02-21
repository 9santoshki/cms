import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { query } from '@/lib/db/connection';
import { getOrderItems } from '@/lib/db/orders';
import { sendShipmentEmail, sendDeliveryEmail } from '@/lib/email';

/**
 * GET /api/orders/[id] - Get single order details
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB(request.cookies);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const params = await context.params;
    const orderId = params.id;

    // Fetch order with user details
    const orderResult = await query(
      `SELECT o.*, u.name as user_name, u.email as user_email
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

    // Check authorization
    // Users can only see their own orders, admins/moderators can see all
    if (
      order.user_id.toString() !== session.userId &&
      session.role !== 'admin' &&
      session.role !== 'moderator'
    ) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to view this order' },
        { status: 403 }
      );
    }

    // Fetch order items
    const items = await getOrderItems(orderId);

    return NextResponse.json({
      success: true,
      data: {
        ...order,
        items,
      },
    });
  } catch (error: any) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/orders/[id] - Update order status (admin only)
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB(request.cookies);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user is admin or moderator
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const params = await context.params;
    const orderId = params.id;
    const body = await request.json();
    const { status, trackingNumber, carrier, trackingUrl } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Valid values: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Get current order to check if status is actually changing
    const currentOrderResult = await query(
      `SELECT o.*, u.name as customer_name, u.email as customer_email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = $1`,
      [orderId]
    );

    if (currentOrderResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const currentOrder = currentOrderResult.rows[0];
    const statusChanged = currentOrder.status !== status;

    // Update order status
    const updateResult = await query(
      `UPDATE orders
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, orderId]
    );

    if (updateResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Auto-send emails based on status change
    if (statusChanged) {
      try {
        switch (status) {
          case 'shipped':
            // Send shipment notification email
            await sendShipmentEmail(currentOrder.customer_email, {
              orderId: currentOrder.id,
              customerName: currentOrder.customer_name,
              trackingNumber: trackingNumber || 'TBD',
              carrier: carrier || 'Standard Delivery',
              trackingUrl: trackingUrl,
              estimatedDelivery: 'Within 5-7 business days',
            });
            console.log(`✓ Shipment email sent to ${currentOrder.customer_email}`);
            break;

          case 'completed':
            // Send delivery confirmation email
            await sendDeliveryEmail(currentOrder.customer_email, {
              orderId: currentOrder.id,
              customerName: currentOrder.customer_name,
              deliveryDate: new Date().toISOString(),
            });
            console.log(`✓ Delivery email sent to ${currentOrder.customer_email}`);
            break;

          // Add more status-based emails as needed
          default:
            // No email for other statuses
            break;
        }
      } catch (emailError) {
        // Log email error but don't fail the status update
        console.error(`⚠️ Failed to send email for status ${status}:`, emailError);
      }
    }

    return NextResponse.json({
      success: true,
      data: updateResult.rows[0],
      message: `Order status updated to ${status}${statusChanged && (status === 'shipped' || status === 'completed') ? '. Email sent to customer.' : ''}`,
    });
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}
