import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Select,
  Button,
  useToast,
  useColorModeValue,
  VStack,
  FormErrorMessage,
  Flex,
  Container,
  Icon,
  HStack,
  Divider,
  keyframes,
  Badge,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Loading from '../../components/loading';
import { FiMail, FiMessageSquare, FiSend, FiUser, FiClock, FiHeart, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

type FeedbackPage = {
  id: string;
  title: string;
  description: string;
  url_token: string;
  expires_at: string;
  username: string;
  email: string;
};

const getFeedbackTypeColor = (type: string) => {
  switch (type) {
    case 'complaint':
      return 'red.500';
    case 'suggestion':
      return 'orange.500';
    case 'request':
      return 'blue.500';
    case 'compliment':
      return 'green.500';
    default:
      return 'gray.500';
  }
};

const feedbackTypeMap: { [key: string]: string } = {
  'şikayet': 'complaint',
  'öneri': 'suggestion',
  'istek': 'request',
  'tebrik': 'compliment'
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçerli bir email adresi giriniz')
    .required('Email gereklidir'),
  content: Yup.string()
    .min(10, 'İçerik en az 10 karakter olmalıdır')
    .required('İçerik gereklidir'),
  feedbackType: Yup.string().required('Bildirim tipi seçiniz'),
});

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function FeedbackForm() {
  const { token } = useParams<{ token: string }>();
  const [feedbackPage, setFeedbackPage] = useState<FeedbackPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchFeedbackPage = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/feedback-page/${token}`, {
          method: "GET",
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error('Geri bildirim sayfası bulunamadı.');
        }
        const data = await response.json();
        setFeedbackPage(data);
      } catch (error) {
        setError("Geri bildirim sayfası bulunamadı.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbackPage();
  }, [token]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await fetch(`http://localhost:8000/api/user-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          customer_email: values.email,
          content: values.content,
          feedback_type: feedbackTypeMap[values.feedbackType] || values.feedbackType,
          feedback_page_id: feedbackPage?.id
        }),
      });
      if (!response.ok) {
        throw new Error('Geri bildirim gönderilemedi.');
      }
      setIsSubmitted(true);
      toast({
        title: "Geri bildiriminiz gönderildi.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Geri bildiriminiz gönderilemedi.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Flex 
        minHeight="100vh" 
        alignItems="center" 
        justifyContent="center" 
        bgGradient="linear(to-r, blue.50, purple.50)"
      >
        <VStack spacing={4}>
          <Loading />
          <Text color="gray.600" fontSize="lg" fontWeight="medium">
            Yükleniyor...
          </Text>
        </VStack>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex 
        minHeight="100vh" 
        alignItems="center" 
        justifyContent="center" 
        bgGradient="linear(to-r, red.50, orange.50)"
      >
        <Box
          p={8}
          bg={useColorModeValue('white', 'gray.800')}
          borderRadius="xl"
          boxShadow="xl"
          animation={`${fadeIn} 0.5s ease-out`}
        >
          <VStack spacing={4}>
            <Icon as={FiAlertCircle} boxSize={8} color="red.500" />
            <Text fontSize="lg" fontWeight="medium" color="red.500">
              {error}
            </Text>
          </VStack>
        </Box>
      </Flex>
    );
  }

  const formattedExpiresAt = feedbackPage ? format(new Date(feedbackPage.expires_at), 'yyyy-MM-dd HH:mm') : '';

  return (
    <Box
      minHeight="100vh"
      bgGradient="linear(to-br, blue.50, purple.50)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={8}
      px={4}
      position="relative"
      overflow="hidden"
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
          animation: `${pulse} 15s ease-in-out infinite`,
        }
      }}
    >
      <Container maxW="lg">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="2xl"
          borderRadius="2xl"
          p={8}
          position="relative"
          animation={`${fadeIn} 0.5s ease-out`}
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            backgroundImage: 'linear-gradient(120deg, rgba(66,153,225,0.1) 0%, transparent 50%)',
            borderRadius: '2xl',
            pointerEvents: 'none',
          }}
        >
          {isSubmitted ? (
            <VStack 
              spacing={6} 
              align="stretch"
              animation={`${fadeIn} 0.5s ease-out`}
            >
              <VStack spacing={4}>
                <Icon 
                  as={FiCheckCircle} 
                  boxSize={16} 
                  color="green.500" 
                  animation={`${pulse} 2s infinite`}
                />
                <Heading 
                  size="lg" 
                  textAlign="center" 
                  bgGradient="linear(to-r, green.400, teal.400)"
                  bgClip="text"
                >
                  Geri Bildiriminiz Alındı
                </Heading>
                <Text 
                  textAlign="center" 
                  fontSize="md"
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  Değerli geri bildiriminiz için teşekkür ederiz. Katkınız bizim için çok önemli.
                </Text>
              </VStack>
            </VStack>
          ) : (
            <VStack spacing={6} align="stretch">
              <VStack spacing={3}>
                <Heading 
                  size="lg" 
                  textAlign="center" 
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  bgClip="text"
                >
                  {feedbackPage?.title}
                </Heading>
                <Text 
                  fontSize="md" 
                  textAlign="center" 
                  color={useColorModeValue('gray.600', 'gray.400')}
                  maxW="container.sm"
                  mx="auto"
                >
                  {feedbackPage?.description}
                </Text>
              </VStack>

              <HStack 
                spacing={6} 
                justify="center" 
                p={4} 
                bg={useColorModeValue('gray.50', 'gray.700')} 
                borderRadius="lg"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
              >
                <VStack align="center" spacing={1}>
                  <Icon as={FiUser} boxSize={5} color={useColorModeValue('blue.500', 'blue.300')} />
                  <Text fontSize="sm" fontWeight="medium">
                    {feedbackPage?.username}
                  </Text>
                </VStack>
                <Divider orientation="vertical" height="40px" />
                <VStack align="center" spacing={1}>
                  <Icon as={FiClock} boxSize={5} color={useColorModeValue('blue.500', 'blue.300')} />
                  <Text fontSize="sm" fontWeight="medium">
                    {formattedExpiresAt}
                  </Text>
                </VStack>
              </HStack>

              <Formik
                initialValues={{ email: '', content: '', feedbackType: 'tebrik' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form>
                    <VStack spacing={4}>
                      <Field name="email">
                        {({ field }: any) => (
                          <FormControl isInvalid={!!(errors.email && touched.email)}>
                            <FormLabel 
                              fontSize="sm"
                              display="flex"
                              alignItems="center"
                            >
                              <Icon as={FiMail} mr={2} color="blue.500" />
                              Email
                            </FormLabel>
                            <Input
                              {...field}
                              focusBorderColor="blue.400"
                              bg={useColorModeValue('white', 'gray.700')}
                              size="md"
                              borderRadius="lg"
                              _hover={{ borderColor: 'blue.300' }}
                              transition="all 0.3s"
                            />
                            <FormErrorMessage fontSize="xs">{errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="feedbackType">
                        {({ field }: any) => (
                          <FormControl>
                            <FormLabel 
                              fontSize="sm"
                              display="flex"
                              alignItems="center"
                            >
                              <Icon as={FiMessageSquare} mr={2} color="blue.500" />
                              Bildirim Tipi
                            </FormLabel>
                            <Select
                              {...field}
                              focusBorderColor="blue.400"
                              bg={useColorModeValue('white', 'gray.700')}
                              color={getFeedbackTypeColor(feedbackTypeMap[values.feedbackType] || values.feedbackType)}
                              size="md"
                              borderRadius="lg"
                              _hover={{ borderColor: 'blue.300' }}
                              transition="all 0.3s"
                              icon={<Icon as={FiMessageSquare} />}
                            >
                              <option value="tebrik">Tebrik</option>
                              <option value="öneri">Öneri</option>
                              <option value="şikayet">Şikayet</option>
                              <option value="istek">İstek</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="content">
                        {({ field }: any) => (
                          <FormControl isInvalid={!!(errors.content && touched.content)}>
                            <FormLabel 
                              fontSize="sm"
                              display="flex"
                              alignItems="center"
                            >
                              <Icon as={FiMessageSquare} mr={2} color="blue.500" />
                              İçerik
                            </FormLabel>
                            <Textarea
                              {...field}
                              focusBorderColor="blue.400"
                              minHeight="150px"
                              bg={useColorModeValue('white', 'gray.700')}
                              size="md"
                              borderRadius="lg"
                              _hover={{ borderColor: 'blue.300' }}
                              transition="all 0.3s"
                              resize="vertical"
                            />
                            <FormErrorMessage fontSize="xs">{errors.content}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Button
                        mt={4}
                        colorScheme="blue"
                        isLoading={isSubmitting}
                        type="submit"
                        width="full"
                        bg={getFeedbackTypeColor(feedbackTypeMap[values.feedbackType] || values.feedbackType)}
                        _hover={{ 
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                          opacity: 0.9
                        }}
                        size="lg"
                        borderRadius="lg"
                        leftIcon={<FiSend />}
                        transition="all 0.3s"
                      >
                        Geri Bildirim Gönder
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </VStack>
          )}

          <Divider my={6} />

          <HStack justify="center" spacing={3}>
            <Icon 
              as={FiHeart} 
              color={useColorModeValue('pink.500', 'pink.300')}
              transition="all 0.3s"
              _hover={{ transform: 'scale(1.2)', color: 'pink.400' }}
            />
            <Text 
              textAlign="center" 
              fontSize="sm" 
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              Geri Bildirim Uygulaması tarafından oluşturuldu
            </Text>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}