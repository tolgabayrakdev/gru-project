import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { comparePasswords, generateToken, setTokenCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-posta ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Generate token
    const token = generateToken(user);

    // Set token cookie
    setTokenCookie(token);

    return NextResponse.json(
      { 
        message: 'Giriş başarılı',
        user: userWithoutPassword
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 