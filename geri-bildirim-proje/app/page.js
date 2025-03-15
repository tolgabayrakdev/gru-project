import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Geri Bildirim Toplama Platformu
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              QR kodları ile hızlı ve etkili geri bildirim toplayın, analiz edin ve işletmenizi geliştirin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/sign-up">Hemen Başla</Link>
              </Button>
              <Button asChild variant="" size="lg">
                <Link href="/sign-in">Giriş Yap</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Nasıl Çalışır?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border shadow-sm">
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">1. Kayıt Olun</h3>
                <p className="text-muted-foreground">
                  Hızlı ve kolay bir şekilde sisteme kayıt olun ve hesabınızı oluşturun.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm">
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">2. Form Oluşturun</h3>
                <p className="text-muted-foreground">
                  İhtiyaçlarınıza uygun geri bildirim formları oluşturun ve özelleştirin.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm">
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <rect x="7" y="7" width="3" height="9"></rect>
                    <rect x="14" y="7" width="3" height="5"></rect>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">3. Analiz Edin</h3>
                <p className="text-muted-foreground">
                  Toplanan geri bildirimleri analiz edin ve değerli içgörüler elde edin.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">
                QR Kod ile Kolay Erişim
              </h2>
              <p className="text-lg text-muted-foreground">
                Oluşturduğunuz formlar için otomatik QR kodları oluşturun. Müşterileriniz bu kodları tarayarak anında geri bildirim formlarına erişebilir.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Basit ve hızlı erişim</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Yüksek yanıt oranı</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Fiziksel ve dijital ortamlarda kullanım</span>
                </li>
              </ul>
              <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
                <Link href="/sign-up">Hemen Deneyin</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-lg border shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <rect x="7" y="7" width="3" height="3"></rect>
                  <rect x="14" y="7" width="3" height="3"></rect>
                  <rect x="7" y="14" width="3" height="3"></rect>
                  <rect x="14" y="14" width="3" height="3"></rect>
                </svg>
                <p className="text-center mt-2 text-sm text-muted-foreground">Örnek QR Kod</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Hemen Başlayın</h2>
            <p className="text-lg mb-6">
              Geri bildirim toplama ve analiz süreçlerinizi hızlandırın, müşteri memnuniyetini artırın.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/sign-up">Ücretsiz Kayıt Olun</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
