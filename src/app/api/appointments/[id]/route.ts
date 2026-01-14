import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie } from '@/lib/db/auth';
import {
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from '@/lib/db/appointments';

// Verify user session and get user ID
async function getUserIdFromRequest(request: NextRequest) {
  try {
    const session = await getSessionFromCookie();
    return session?.userId || null;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const params = await context.params;
    const { id } = params;

    const appointment = await getAppointmentById(id);

    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Ensure user can only access their own appointments
    if (appointment.user_id !== userId) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const params = await context.params;
    const { id } = params;
    const { status, notes, service_type, appointment_date } = await request.json();

    // Verify the appointment exists and belongs to the user
    const existingAppointment = await getAppointmentById(id);

    if (!existingAppointment || existingAppointment.user_id !== userId) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Validate status if provided
    if (status && !['scheduled', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (service_type) updateData.service_type = service_type;
    if (appointment_date) updateData.appointment_date = appointment_date;

    const updatedAppointment = await updateAppointment(id, updateData);

    if (!updatedAppointment) {
      return NextResponse.json(
        { success: false, error: 'Failed to update appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedAppointment,
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const params = await context.params;
    const { id } = params;

    // Verify the appointment exists and belongs to the user
    const existingAppointment = await getAppointmentById(id);

    if (!existingAppointment || existingAppointment.user_id !== userId) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Only allow deletion for scheduled or cancelled appointments
    if (existingAppointment.status === 'completed') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete a completed appointment' },
        { status: 400 }
      );
    }

    const success = await deleteAppointment(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
