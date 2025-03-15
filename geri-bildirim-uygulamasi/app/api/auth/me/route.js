import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getTokenCookie, verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    // Get token from cookie
    const token = getTokenCookie();

    if (!token) {
      return NextResponse.json(
        { message: 'Yetkilendirme hatası' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: 'Geçersiz token' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 