'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  QrCode as QrCodeIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useAuth } from '@/app/lib/AuthContext';
import { apiGet, apiDelete } from '@/app/lib/api';

interface Form {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    questions: number;
    feedbacks: number;
  };
}

export default function Forms() {
  const { user } = useAuth();
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        const data = await apiGet('/api/forms');
        setForms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Formlar yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bu formu silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      await apiDelete(`/api/forms/${id}`);
      setForms(forms.filter(form => form.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Form silinirken bir hata oluştu');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Formlarım
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push('/dashboard/forms/create')}
        >
          Yeni Form Oluştur
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : forms.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Henüz form oluşturmadınız
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Yeni bir form oluşturmak için "Yeni Form Oluştur" butonuna tıklayın.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => router.push('/dashboard/forms/create')}
            sx={{ mt: 2 }}
          >
            Yeni Form Oluştur
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {forms.map((form) => (
            <Grid item xs={12} md={6} lg={4} key={form.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom noWrap>
                    {form.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                    {form.description || 'Açıklama yok'}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Soru Sayısı:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {form._count.questions}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Geri Bildirim:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {form._count.feedbacks}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Oluşturulma:
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(form.createdAt)}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Box>
                    <Tooltip title="Düzenle">
                      <IconButton
                        color="primary"
                        onClick={() => router.push(`/dashboard/forms/edit/${form.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Görüntüle">
                      <IconButton
                        color="info"
                        onClick={() => router.push(`/dashboard/forms/${form.id}`)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box>
                    <Tooltip title="QR Kod">
                      <IconButton
                        color="secondary"
                        onClick={() => router.push(`/dashboard/forms/${form.id}/qr`)}
                      >
                        <QrCodeIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sil">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(form.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
} 