import { NextRequest, NextResponse } from 'next/server';
import { mockUser } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email and password are required' 
        },
        { status: 400 }
      );
    }

    // Mock authentication - for development/testing
    if (email === 'john@example.com' && password === 'password') {
      // Simulate a token
      const token = 'mock-jwt-token-for-development';
      
      return NextResponse.json(
        { 
          success: true, 
          data: { user: mockUser, token } 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}