import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, generateToken, setTokenCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: 'Tüm alanlar gereklidir' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kullanılıyor' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Generate token
    const token = generateToken(user);

    // Set token cookie
    setTokenCookie(token);

    return NextResponse.json(
      { 
        message: 'Kayıt başarılı',
        user: userWithoutPassword
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 