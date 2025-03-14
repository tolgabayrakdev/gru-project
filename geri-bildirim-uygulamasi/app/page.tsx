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
  Stack,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CreateIcon from '@mui/icons-material/Create';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QrCodeIcon from '@mui/icons-material/QrCode';
import StarIcon from '@mui/icons-material/Star';
import DevicesIcon from '@mui/icons-material/Devices';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import Image from 'next/image';

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  const features = [
    {
      icon: <CreateIcon sx={{ fontSize: 40 }} />,
      title: 'Kolay Form Oluşturma',
      description: 'Sürükle-bırak arayüzü ile dakikalar içinde özel geri bildirim formları oluşturun.',
      color: theme.palette.primary.main,
    },
    {
      icon: <FeedbackIcon sx={{ fontSize: 40 }} />,
      title: 'Kullanıcı Geri Bildirimleri',
      description: 'Kullanıcılarınızdan anlık geri bildirimler alın ve işletmenizi geliştirin.',
      color: theme.palette.secondary.main,
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      title: 'Detaylı Analizler',
      description: 'Geri bildirimlerinizi analiz edin, trendleri keşfedin ve veriye dayalı kararlar alın.',
      color: '#00BCD4',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Güvenli ve Özel',
      description: 'Verileriniz güvende, sadece siz ve ekibiniz erişebilir.',
      color: '#4CAF50',
    },
    {
      icon: <QrCodeIcon sx={{ fontSize: 40 }} />,
      title: 'QR Kod Entegrasyonu',
      description: 'Formlarınız için otomatik QR kod oluşturun ve kullanıcılarınızla kolayca paylaşın.',
      color: '#9C27B0',
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40 }} />,
      title: 'Tüm Cihazlarda Çalışır',
      description: 'Mobil, tablet ve masaüstü cihazlarda sorunsuz çalışan duyarlı tasarım.',
      color: '#FF9800',
    },
  ];

  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Restoran Sahibi',
      avatar: '/avatars/avatar1.png',
      content: 'Bu uygulama sayesinde kullanıcılarımızdan aldığımız geri bildirimler arttı ve hizmet kalitemizi iyileştirebildik. Kullanımı çok kolay ve kullanıcılarımız da memnun!',
    },
    {
      name: 'Ayşe Kaya',
      role: 'E-ticaret Yöneticisi',
      avatar: '/avatars/avatar2.png',
      content: 'Kullanıcı memnuniyetini ölçmek için mükemmel bir araç. QR kod özelliği sayesinde fiziksel mağazalarımızda da kolayca geri bildirim toplayabiliyoruz.',
    },
    {
      name: 'Mehmet Demir',
      role: 'Otel Müdürü',
      avatar: '/avatars/avatar3.png',
      content: 'Analizler sayesinde hangi alanlarda iyileştirme yapmamız gerektiğini kolayca görebiliyoruz. Kesinlikle tavsiye ederim!',
    },
  ];

  const steps = [
    {
      title: 'Hesap Oluşturun',
      description: 'Ücretsiz hesabınızı oluşturun ve hemen başlayın.',
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      title: 'Form Tasarlayın',
      description: 'Sürükle-bırak arayüzü ile özel formlar oluşturun.',
      icon: <CreateIcon fontSize="large" />,
    },
    {
      title: 'Paylaşın',
      description: 'QR kod veya bağlantı ile formlarınızı paylaşın.',
      icon: <QrCodeIcon fontSize="large" />,
    },
    {
      title: 'Analiz Edin',
      description: 'Geri bildirimleri görüntüleyin ve analiz edin.',
      icon: <AnalyticsIcon fontSize="large" />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: { xs: 10, md: 16 },
          mb: 10,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            opacity: 0.1,
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            animation: 'pulse 15s ease-in-out infinite alternate',
            zIndex: 0,
          },
          '@keyframes pulse': {
            '0%': { opacity: 0.5, transform: 'scale(1)' },
            '100%': { opacity: 0.8, transform: 'scale(1.5)' },
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
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    width: 80,
                    height: 4,
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: 2,
                  }
                }}
              >
                Kullanıcı Geri Bildirimlerinizi
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
                  lineHeight: 1.6,
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
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                    },
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      animation: 'shimmer 2s infinite',
                    },
                    '@keyframes shimmer': {
                      '0%': { transform: 'translateX(-100%)' },
                      '100%': { transform: 'translateX(100%)' },
                    },
                  }}
                >
                  Hemen Başla
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
                    backdropFilter: 'blur(4px)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      borderWidth: '2px',
                      transform: 'translateY(-2px)',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Giriş Yap
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 300, md: 500 },
                  width: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 2,
                  },
                }}
              >
                <Box
                  component="img"
                  src="/dashboard-preview.jpg"
                  alt="Dashboard Preview"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2,
              }
            }}
          >
            Nasıl Çalışır?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2, mb: 4, maxWidth: 700, mx: 'auto' }}>
            Sadece dört adımda kullanıcı geri bildirimlerinizi toplamaya ve analiz etmeye başlayın
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  },
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '5px',
                    height: '100%',
                    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    margin: '0 auto 20px',
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  {step.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {index + 1}. {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 10, backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 2,
                }
              }}
            >
              Özellikler
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2, mb: 4, maxWidth: 700, mx: 'auto' }}>
              Geri bildirim toplamayı ve analiz etmeyi kolaylaştıran güçlü özellikler
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderRadius: '16px',
                    border: `1px solid ${alpha(feature.color, 0.2)}`,
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: `0 20px 30px ${alpha(feature.color, 0.15)}`,
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '3px',
                      background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        color: feature.color,
                        mb: 3,
                        display: 'flex',
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: alpha(feature.color, 0.1),
                        width: 70,
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 5px 15px ${alpha(feature.color, 0.2)}`,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7, mb: 2 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 10, 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.9)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            opacity: 0.1,
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'white',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 2,
                }
              }}
            >
              Hemen Başlayın
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, mb: 4, color: 'white', opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
              Kullanıcılarınızdan geri bildirim toplamak ve işletmenizi geliştirmek için bugün başlayın
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
                fontSize: '1.2rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                },
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 2s infinite',
                },
              }}
            >
              Hemen Başla
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
