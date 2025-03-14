'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  IconButton,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { useAuth } from '@/app/lib/AuthContext';
import { apiPost } from '@/app/lib/api';

type QuestionType = 'text' | 'number' | 'rating' | 'choice' | 'multipleChoice';

interface FormQuestion {
  text: string;
  type: QuestionType;
  required: boolean;
  order: number;
  options?: string[]; // Seçenekler için (choice ve multipleChoice tipleri için)
}

interface FormData {
  title: string;
  description: string;
  questions: FormQuestion[];
}

export default function CreateForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      questions: [
        {
          text: '',
          type: 'text',
          required: false,
          order: 0,
        },
      ],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);

      // Soruların sırasını güncelle
      data.questions = data.questions.map((question, index) => ({
        ...question,
        order: index,
      }));

      const result = await apiPost('/api/forms', data);
      router.push(`/dashboard/forms/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Form oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    append({
      text: '',
      type: 'text',
      required: false,
      order: fields.length,
    });
  };

  const moveQuestionUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const moveQuestionDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  const watchQuestionTypes = watch('questions');

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Yeni Form Oluştur
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Form başlığı gereklidir' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Form Başlığı"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Form Açıklaması"
                    fullWidth
                    multiline
                    rows={3}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Sorular
          </Typography>

          {fields.map((field, index) => (
            <Card key={field.id} sx={{ mb: 3, position: 'relative' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => moveQuestionUp(index)}
                    disabled={index === 0}
                  >
                    <DragIcon />
                  </IconButton>
                  <Typography variant="h6">Soru {index + 1}</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    color="error"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name={`questions.${index}.text`}
                      control={control}
                      rules={{ required: 'Soru metni gereklidir' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Soru"
                          fullWidth
                          error={!!errors.questions?.[index]?.text}
                          helperText={errors.questions?.[index]?.text?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Soru Tipi</InputLabel>
                      <Controller
                        name={`questions.${index}.type`}
                        control={control}
                        render={({ field }) => (
                          <Select {...field} label="Soru Tipi">
                            <MenuItem value="text">Metin</MenuItem>
                            <MenuItem value="number">Sayı</MenuItem>
                            <MenuItem value="rating">Değerlendirme</MenuItem>
                            <MenuItem value="choice">Tek Seçim</MenuItem>
                            <MenuItem value="multipleChoice">Çoklu Seçim</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name={`questions.${index}.required`}
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          }
                          label="Zorunlu"
                        />
                      )}
                    />
                  </Grid>

                  {(watchQuestionTypes[index]?.type === 'choice' || 
                    watchQuestionTypes[index]?.type === 'multipleChoice') && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Seçenekler (Her satıra bir seçenek yazın)
                      </Typography>
                      <Controller
                        name={`questions.${index}.options`}
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            multiline
                            rows={4}
                            fullWidth
                            placeholder="Seçenek 1&#10;Seçenek 2&#10;Seçenek 3"
                            value={field.value?.join('\n') || ''}
                            onChange={(e) => {
                              const options = e.target.value.split('\n').filter(Boolean);
                              field.onChange(options);
                            }}
                          />
                        )}
                      />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Box sx={{ mt: 2, mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addQuestion}
              sx={{ mr: 2 }}
            >
              Soru Ekle
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Oluşturuluyor...' : 'Formu Oluştur'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
} 