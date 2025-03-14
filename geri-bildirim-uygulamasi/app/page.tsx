'use client';

import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CreateIcon from '@mui/icons-material/Create';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  const features = [
    {
      icon: <CreateIcon sx={{ fontSize: 40 }} />,
      title: 'Kolay Form Oluşturma',
      description: 'Sürükle-bırak arayüzü ile dakikalar içinde özel geri bildirim formları oluşturun.',
      color: '#FF6B6B',
    },
    {
      icon: <FeedbackIcon sx={{ fontSize: 40 }} />,
      title: 'Müşteri Geri Bildirimleri',
      description: 'Müşterilerinizden anlık geri bildirimler alın ve işletmenizi geliştirin.',
      color: '#4ECDC4',
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      title: 'Detaylı Analizler',
      description: 'Geri bildirimlerinizi analiz edin, trendleri keşfedin ve veriye dayalı kararlar alın.',
      color: '#45B7D1',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Güvenli ve Özel',
      description: 'Verileriniz güvende, sadece siz ve ekibiniz erişebilir.',
      color: '#96CEB4',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
          color: 'white',
          py: 12,
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/grid-pattern.png")',
            opacity: 0.1,
            zIndex: 1,
          },
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Müşteri Geri Bildirimlerinizi
                <Box
                  component="span"
                  sx={{
                    color: 'secondary.main',
                    display: 'block',
                    mt: 1,
                  }}
                >
                  Güçlendirin
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400,
                }}
              >
                Kolay form oluşturun, geri bildirimleri toplayın ve işletmenizi büyütün.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => router.push('/sign-up')}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px 0 rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  Ücretsiz Başla
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => router.push('/sign-in')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Giriş Yap
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  bgcolor: alpha(theme.palette.background.paper, 0.1),
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 3 }}
                >
                  Neden Bizi Seçmelisiniz?
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    'Sürükle-bırak form oluşturma',
                    'Gerçek zamanlı analitikler',
                    'Özelleştirilebilir raporlar',
                    '7/24 destek',
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1,
                        borderRadius: '10px',
                        bgcolor: alpha(theme.palette.common.white, 0.1),
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.common.white, 0.2),
                          transform: 'translateX(5px)',
                        },
                      }}
                    >
                      <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                      <Typography>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ mb: 12 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 6,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          Özellikler
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  borderRadius: '20px',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 20px 40px ${alpha(feature.color, 0.2)}`,
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box
                    sx={{
                      color: feature.color,
                      mb: 3,
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: alpha(feature.color, 0.1),
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'grey.100',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            zIndex: 1,
          },
        }}
      >
        <Container>
          <Paper
            elevation={3}
            sx={{
              p: 8,
              textAlign: 'center',
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: '30px',
              position: 'relative',
              zIndex: 2,
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("/grid-pattern.png")',
                opacity: 0.1,
                zIndex: 1,
              },
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700, position: 'relative', zIndex: 2 }}
            >
              Hemen Başlayın
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, opacity: 0.9, position: 'relative', zIndex: 2 }}
            >
              Müşteri geri bildirimlerinizi yönetmeye başlamak için ücretsiz hesap oluşturun.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => router.push('/sign-up')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 6,
                py: 2,
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px 0 rgba(0,0,0,0.3)',
                },
              }}
            >
              Ücretsiz Hesap Oluştur
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
