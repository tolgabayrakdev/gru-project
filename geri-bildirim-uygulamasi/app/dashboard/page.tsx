'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { useAuth } from '../lib/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              Hoş Geldiniz, {user?.firstName} {user?.lastName}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={logout}
              sx={{ borderRadius: '50px' }}
            >
              Çıkış Yap
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Formlarınız
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Henüz form oluşturmadınız. Yeni bir form oluşturmak için "Form Oluştur" butonuna tıklayın.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Geri Bildirimler
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Henüz geri bildirim almadınız. Formlarınızı paylaştığınızda burada görünecektir.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
