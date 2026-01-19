import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ 
      req,
      secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ 
      authenticated: true,
      user: {
        id: token.id,
        email: token.email,
        role: token.role,
        isAdmin: token.isAdmin,
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}