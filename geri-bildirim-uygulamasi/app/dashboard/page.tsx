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
  useTheme,
  alpha,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Feedback as FeedbackIcon,
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarToday as CalendarIcon,
  QuestionAnswer as QuestionIcon,
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
  const theme = useTheme();
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
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 'calc(100vh - 64px)' 
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  // Get user's initials for avatar
  const getInitials = () => {
    if (!user) return '?';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: '16px',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'url("/grid-pattern.png")',
            backgroundRepeat: 'repeat',
            zIndex: 0,
          }}
        />
        <Grid container spacing={3} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Hoş Geldiniz, {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
              Geri bildirim formlarınızı yönetin ve müşteri geri bildirimlerinizi analiz edin.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => router.push('/dashboard/forms/create')}
              sx={{
                mt: 2,
                fontWeight: 600,
                borderRadius: '8px',
                textTransform: 'none',
                px: 3,
                py: 1,
              }}
            >
              Yeni Form Oluştur
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'secondary.main',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                }}
              >
                {getInitials()}
              </Avatar>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: '8px' }}>
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
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AssessmentIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="medium">
                    Toplam Form
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 'auto' }}>
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
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <FeedbackIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="medium">
                    Toplam Geri Bildirim
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 'auto' }}>
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
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, #4CAF50, #2E7D32)`,
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="medium">
                    Aktif Formlar
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 'auto' }}>
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
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, #2196F3, #0D47A1)`,
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BarChartIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="medium">
                    Bu Ayki Geri Bildirimler
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 'auto' }}>
                  {recentFeedbacks.length}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Son Formlar */}
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  p: 3,
                  background: alpha(theme.palette.primary.main, 0.05),
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                }}
              >
                <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <AssessmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  Son Formlar
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => router.push('/dashboard/forms')}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                  }}
                >
                  Tümünü Gör
                </Button>
              </Box>
              <Divider />
              {recentForms.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6, px: 3 }}>
                  <AssessmentIcon sx={{ fontSize: 60, color: alpha(theme.palette.text.secondary, 0.2), mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Henüz form oluşturmadınız
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/dashboard/forms/create')}
                    sx={{ 
                      mt: 2,
                      borderRadius: '8px',
                      textTransform: 'none',
                    }}
                  >
                    Yeni Form Oluştur
                  </Button>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {recentForms.slice(0, 5).map((form, index) => (
                    <React.Fragment key={form.id}>
                      <ListItem
                        sx={{ 
                          px: 3, 
                          py: 2,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                        onClick={() => router.push(`/dashboard/forms/${form.id}`)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Avatar 
                            sx={{ 
                              bgcolor: theme.palette.primary.main,
                              width: 40,
                              height: 40,
                              mr: 2,
                            }}
                          >
                            {form.title.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium" noWrap>
                              {form.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <CalendarIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {formatDate(form.createdAt)}
                              </Typography>
                              <Box 
                                component="span" 
                                sx={{ 
                                  display: 'inline-block',
                                  mx: 1,
                                  width: 4,
                                  height: 4,
                                  borderRadius: '50%',
                                  bgcolor: 'text.disabled',
                                }}
                              />
                              <QuestionIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {form._count.feedbacks} geri bildirim
                              </Typography>
                            </Box>
                          </Box>
                          <Tooltip title="Görüntüle">
                            <IconButton size="small" color="primary">
                              <ArrowForwardIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                      {index < recentForms.slice(0, 5).length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => router.push('/dashboard/forms/create')}
                fullWidth
                sx={{ 
                  borderRadius: '8px',
                  py: 1,
                  textTransform: 'none',
                }}
              >
                Yeni Form Oluştur
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Son Geri Bildirimler */}
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  p: 3,
                  background: alpha(theme.palette.secondary.main, 0.05),
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                }}
              >
                <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <FeedbackIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
                  Son Geri Bildirimler
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => router.push('/dashboard/feedbacks')}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                  }}
                >
                  Tümünü Gör
                </Button>
              </Box>
              <Divider />
              {recentFeedbacks.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6, px: 3 }}>
                  <FeedbackIcon sx={{ fontSize: 60, color: alpha(theme.palette.text.secondary, 0.2), mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Henüz geri bildirim alınmamış
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Formlarınızı paylaşarak geri bildirim toplamaya başlayın
                  </Typography>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {recentFeedbacks.slice(0, 5).map((feedback, index) => (
                    <React.Fragment key={feedback.id}>
                      <ListItem
                        sx={{ 
                          px: 3, 
                          py: 2,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.secondary.main, 0.05),
                          },
                        }}
                        onClick={() => router.push(`/dashboard/feedbacks/${feedback.id}`)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Avatar 
                            sx={{ 
                              bgcolor: theme.palette.secondary.main,
                              width: 40,
                              height: 40,
                              mr: 2,
                            }}
                          >
                            <FeedbackIcon fontSize="small" />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium" noWrap>
                              {feedback.form.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <CalendarIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {formatDate(feedback.createdAt)}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip 
                            label="Yeni" 
                            size="small" 
                            color="secondary" 
                            sx={{ 
                              borderRadius: '6px',
                              height: 24,
                              mr: 1,
                            }} 
                          />
                          <Tooltip title="Görüntüle">
                            <IconButton size="small" color="secondary">
                              <ArrowForwardIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                      {index < recentFeedbacks.slice(0, 5).length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => router.push('/dashboard/feedbacks')}
                fullWidth
                sx={{ 
                  borderRadius: '8px',
                  py: 1,
                  textTransform: 'none',
                }}
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
