import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Image,
  Button,
  Container,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Icon,
  Link,
  useColorModeValue,
  Divider,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import { FiUser, FiClock, FiLink, FiHeart, FiMessageSquare } from 'react-icons/fi';

type FeedbackPage = {
  id: number;
  title: string;
  url_token: string;
};

type PreviewPage = {
  title: string;
  description: string;
  logo_url?: string;
  gradient: string;
  font: string;
  background_color: string;
  text_color: string;
  feedback_page_id: number | null;
};

type PreviewPageListItem = {
  id: number;
  title: string;
  description: string;
  url_token: string;
  created_at: string;
};

const gradientOptions = [
  { value: 'linear(to-r, teal.500, blue.500)', label: 'Teal to Blue' },
  { value: 'linear(to-r, pink.500, purple.500)', label: 'Pink to Purple' },
  { value: 'linear(to-r, orange.500, red.500)', label: 'Orange to Red' },
  { value: 'linear(to-r, green.400, teal.500)', label: 'Green to Teal' },
  { value: 'linear(to-r, blue.400, purple.500)', label: 'Blue to Purple' },
  { value: 'linear(to-br, yellow.400, orange.500)', label: 'Yellow to Orange' },
  { value: 'linear(to-br, red.500, pink.500)', label: 'Red to Pink' },
  { value: 'linear(to-tr, blue.500, green.500)', label: 'Blue to Green' },
  { value: 'linear(to-tr, purple.500, pink.500)', label: 'Purple to Pink' },
  { value: 'linear(to-b, cyan.500, blue.500)', label: 'Cyan to Blue' },
  { value: 'radial(circle at center, yellow.400, orange.500)', label: 'Radial Yellow to Orange' },
  { value: 'radial(circle at top left, blue.500, purple.500)', label: 'Radial Blue to Purple' },
  { value: 'conic(from 45deg, blue.500, green.500, yellow.500)', label: 'Conic Blue-Green-Yellow' },
];

const fontOptions = [
  { value: 'heading', label: 'Modern (Heading)' },
  { value: 'body', label: 'Classic (Body)' },
  { value: 'mono', label: 'Monospace' },
  { value: "'Roboto', sans-serif", label: 'Roboto' },
  { value: "'Open Sans', sans-serif", label: 'Open Sans' },
  { value: "'Lato', sans-serif", label: 'Lato' },
  { value: "'Montserrat', sans-serif", label: 'Montserrat' },
  { value: "'Poppins', sans-serif", label: 'Poppins' },
  { value: "'Playfair Display', serif", label: 'Playfair Display' },
  { value: "'Merriweather', serif", label: 'Merriweather' },
  { value: "'Oswald', sans-serif", label: 'Oswald' },
  { value: "'Raleway', sans-serif", label: 'Raleway' },
];

