'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Rating,
  CircularProgress,
  Alert,
  Snackbar,
  Divider,
} from '@mui/material';

interface Question {
  id: string;
  text: string;
  type: string;
  required: boolean;
  order: number;
  options?: string[];
}

interface Form {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function PublicForm({ params }: { params: { id: string } }) {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/public/forms/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Form yüklenirken bir hata oluştu');
        }

        setForm(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Form yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [params.id]);

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      setError(null);

      const answers = Object.keys(data).map(key => {
        const [questionId] = key.split('_');
        return {
          questionId,
          value: String(data[key]),
        };
      });

      const response = await fetch(`/api/public/forms/${params.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Geri bildirim gönderilirken bir hata oluştu');
      }

      setSuccess(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Geri bildirim gönderilirken bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  const renderQuestionField = (question: Question) => {
    const fieldId = `${question.id}_field`;
    const rules = { required: question.required ? 'Bu alan zorunludur' : false };

    switch (question.type) {
      case 'text':
        return (
          <Controller
            name={fieldId}
            control={control}
            rules={rules}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline={field.value?.length > 100}
                rows={4}
                label={question.required ? `${question.text} *` : question.text}
                error={!!errors[fieldId]}
                helperText={errors[fieldId]?.message as string}
              />
            )}
          />
        );

      case 'number':
        return (
          <Controller
            name={fieldId}
            control={control}
            rules={{
              ...rules,
              pattern: {
                value: /^[0-9]*$/,
                message: 'Lütfen sadece sayı girin',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                label={question.required ? `${question.text} *` : question.text}
                error={!!errors[fieldId]}
                helperText={errors[fieldId]?.message as string}
              />
            )}
          />
        );

      case 'rating':
        return (
          <Controller
            name={fieldId}
            control={control}
            rules={rules}
            defaultValue={0}
            render={({ field }) => (
              <FormControl error={!!errors[fieldId]} fullWidth>
                <FormLabel>
                  {question.required ? `${question.text} *` : question.text}
                </FormLabel>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Rating
                    {...field}
                    size="large"
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                  />
                  <Typography sx={{ ml: 2 }}>
                    {field.value ? `${field.value}/5` : 'Değerlendirme yapın'}
                  </Typography>
                </Box>
                {errors[fieldId] && (
                  <Typography color="error" variant="caption">
                    {errors[fieldId]?.message as string}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        );

      case 'choice':
        return (
          <Controller
            name={fieldId}
            control={control}
            rules={rules}
            render={({ field }) => (
              <FormControl error={!!errors[fieldId]} fullWidth>
                <FormLabel>
                  {question.required ? `${question.text} *` : question.text}
                </FormLabel>
                <RadioGroup {...field}>
                  {question.options?.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                {errors[fieldId] && (
                  <Typography color="error" variant="caption">
                    {errors[fieldId]?.message as string}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        );

      case 'multipleChoice':
        return (
          <FormControl error={!!errors[fieldId]} fullWidth>
            <FormLabel>
              {question.required ? `${question.text} *` : question.text}
            </FormLabel>
            <Box sx={{ mt: 1 }}>
              {question.options?.map((option, index) => (
                <Controller
                  key={index}
                  name={`${fieldId}_${index}`}
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label={option}
                    />
                  )}
                />
              ))}
            </Box>
            {errors[fieldId] && (
              <Typography color="error" variant="caption">
                {errors[fieldId]?.message as string}
              </Typography>
            )}
          </FormControl>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !form) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Alert severity="error">
          {error || 'Form bulunamadı. Lütfen geçerli bir form bağlantısı kullanın.'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {form.title}
        </Typography>

        {form.description && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {form.description}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {form.questions.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Bu formda henüz soru bulunmuyor.
          </Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            {form.questions
              .sort((a, b) => a.order - b.order)
              .map((question) => (
                <Box key={question.id} sx={{ mb: 4 }}>
                  {renderQuestionField(question)}
                </Box>
              ))}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={submitting}
              >
                {submitting ? 'Gönderiliyor...' : 'Geri Bildirim Gönder'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Geri bildiriminiz başarıyla gönderildi. Teşekkür ederiz!
        </Alert>
      </Snackbar>
    </Container>
  );
} 