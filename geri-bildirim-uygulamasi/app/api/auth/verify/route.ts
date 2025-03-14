import { NextResponse } from 'next/server';
import { authService } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    const user = await authService.verifyToken(token);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Token doğrulanırken bir hata oluştu' },
      { status: 400 }
    );
  }
} 