export default function PreviewPage() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState<PreviewPage>({
    title: '',
    description: '',
    logo_url: '',
    gradient: 'linear(to-r, teal.500, blue.500)',
    font: 'heading',
    background_color: 'white',
    text_color: 'black',
    feedback_page_id: null,
  });
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [feedbackPages, setFeedbackPages] = useState<FeedbackPage[]>([]);
  const [previewPages, setPreviewPages] = useState<PreviewPageListItem[]>([]);

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchFeedbackPages();
    fetchPreviewPages();
  }, []);

  const fetchFeedbackPages = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/feedback-page', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch feedback pages');
      }
      const data = await response.json();
      setFeedbackPages(data);
    } catch (error) {
      console.error('Error fetching feedback pages:', error);
      toast({
        title: "Feedback sayfaları yüklenemedi.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchPreviewPages = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/preview-page', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch preview pages');
      }
      const data = await response.json();
      setPreviewPages(data);
    } catch (error) {
      console.error('Error fetching preview pages:', error);
      toast({
        title: "Preview sayfaları yüklenemedi.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPage(prevPage => ({ ...prevPage, [name]: value }));
  };


  const handlePublish = async () => {
    if (page.title.length < 3) {
      toast({
        title: "Başlık çok kısa.",
        description: "Başlık en az 3 karakter olmalıdır.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (page.description.length < 10) {
      toast({
        title: "Açıklama çok kısa.",
        description: "Açıklama en az 10 karakter olmalıdır.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!page.feedback_page_id) {
      toast({
        title: "Lütfen bir feedback sayfası seçin.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/preview-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...page,
          logo_url: page.logo_url || null,
        }),
      });

      if (response.status === 400) {
        toast({
          title: "Sayfa yayınlanamadı.",
          description: "En fazla 3 tane ön izleme sayfası oluşturabilirsiniz.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (!response.ok) {
        throw new Error('Sayfa yayınlanamadı');
      }

      const data = await response.json();
      setPublishedUrl(`${window.location.origin}/preview-page/${data.url_token}`);
      onOpen();
      toast({
        title: "Sayfa başarıyla yayınlandı.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Yeni sayfayı oluşturduktan sonra preview sayfalarını yeniden yükle
      await fetchPreviewPages();
    } catch (error) {
      console.error('Error publishing page:', error);
      toast({
        title: "Sayfa yayınlanamadı.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePreview = (url_token: string) => {
    // Yeni bir sekme açarak preview sayfasına yönlendir
    window.open(`/preview-page/${url_token}`, '_blank');
  };

  const handleDeleteClick = (id: number) => {
    setDeleteTargetId(id);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId === null) return;

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/preview-page/${deleteTargetId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to delete preview page');
      }
      toast({
        title: "Preview sayfası silindi.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Sayfayı sildikten sonra preview sayfalarını yeniden yükle
      await fetchPreviewPages();
    } catch (error) {
      console.error('Error deleting preview page:', error);
      toast({
        title: "Preview sayfası silinemedi.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleteAlertOpen(false);
      setDeleteTargetId(null);
    }
  };

  const selectedFeedbackPage = feedbackPages.find(fp => fp.id === Number(page.feedback_page_id));
  const formUrl = selectedFeedbackPage
    ? `${window.location.origin}/feedback-form/${selectedFeedbackPage.url_token}`
    : '';

  return (
    <Container maxW="container.xl" p={3}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box>
          <Box width="fit-content">
            <Heading size="lg" mb={2}>Ön izleme Sayfası Oluştur</Heading>
            <Divider borderWidth="1px" mb={4} />
          </Box>
          <VStack spacing={3} align="stretch">
            <FormControl size="sm">
              <FormLabel fontSize="sm">Başlık</FormLabel>
              <Input name="title" value={page.title} onChange={handleInputChange} size="sm" />
            </FormControl>
            <FormControl size="sm">
              <FormLabel fontSize="sm">Açıklama</FormLabel>
              <Textarea name="description" value={page.description} onChange={handleInputChange} size="sm" />
            </FormControl>
            <FormControl size="sm">
              <FormLabel fontSize="sm">Arka Plan Gradient</FormLabel>
              <Select name="gradient" value={page.gradient} onChange={handleInputChange} size="sm">
                {gradientOptions.map(gradient => (
                  <option key={gradient.value} value={gradient.value}>{gradient.label}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl size="sm">
              <FormLabel fontSize="sm">Font Stili</FormLabel>
              <Select name="font" value={page.font} onChange={handleInputChange} size="sm">
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>{font.label}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl size="sm">
              <FormLabel fontSize="sm">Feedback Sayfası</FormLabel>
              <Select
                name="feedback_page_id"
                value={page.feedback_page_id || ''}
                onChange={handleInputChange}
                size="sm"
              >
                <option value="">Feedback sayfası seçin</option>
                {feedbackPages.map(fp => (
                  <option key={fp.id} value={fp.id}>{fp.title}</option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={3}>Ön izleme</Heading>
          <Box
            minH="45vh"
            bg={page.gradient}
            p={4}
            borderRadius="2xl"
            boxShadow="2xl"
            overflow="hidden"
            border="1px solid"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
          >
            <VStack spacing={4} align="stretch">
              <Box 
                bgGradient={page.gradient} 
                p={4}
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '30px',
                  height: '30px',
                  bg: 'inherit',
                  borderRadius: 'full',
                  filter: 'blur(15px)',
                  opacity: 0.6,
                }}
              >
                {page.logo_url && (
                  <Box 
                    width="50px" 
                    height="50px" 
                    borderRadius="xl" 
                    overflow="hidden" 
                    bg="white" 
                    mb={2} 
                    mx="auto"
                    boxShadow="lg"
                    p={2}
                  >
                    <Image
                      src={page.logo_url}
                      alt="Company Logo"
                      objectFit="contain"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                )}
                <Heading 
                  as="h1" 
                  size="lg" 
                  color="white" 
                  mb={2} 
                  fontFamily={page.font} 
                  textAlign="center"
                  textShadow="0 2px 4px rgba(0,0,0,0.1)"
                >
                  {page.title || 'Sayfa Başlığı'}
                </Heading>
                <Text 
                  color="white" 
                  fontFamily={page.font} 
                  textAlign="center" 
                  fontSize="sm"
                  maxW="container.sm"
                  mx="auto"
                  opacity={0.9}
                  letterSpacing="wide"
                >
                  {page.description || 'Sayfa Açıklaması'}
                </Text>
              </Box>

              <VStack spacing={4} align="stretch" p={4} bg={useColorModeValue('white', 'gray.800')} borderRadius="xl">
                <HStack 
                  spacing={6} 
                  justify="center" 
                  p={3} 
                  bg={useColorModeValue('gray.50', 'gray.700')} 
                  borderRadius="lg"
                >
                  <VStack align="center" spacing={1}>
                    <Icon as={FiUser} boxSize={4} color={useColorModeValue('blue.500', 'blue.300')} />
                    <Text fontFamily={page.font} fontSize="xs" fontWeight="medium">
                      [Kullanıcı Adı]
                    </Text>
                  </VStack>
                  <Divider orientation="vertical" height="30px" />
                  <VStack align="center" spacing={1}>
                    <Icon as={FiClock} boxSize={4} color={useColorModeValue('blue.500', 'blue.300')} />
                    <Text fontFamily={page.font} fontSize="xs" fontWeight="medium">
                      [Son Kullanma Tarihi]
                    </Text>
                  </VStack>
                </HStack>

                <VStack spacing={4} align="center" mt={2}>
                  <Badge 
                    colorScheme="blue" 
                    p={1.5} 
                    borderRadius="md" 
                    fontFamily={page.font}
                    fontSize="xs"
                  >
                    Geri bildirim formuna erişmek için QR Kodu tarayın
                  </Badge>
                  
                  <Box 
                    bg="white" 
                    p={4} 
                    borderRadius="xl" 
                    boxShadow="lg"
                    position="relative"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '-2px',
                      left: '-2px',
                      right: '-2px',
                      bottom: '-2px',
                      borderRadius: 'xl',
                      padding: '2px',
                      background: useColorModeValue(
                        'linear-gradient(45deg, #4299E1, #805AD5)',
                        'linear-gradient(45deg, #2B6CB0, #6B46C1)'
                      ),
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  >
                    <QRCodeSVG value={formUrl} size={120} />
                  </Box>
                </VStack>

                <VStack spacing={2} align="center">
                  <Text 
                    fontFamily={page.font} 
                    fontSize="xs" 
                    color={useColorModeValue('gray.600', 'gray.400')}
                  >
                    veya bu bağlantıyı ziyaret edin:
                  </Text>
                  <Link
                    href={formUrl}
                    color={useColorModeValue('blue.500', 'blue.300')}
                    _hover={{ color: useColorModeValue('blue.600', 'blue.400'), textDecoration: 'none' }}
                    display="inline-flex"
                    alignItems="center"
                    fontFamily={page.font}
                    fontSize="xs"
                    bg={useColorModeValue('blue.50', 'blue.900')}
                    px={3}
                    py={1.5}
                    borderRadius="full"
                    transition="all 0.2s"
                  >
                    <Icon as={FiLink} mr={2} />
                    {formUrl}
                  </Link>
                </VStack>

                <Divider my={2} />

                <HStack justify="center" spacing={3}>
                  <Icon as={FiHeart} boxSize={3} color={useColorModeValue('pink.500', 'pink.300')} />
                  <Text 
                    textAlign="center" 
                    fontSize="2xs"
                    color={useColorModeValue('gray.600', 'gray.400')}
                    fontFamily={page.font}
                  >
                    Geri Bildirim Uygulaması tarafından oluşturuldu
                  </Text>
                  <Icon as={FiMessageSquare} boxSize={3} color={useColorModeValue('blue.500', 'blue.300')} />
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </Box>
      </SimpleGrid>

      <Button colorScheme="green" onClick={handlePublish} size="sm">
        Yayınla
      </Button>

      <Heading as="h2" size="lg" mt={10} mb={6}>Oluşturulan Ön izleme Sayfaları</Heading>
      
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Başlık</Th>
            <Th>Açıklama</Th>
            <Th>Oluşturulma Tarihi</Th>
            <Th>İşlemler</Th>
          </Tr>
        </Thead>
        <Tbody>
          {previewPages.map(previewPage => (
            <Tr key={previewPage.id}>
              <Td>{previewPage.title}</Td>
              <Td>{previewPage.description}</Td>
              <Td>{new Date(previewPage.created_at).toLocaleString()}</Td>
              <Td>
                <Button colorScheme="blue" size="sm" mr={2} onClick={() => handlePreview(previewPage.url_token)}>
                  Önizle
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => handleDeleteClick(previewPage.id)}>
                  Sil
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sayfa Yayınlandı</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Sayfanız başarıyla yayınlandı. Aşağıdaki link ile erişebilirsiniz:</Text>
            <Input value={publishedUrl || ''} isReadOnly mt={2} />
            <Box mt={4}>
              <QRCodeSVG value={publishedUrl || ''} size={200} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {
              navigator.clipboard.writeText(publishedUrl || '');
              toast({
                title: "Link kopyalandı.",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            }}>
              Linki Kopyala
            </Button>
            <Button variant="ghost" onClick={onClose}>Kapat</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Preview Sayfasını Sil
            </AlertDialogHeader>

            <AlertDialogBody>
              Bu preview sayfasını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteAlertOpen(false)}>
                İptal
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Sil
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}