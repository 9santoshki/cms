import { NextRequest, NextResponse } from 'next/server';
import { mockUser } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, email, and password are required' 
        },
        { status: 400 }
      );
    }

    // Mock registration - for development/testing
    if (email === 'john@example.com') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User with this email already exists' 
        },
        { status: 409 }
      );
    }

    // Simulate successful registration
    const newUser = {
      id: mockUser.id,
      name,
      email,
      role: 'customer',
      created_at: new Date().toISOString()
    };

    const token = 'mock-jwt-token-for-development';

    return NextResponse.json(
      { 
        success: true, 
        data: { user: newUser, token } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}