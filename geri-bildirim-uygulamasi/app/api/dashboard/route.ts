import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authService } from '@/app/lib/auth';

// Dashboard verilerini getir
export async function GET(request: Request) {
  try {
    // Authorization header'dan token'ı al
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const user = await authService.verifyToken(token);

    // Son formları getir
    const recentForms = await prisma.form.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        _count: {
          select: {
            questions: true,
            feedbacks: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    // Son geri bildirimleri getir
    const recentFeedbacks = await prisma.feedback.findMany({
      where: {
        form: {
          userId: user.id,
        },
      },
      select: {
        id: true,
        createdAt: true,
        form: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    return NextResponse.json({
      recentForms,
      recentFeedbacks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Dashboard verileri yüklenirken bir hata oluştu' },
      { status: 400 }
    );
  }
} 