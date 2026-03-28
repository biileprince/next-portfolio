import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

// Secret used only for dashboard login, loaded from .env.local
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only-change-this';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const jwt = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    const response = NextResponse.json({ success: true });
    response.cookies.set('adminAuth', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
