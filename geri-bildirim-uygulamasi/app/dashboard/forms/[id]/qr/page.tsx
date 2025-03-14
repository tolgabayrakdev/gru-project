'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
  TextField,
  Grid,
  Divider,
  Alert,
} from '@mui/material';
import {
  Download as DownloadIcon,
  ContentCopy as CopyIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import { useAuth } from '@/app/lib/AuthContext';
import { apiGet } from '@/app/lib/api';

interface Form {
  id: string;
  title: string;
  description: string;
}

export default function FormQR({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const formUrl = `${window.location.origin}/forms/${params.id}`;

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const data = await apiGet(`/api/forms/${params.id}`);
        setForm(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Form yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [params.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `${form?.title || 'form'}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !form) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error || 'Form bulunamadı'}</Alert>
        <Button
          startIcon={<BackIcon />}
          onClick={() => router.push('/dashboard/forms')}
          sx={{ mt: 2 }}
        >
          Formlara Dön
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<BackIcon />}
        onClick={() => router.push('/dashboard/forms')}
        sx={{ mb: 3 }}
      >
        Formlara Dön
      </Button>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {form.title} - QR Kodu
        </Typography>

        {form.description && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {form.description}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <Box
              ref={qrRef}
              sx={{
                display: 'inline-flex',
                p: 3,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <QRCodeSVG
                value={formUrl}
                size={200}
                level="H"
                includeMargin
                imageSettings={{
                  src: '/logo.png',
                  x: undefined,
                  y: undefined,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadQR}
                sx={{ mr: 1 }}
              >
                QR Kodu İndir
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Form Bağlantısı
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formUrl}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<CopyIcon />}
              onClick={handleCopyLink}
            >
              {copied ? 'Kopyalandı!' : 'Bağlantıyı Kopyala'}
            </Button>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" paragraph>
                Bu QR kodu veya bağlantıyı müşterilerinizle paylaşın. Müşterileriniz bu QR kodu okutarak veya bağlantıya tıklayarak formunuza erişebilir ve geri bildirim gönderebilir.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 