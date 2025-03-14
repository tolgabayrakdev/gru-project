import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// Halka açık form detaylarını getir
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formId = params.id;

    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        questions: {
          select: {
            id: true,
            text: true,
            type: true,
            required: true,
            order: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form bulunamadı' }, { status: 404 });
    }

    // Seçenek tipindeki sorular için seçenekleri ekle
    // Not: Gerçek uygulamada bu bilgiler veritabanında saklanmalıdır
    const questionsWithOptions = form.questions.map(question => {
      if (question.type === 'choice' || question.type === 'multipleChoice') {
        return {
          ...question,
          options: ['Seçenek 1', 'Seçenek 2', 'Seçenek 3'], // Örnek seçenekler
        };
      }
      return question;
    });

    return NextResponse.json({
      ...form,
      questions: questionsWithOptions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Form yüklenirken bir hata oluştu' },
      { status: 400 }
    );
  }
} 