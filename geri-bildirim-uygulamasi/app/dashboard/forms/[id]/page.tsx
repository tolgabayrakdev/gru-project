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
  Divider,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  QrCode as QrCodeIcon,
  ArrowBack as BackIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAuth } from '@/app/lib/AuthContext';
import { apiGet, apiDelete } from '@/app/lib/api';

interface Question {
  id: string;
  text: string;
  type: string;
  required: boolean;
  order: number;
}

interface Feedback {
  id: string;
  createdAt: string;
  answers: {
    id: string;
    value: string;
    question: {
      id: string;
      text: string;
    };
  }[];
}

interface Form {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
  feedbacks: Feedback[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`form-tabpanel-${index}`}
      aria-labelledby={`form-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function FormDetail({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDelete = async () => {
    if (!confirm('Bu formu silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      await apiDelete(`/api/forms/${params.id}`);
      router.push('/dashboard/forms');
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

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'text':
        return 'Metin';
      case 'number':
        return 'Sayı';
      case 'rating':
        return 'Değerlendirme';
      case 'choice':
        return 'Tek Seçim';
      case 'multipleChoice':
        return 'Çoklu Seçim';
      default:
        return type;
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'createdAt',
      headerName: 'Tarih',
      width: 180,
      valueFormatter: (params) => formatDate(params.value as string),
    },
    {
      field: 'answersCount',
      headerName: 'Cevap Sayısı',
      width: 120,
      valueGetter: (params) => params.row.answers.length,
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 120,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => router.push(`/dashboard/feedbacks/${params.row.id}`)}
        >
          Detay
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !form) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => router.push('/dashboard/forms')}
          sx={{ mr: 2 }}
        >
          Formlara Dön
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {form.title}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/dashboard/forms/edit/${form.id}`)}
          sx={{ mr: 1 }}
        >
          Düzenle
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<QrCodeIcon />}
          onClick={() => router.push(`/dashboard/forms/${form.id}/qr`)}
          sx={{ mr: 1 }}
        >
          QR Kod
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Sil
        </Button>
      </Box>

      {form.description && (
        <Typography variant="body1" paragraph>
          {form.description}
        </Typography>
      )}

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="form tabs">
            <Tab label="Form Detayları" id="form-tab-0" aria-controls="form-tabpanel-0" />
            <Tab 
              label={`Geri Bildirimler (${form.feedbacks.length})`} 
              id="form-tab-1" 
              aria-controls="form-tabpanel-1" 
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Form Bilgileri
                </Typography>
                <List>
                  <ListItem divider>
                    <ListItemText
                      primary="Oluşturulma Tarihi"
                      secondary={formatDate(form.createdAt)}
                    />
                  </ListItem>
                  <ListItem divider>
                    <ListItemText
                      primary="Son Güncelleme"
                      secondary={formatDate(form.updatedAt)}
                    />
                  </ListItem>
                  <ListItem divider>
                    <ListItemText
                      primary="Soru Sayısı"
                      secondary={form.questions.length}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Geri Bildirim Sayısı"
                      secondary={form.feedbacks.length}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Form Bağlantısı
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Müşterileriniz bu bağlantı üzerinden formunuza erişebilir:
                  </Typography>
                  <Typography variant="body1" component="div" sx={{ wordBreak: 'break-all' }}>
                    {`${window.location.origin}/forms/${form.id}`}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<QrCodeIcon />}
                  onClick={() => router.push(`/dashboard/forms/${form.id}/qr`)}
                >
                  QR Kodu Görüntüle
                </Button>
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Sorular
            </Typography>

            {form.questions.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                Bu formda henüz soru bulunmuyor.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {form.questions
                  .sort((a, b) => a.order - b.order)
                  .map((question, index) => (
                    <Grid item xs={12} key={question.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ mr: 1 }}>
                              {index + 1}.
                            </Typography>
                            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                              {question.text}
                            </Typography>
                            <Chip
                              label={getQuestionTypeLabel(question.type)}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ mr: 1 }}
                            />
                            {question.required && (
                              <Chip
                                label="Zorunlu"
                                size="small"
                                color="error"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            {form.feedbacks.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                Bu form için henüz geri bildirim alınmamış.
              </Typography>
            ) : (
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={form.feedbacks}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  disableRowSelectionOnClick
                />
              </Box>
            )}
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
} 