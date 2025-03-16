import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, BarChart3, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-16 md:py-24 text-center space-y-8 bg-gradient-to-b from-background to-muted">
        <div className="container max-w-5xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Kolay Geri Bildirim Toplama ve Analiz
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            QR kodları ile hızlı geri bildirim toplayın, analizlerle verilerinizi anlamlandırın ve müşteri deneyimini iyileştirin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Ücretsiz Başla <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Giriş Yap
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">QR Kod Oluşturun</h3>
              <p className="text-muted-foreground">
                Özelleştirilmiş QR kodları oluşturun ve müşterilerinizin kolayca erişebileceği yerlere yerleştirin.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Geri Bildirim Toplayın</h3>
              <p className="text-muted-foreground">
                Kullanıcılar QR kodu tarayarak anketinizi doldurur ve değerli geri bildirimler sağlar.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verileri Analiz Edin</h3>
              <p className="text-muted-foreground">
                Toplanan geri bildirimleri görselleştirin, analiz edin ve işletmenizi geliştirmek için kullanın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-bold">Hemen Başlayın</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Müşteri deneyimini iyileştirmek ve değerli geri bildirimler toplamak için hemen kaydolun.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="mt-4">
              Ücretsiz Hesap Oluştur
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <QrCode className="h-6 w-6 text-primary" />
            <span className="font-bold">GeriBildirimQR</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GeriBildirimQR. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
