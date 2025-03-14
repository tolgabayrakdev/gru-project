import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authService } from '@/app/lib/auth';

// Tüm formları getir
export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const user = await authService.verifyToken(token);

    const forms = await prisma.form.findMany({
      where: {
        userId: user.id,
      },
      include: {
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
    });

    return NextResponse.json(forms);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Formlar yüklenirken bir hata oluştu' },
      { status: 400 }
    );
  }
}

// Yeni form oluştur
export async function POST(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const user = await authService.verifyToken(token);
    const body = await request.json();
    const { title, description, questions } = body;

    if (!title) {
      return NextResponse.json({ error: 'Form başlığı gereklidir' }, { status: 400 });
    }

    const form = await prisma.form.create({
      data: {
        title,
        description: description || '',
        userId: user.id,
        questions: {
          create: questions.map((question: any) => ({
            text: question.text,
            type: question.type,
            required: question.required,
            order: question.order,
          })),
        },
      },
    });

    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Form oluşturulurken bir hata oluştu' },
      { status: 400 }
    );
  }
} 