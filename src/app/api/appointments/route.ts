import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { createAppointment, getAppointmentsByUserId, getAllAppointments } from '@/lib/db/appointments';

export async function GET(_request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const appointments = (session.role === 'admin' || session.role === 'moderator')
      ? await getAllAppointments()
      : await getAppointmentsByUserId(session.userId);

    return NextResponse.json({ success: true, data: appointments });
  } catch (err: unknown) {
    console.error('[appointments GET] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();

    const { appointment_date, service_type, notes, name, email, phone } = await request.json();

    if (!session) {
      // Guest booking — require name, email, phone
      if (!name || !email || !phone) {
        return NextResponse.json(
          { success: false, error: 'Name, email, and phone are required for guest bookings' },
          { status: 400 }
        );
      }
    }

    if (!appointment_date) {
      return NextResponse.json(
        { success: false, error: 'Appointment date is required' },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
      return NextResponse.json(
        { success: false, error: 'Appointment date cannot be in the past' },
        { status: 400 }
      );
    }

    const appointment = await createAppointment({
      user_id: session?.userId ?? undefined,
      appointment_date,
      service_type,
      notes,
      guest_name: !session ? name : undefined,
      guest_email: !session ? email : undefined,
      guest_phone: !session ? phone : undefined,
    });

    return NextResponse.json({ success: true, data: appointment }, { status: 201 });
  } catch (err: unknown) {
    console.error('[appointments POST] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
