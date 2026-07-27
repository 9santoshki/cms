import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from '@/lib/db/appointments';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const appointment = await getAppointmentById(id);

    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Admins/moderators can view any appointment; users can only view their own
    if (
      session.role !== 'admin' &&
      session.role !== 'moderator' &&
      appointment.user_id !== session.userId
    ) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: appointment });
  } catch (err: unknown) {
    console.error('[appointments/[id] GET] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const { status, notes, service_type, appointment_date } = await request.json();

    const existingAppointment = await getAppointmentById(id);

    if (
      !existingAppointment ||
      (session.role !== 'admin' &&
        session.role !== 'moderator' &&
        existingAppointment.user_id !== session.userId)
    ) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    if (status && !['scheduled', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
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

    return NextResponse.json({ success: true, data: updatedAppointment });
  } catch (err: unknown) {
    console.error('[appointments/[id] PUT] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const existingAppointment = await getAppointmentById(id);

    if (
      !existingAppointment ||
      (session.role !== 'admin' &&
        session.role !== 'moderator' &&
        existingAppointment.user_id !== session.userId)
    ) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    if (existingAppointment.status === 'completed') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete a completed appointment' },
        { status: 400 }
      );
    }

    const deleted = await deleteAppointment(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (err: unknown) {
    console.error('[appointments/[id] DELETE] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
