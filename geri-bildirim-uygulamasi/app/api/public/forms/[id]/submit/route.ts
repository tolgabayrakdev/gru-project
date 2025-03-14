import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// Geri bildirim gönder
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formId = params.id;
    const body = await request.json();
    const { answers } = body;

    // Form var mı kontrol et
    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
      include: {
        questions: {
          where: {
            required: true,
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form bulunamadı' }, { status: 404 });
    }

    // Zorunlu soruların cevaplanıp cevaplanmadığını kontrol et
    const requiredQuestionIds = form.questions.map(q => q.id);
    const answeredQuestionIds = answers.map((a: any) => a.questionId);
    
    const missingRequiredQuestions = requiredQuestionIds.filter(
      id => !answeredQuestionIds.includes(id)
    );

    if (missingRequiredQuestions.length > 0) {
      return NextResponse.json(
        { error: 'Lütfen tüm zorunlu soruları cevaplayın' },
        { status: 400 }
      );
    }

    // Anonim kullanıcı için geçici bir kullanıcı oluştur
    // Gerçek uygulamada bu kısım farklı olabilir
    const anonymousUser = await prisma.user.findFirst({
      where: {
        email: 'anonymous@example.com',
      },
    });

    let userId;
    if (anonymousUser) {
      userId = anonymousUser.id;
    } else {
      const newAnonymousUser = await prisma.user.create({
        data: {
          email: 'anonymous@example.com',
          password: 'anonymous',
          firstName: 'Anonymous',
          lastName: 'User',
        },
      });
      userId = newAnonymousUser.id;
    }

    // Geri bildirim oluştur
    const feedback = await prisma.feedback.create({
      data: {
        formId,
        userId,
        answers: {
          create: answers.map((answer: any) => ({
            questionId: answer.questionId,
            value: answer.value,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      feedbackId: feedback.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Geri bildirim gönderilirken bir hata oluştu' },
      { status: 400 }
    );
  }
} 