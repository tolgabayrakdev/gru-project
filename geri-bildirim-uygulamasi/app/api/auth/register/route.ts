import { NextResponse } from 'next/server';
import { authService } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    const response = await authService.register({
      email,
      password,
      firstName,
      lastName,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Kayıt olurken bir hata oluştu' },
      { status: 400 }
    );
  }
} 