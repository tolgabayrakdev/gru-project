import { NextResponse } from 'next/server';
import { authService } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const response = await authService.login({
      email,
      password,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Giriş yapılırken bir hata oluştu' },
      { status: 400 }
    );
  }
} 