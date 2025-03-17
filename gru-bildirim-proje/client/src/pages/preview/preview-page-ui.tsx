import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { FiUser, FiClock, FiLink, FiZoomIn, FiZoomOut, FiHeart, FiMessageSquare } from 'react-icons/fi';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Flex,
  Icon,
  Link,
  Spinner,
  useColorModeValue,
  Image,
  IconButton,
  Badge,
  HStack,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';

interface PreviewData {
  id: number;
  title: string;
  description: string;
  url_token: string;
  expires_at: string;
  username: string;
  email: string;
  logo_url?: string;
  gradient: string;
  font: string;
  feedback_page: {
    id: number;
    title: string;
    url_token: string;
  };
}

export default function PreviewPage() {
  const { token } = useParams<{ token: string }>();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/preview-page/${token}`, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Bu sayfa mevcut değil');
        }
        const data = await response.json();
        console.log(data);

        setPreviewData(data);
      } catch (err) {
        setError('Bu sayfa mevcut değil');
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [token]);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

  if (loading) return <Flex justify="center" align="center" h="100vh"><Spinner size="xl" /></Flex>;
  if (error) return <Flex justify="center" align="center" h="100vh" color="red.500">{error}</Flex>;
  if (!previewData) return <Flex justify="center" align="center" h="100vh">Önizleme verisi bulunamadı</Flex>;

  const formUrl = `http://localhost:5173/feedback-form/${previewData.feedback_page.url_token}`;

  return (
    <Box minH="100vh" bg={previewData.gradient} py={8} position="relative">
      <Flex position="fixed" top="4" right="4" zIndex="docked" bg="white" p={2} borderRadius="lg" boxShadow="md">
        <IconButton
          aria-label="Zoom in"
          icon={<FiZoomIn />}
          onClick={zoomIn}
          mr={2}
          size="sm"
          variant="ghost"
          colorScheme="blue"
        />
        <IconButton
          aria-label="Zoom out"
          icon={<FiZoomOut />}
          onClick={zoomOut}
          size="sm"
          variant="ghost"
          colorScheme="blue"
        />
      </Flex>
      
      <Container maxW="2xl" transform={`scale(${scale})`} transformOrigin="top center">
        <VStack 
          spacing={6} 
          align="stretch" 
          bg={useColorModeValue('white', 'gray.800')} 
          borderRadius="2xl" 
          overflow="hidden" 
          boxShadow="2xl"
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
        >
          <Box 
            bgGradient={previewData.gradient} 
            p={8}
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '40px',
              bg: 'inherit',
              borderRadius: 'full',
              filter: 'blur(15px)',
              opacity: 0.6,
            }}
          >
            {previewData.logo_url && (
              <Box 
                width="80px" 
                height="80px" 
                borderRadius="xl" 
                overflow="hidden" 
                bg="white" 
                mb={4} 
                mx="auto"
                boxShadow="lg"
                p={2}
              >
                <Image
                  src={previewData.logo_url}
                  alt="Company Logo"
                  objectFit="contain"
                  width="100%"
                  height="100%"
                />
              </Box>
            )}
            <Heading 
              as="h1" 
              size="xl" 
              color="white" 
              mb={3} 
              fontFamily={previewData.font} 
              textAlign="center"
              textShadow="0 2px 4px rgba(0,0,0,0.1)"
            >
              {previewData.title}
            </Heading>
            <Text 
              color="white" 
              fontFamily={previewData.font} 
              textAlign="center" 
              fontSize="md"
              maxW="container.sm"
              mx="auto"
              opacity={0.9}
              letterSpacing="wide"
            >
              {previewData.description}
            </Text>
          </Box>

          <VStack spacing={6} align="stretch" p={6}>
            <HStack 
              spacing={8} 
              justify="center" 
              p={4} 
              bg={useColorModeValue('gray.50', 'gray.700')} 
              borderRadius="lg"
            >
              <VStack align="center" spacing={2}>
                <Icon as={FiUser} boxSize={5} color={useColorModeValue('blue.500', 'blue.300')} />
                <Text fontFamily={previewData.font} fontSize="sm" fontWeight="medium">
                  {previewData.username}
                </Text>
              </VStack>
              <Divider orientation="vertical" height="40px" />
              <VStack align="center" spacing={2}>
                <Icon as={FiClock} boxSize={5} color={useColorModeValue('blue.500', 'blue.300')} />
                <Text fontFamily={previewData.font} fontSize="sm" fontWeight="medium">
                  {new Date(previewData.expires_at).toLocaleDateString()}
                </Text>
              </VStack>
            </HStack>

            <VStack spacing={6} align="center" mt={4}>
              <Badge 
                colorScheme="blue" 
                p={2} 
                borderRadius="md" 
                fontFamily={previewData.font}
                fontSize="sm"
              >
                Geri bildirim formuna erişmek için QR Kodu tarayın
              </Badge>
              
              <Box 
                bg="white" 
                p={6} 
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
                <QRCodeSVG value={formUrl} size={180} />
              </Box>
            </VStack>

            <VStack spacing={3} align="center">
              <Text 
                fontFamily={previewData.font} 
                fontSize="sm" 
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
                fontFamily={previewData.font}
                fontSize="sm"
                bg={useColorModeValue('blue.50', 'blue.900')}
                px={4}
                py={2}
                borderRadius="full"
                transition="all 0.2s"
              >
                <Icon as={FiLink} mr={2} />
                {formUrl}
              </Link>
            </VStack>

            <Divider my={4} />

            <HStack justify="center" spacing={4}>
              <Icon as={FiHeart} color={useColorModeValue('pink.500', 'pink.300')} />
              <Text 
                textAlign="center" 
                fontSize="xs"
                color={useColorModeValue('gray.600', 'gray.400')}
                fontFamily={previewData.font}
              >
                Geri Bildirim Uygulaması tarafından oluşturuldu
              </Text>
              <Icon as={FiMessageSquare} color={useColorModeValue('blue.500', 'blue.300')} />
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}