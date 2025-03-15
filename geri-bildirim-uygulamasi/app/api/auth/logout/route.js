import { NextResponse } from 'next/server';
import { removeTokenCookie } from '@/lib/auth';

export async function POST() {
  try {
    // Remove token cookie
    removeTokenCookie();

    return NextResponse.json(
      { message: 'Çıkış başarılı' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 