'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Feedback as FeedbackIcon,
} from '@mui/icons-material';
import { useAuth } from '../lib/AuthContext';
import { apiGet } from '../lib/api';

interface Form {
  id: string;
  title: string;
  createdAt: string;
  _count: {
    questions: number;
    feedbacks: number;
  };
}

interface Feedback {
  id: string;
  createdAt: string;
  form: {
    id: string;
    title: string;
  };
}

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [recentForms, setRecentForms] = useState<Form[]>([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await apiGet('/api/dashboard');
        setRecentForms(data.recentForms);
        setRecentFeedbacks(data.recentFeedbacks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Veriler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hoş Geldiniz, {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Geri bildirim formlarınızı yönetin ve müşteri geri bildirimlerinizi analiz edin.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* İstatistikler */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 140,
                  bgcolor: 'primary.light',
                  color: 'white',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Toplam Form
                </Typography>
                <Typography variant="h3">
                  {recentForms.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 140,
                  bgcolor: 'secondary.light',
                  color: 'white',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Toplam Geri Bildirim
                </Typography>
                <Typography variant="h3">
                  {recentFeedbacks.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 140,
                  bgcolor: 'success.light',
                  color: 'white',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Aktif Formlar
                </Typography>
                <Typography variant="h3">
                  {recentForms.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 140,
                  bgcolor: 'info.light',
                  color: 'white',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Bu Ayki Geri Bildirimler
                </Typography>
                <Typography variant="h3">
                  {recentFeedbacks.length}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Son Formlar */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Son Formlar
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => router.push('/dashboard/forms')}
                >
                  Tümünü Gör
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {recentForms.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Henüz form oluşturmadınız
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/dashboard/forms/create')}
                    sx={{ mt: 2 }}
                  >
                    Yeni Form Oluştur
                  </Button>
                </Box>
              ) : (
                <List>
                  {recentForms.slice(0, 5).map((form) => (
                    <ListItem
                      key={form.id}
                      divider
                      sx={{ cursor: 'pointer' }}
                      onClick={() => router.push(`/dashboard/forms/${form.id}`)}
                    >
                      <ListItemText
                        primary={form.title}
                        secondary={`Oluşturulma: ${formatDate(form.createdAt)} | Geri Bildirim: ${form._count.feedbacks}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => router.push('/dashboard/forms/create')}
                fullWidth
              >
                Yeni Form Oluştur
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Son Geri Bildirimler */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  <FeedbackIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Son Geri Bildirimler
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => router.push('/dashboard/feedbacks')}
                >
                  Tümünü Gör
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {recentFeedbacks.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    Henüz geri bildirim alınmamış
                  </Typography>
                </Box>
              ) : (
                <List>
                  {recentFeedbacks.slice(0, 5).map((feedback) => (
                    <ListItem
                      key={feedback.id}
                      divider
                      sx={{ cursor: 'pointer' }}
                      onClick={() => router.push(`/dashboard/feedbacks/${feedback.id}`)}
                    >
                      <ListItemText
                        primary={feedback.form.title}
                        secondary={`Tarih: ${formatDate(feedback.createdAt)}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => router.push('/dashboard/feedbacks')}
                fullWidth
              >
                Tüm Geri Bildirimleri Görüntüle
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
