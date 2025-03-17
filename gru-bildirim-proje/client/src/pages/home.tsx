import { 
  Box, 
  Button, 
  Heading, 
  Text, 
  VStack, 
  Container, 
  useColorModeValue, 
  Icon,
  SimpleGrid,
  Flex,
  HStack,
  Circle,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { 
  FaPencilAlt, 
  FaPaperPlane, 
  FaRocket, 
  FaQrcode, 
  FaChartLine, 
  FaUsers,
  FaMobile,
  FaRegSmile
} from "react-icons/fa";

export default function Home() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("blue.600", "blue.300");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Hero Section */}
      <Container maxW="container.xl" py={{ base: 16, md: 24 }}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={8} alignItems="center" mb={20}>
          <Box flex={1}>
            <Heading 
              as="h1" 
              size="2xl" 
              color={headingColor}
              lineHeight="shorter"
              mb={6}
            >
              Kullanıcı Geri Bildirimlerini
              <Text as="span" color="blue.500"> Kolayca Yönetin</Text>
            </Heading>
            <Text fontSize="xl" color={textColor} mb={8}>
              QR kod ile anında geri bildirim toplayan, analiz eden ve kullanıcı deneyimini artıran modern platform.
            </Text>
            <HStack spacing={4}>
              <Button as={Link} to="/sign-in" colorScheme="blue" size="lg">
                Giriş Yap
              </Button>
              <Button as={Link} to="/sign-up" variant="outline" colorScheme="blue" size="lg">
                Kayıt Ol
              </Button>
            </HStack>
          </Box>
          <Box flex={1}>
            <Image 
              src="/feedback-hero.svg" 
              alt="Feedback Platform" 
              w="full"
              fallback={<Box w="full" h="400px" bg="gray.100" borderRadius="xl" />}
            />
          </Box>
        </Stack>

        {/* Features Section */}
        <Box mb={20}>
          <VStack spacing={4} mb={12} textAlign="center">
            <Heading as="h2" size="xl" color={headingColor}>
              Özellikler
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              Modern ve kullanıcı dostu arayüzümüz ile geri bildirimleri yönetmek hiç bu kadar kolay olmamıştı.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {features.map((feature, index) => (
              <Box
                key={index}
                bg={cardBg}
                p={8}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                shadow="md"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              >
                <Circle size="40px" bg="blue.50" color="blue.500" mb={4}>
                  <Icon as={feature.icon} fontSize="20px" />
                </Circle>
                <Heading size="md" mb={4} color={headingColor}>
                  {feature.title}
                </Heading>
                <Text color={textColor}>
                  {feature.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* How It Works Section */}
        <Box mb={20}>
          <VStack spacing={4} mb={12} textAlign="center">
            <Heading as="h2" size="xl" color={headingColor}>
              Nasıl Çalışır?
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              Sadece üç adımda geri bildirim toplamaya başlayın
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {steps.map((step, index) => (
              <VStack
                key={index}
                spacing={4}
                p={6}
                bg={cardBg}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                position="relative"
              >
                <Flex
                  w="60px"
                  h="60px"
                  bg="blue.500"
                  color="white"
                  borderRadius="full"
                  justify="center"
                  align="center"
                  mb={2}
                >
                  <Icon as={step.icon} fontSize="24px" />
                </Flex>
                <Text fontWeight="bold" fontSize="lg" color={headingColor}>
                  {step.title}
                </Text>
                <Text color={textColor} textAlign="center">
                  {step.description}
                </Text>
                {index < steps.length - 1 && (
                  <Box
                    display={{ base: 'none', md: 'block' }}
                    position="absolute"
                    right="-30px"
                    top="30px"
                    w="60px"
                    h="2px"
                    bg="blue.500"
                    zIndex={1}
                  />
                )}
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        {/* CTA Section */}
        <Box
          bg={cardBg}
          p={12}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor={borderColor}
          textAlign="center"
        >
          <Heading as="h2" size="xl" mb={6} color={headingColor}>
            Hemen Aramıza Katılın
          </Heading>
          <Text fontSize="lg" color={textColor} mb={8} maxW="2xl" mx="auto">
            Ücretsiz hesap oluşturun ve geri bildirim toplamaya hemen başlayın.
          </Text>
          <Button
            as={Link}
            to="/sign-up"
            colorScheme="blue"
            size="lg"
            px={8}
            fontSize="md"
          >
            Kayıt Ol
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

const features = [
  {
    icon: FaQrcode,
    title: "QR Kod ile Kolay Erişim",
    description: "Kullanıcılarınız QR kodu okutarak anında geri bildirim formuna ulaşabilir."
  },
  {
    icon: FaMobile,
    title: "Mobil Uyumlu Form",
    description: "Her cihazda mükemmel görünen, kullanıcı dostu geri bildirim formları."
  },
  {
    icon: FaChartLine,
    title: "Detaylı Analizler",
    description: "Geri bildirimleri kategorilere ayırın, trendleri takip edin ve raporlar oluşturun."
  },
  {
    icon: FaUsers,
    title: "Çoklu Sayfa Desteği",
    description: "Farklı projeler için ayrı geri bildirim sayfaları oluşturun ve yönetin."
  },
  {
    icon: FaRegSmile,
    title: "Kullanıcı Deneyimi",
    description: "Kullanıcı deneyimini iyileştirin ve memnuniyet oranını artırın."
  },
  {
    icon: FaRocket,
    title: "Hızlı Entegrasyon",
    description: "Dakikalar içinde kurulum yapın ve geri bildirim toplamaya başlayın."
  }
];

const steps = [
  {
    icon: FaPencilAlt,
    title: "Sayfa Oluşturun",
    description: "İhtiyacınıza göre özelleştirilmiş geri bildirim sayfası oluşturun ve QR kodunuzu alın."
  },
  {
    icon: FaPaperPlane,
    title: "Geri Bildirim Toplayın",
    description: "Kullanıcılarınız QR kodu okutarak kolayca geri bildirim göndersin."
  },
  {
    icon: FaChartLine,
    title: "Analiz Edin",
    description: "Toplanan geri bildirimleri analiz edin, raporlar oluşturun ve aksiyonlar alın."
  }
];
