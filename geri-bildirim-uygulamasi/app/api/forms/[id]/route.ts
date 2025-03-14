import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authService } from '@/app/lib/auth';

// Form detaylarını getir
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const user = await authService.verifyToken(token);
    const formId = params.id;

    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
        feedbacks: {
          include: {
            answers: {
              include: {
                question: {
                  select: {
                    id: true,
                    text: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form bulunamadı' }, { status: 404 });
    }

    if (form.userId !== user.id) {
      return NextResponse.json({ error: 'Bu forma erişim izniniz yok' }, { status: 403 });
    }

    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Form yüklenirken bir hata oluştu' },
      { status: 400 }
    );
  }
}

// Formu güncelle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const user = await authService.verifyToken(token);
    const formId = params.id;
    const body = await request.json();
    const { title, description, questions } = body;

    // Formun var olup olmadığını ve kullanıcıya ait olup olmadığını kontrol et
    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    if (!existingForm) {
      return NextResponse.json({ error: 'Form bulunamadı' }, { status: 404 });
    }

    if (existingForm.userId !== user.id) {
      return NextResponse.json({ error: 'Bu formu düzenleme izniniz yok' }, { status: 403 });
    }

    // Mevcut soruları sil
    await prisma.question.deleteMany({
      where: {
        formId,
      },
    });

    // Formu güncelle ve yeni soruları ekle
    const updatedForm = await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        title,
        description: description || '',
        questions: {
          create: questions.map((question: any) => ({
            text: question.text,
            type: question.type,
            required: question.required,
            order: question.order,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json(updatedForm);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Form güncellenirken bir hata oluştu' },
      { status: 400 }
    );
  }
}

// Formu sil
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const user = await authService.verifyToken(token);
    const formId = params.id;

    // Formun var olup olmadığını ve kullanıcıya ait olup olmadığını kontrol et
    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    if (!existingForm) {
      return NextResponse.json({ error: 'Form bulunamadı' }, { status: 404 });
    }

    if (existingForm.userId !== user.id) {
      return NextResponse.json({ error: 'Bu formu silme izniniz yok' }, { status: 403 });
    }

    // İlişkili tüm verileri sil
    // Önce cevapları sil
    await prisma.answer.deleteMany({
      where: {
        feedback: {
          formId,
        },
      },
    });

    // Sonra geri bildirimleri sil
    await prisma.feedback.deleteMany({
      where: {
        formId,
      },
    });

    // Sonra soruları sil
    await prisma.question.deleteMany({
      where: {
        formId,
      },
    });

    // Son olarak formu sil
    await prisma.form.delete({
      where: {
        id: formId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Form silinirken bir hata oluştu' },
      { status: 400 }
    );
  }
} 