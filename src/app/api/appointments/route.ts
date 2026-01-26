import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie, getUserProfile } from '@/lib/db/auth';
import { createAppointment, getAppointmentsByUserId, getAllAppointments } from '@/lib/db/appointments';

async function getUserFromRequest(request: NextRequest) {
  try {
    const session = await getSessionFromCookie();
    if (!session?.userId) return null;

    const profile = await getUserProfile(session.userId);
    return profile ? { userId: session.userId, role: profile.role } : null;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
        'Access-Control-Allow-Headers':
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
      },
    }
  );
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const appointments = (user.role === 'admin' || user.role === 'moderator')
      ? await getAllAppointments()
      : await getAppointmentsByUserId(user.userId);

    return NextResponse.json(
      {
        success: true,
        data: appointments,
      },
      {
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          'Access-Control-Allow-Headers':
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          'Access-Control-Allow-Headers':
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);

    const { appointment_date, service_type, notes, name, email, phone } = await request.json();

    if (!user) {
      if (!name || !email || !phone) {
        return NextResponse.json(
          { success: false, error: 'Name, email, and phone are required' },
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
      user_id: user?.userId || undefined,
      appointment_date,
      service_type,
      notes,
      guest_name: !user ? name : undefined,
      guest_email: !user ? email : undefined,
      guest_phone: !user ? phone : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        data: appointment,
      },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          'Access-Control-Allow-Headers':
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
        },
      }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          'Access-Control-Allow-Headers':
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
        },
      }
    );
  }
}
