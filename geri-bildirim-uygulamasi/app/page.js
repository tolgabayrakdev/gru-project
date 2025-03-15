'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { isAuthenticated } from '@/lib/authUtils';

export default function HomePage() {
  const router = useRouter();
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    // Check authentication after auth context has loaded
    if (!authLoading) {
      // If user is authenticated, redirect to dashboard
      if (isAuthenticated()) {
        router.push('/dashboard');
      }
    }
  }, [router, authLoading]);

  // Show loading spinner while auth context is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-16">
        <header className="flex flex-col items-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Geri Bildirim Uygulaması
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl">
            Müşteri deneyimini iyileştirmek için geri bildirimleri kolayca toplayın ve analiz edin
          </p>
          <div className="mt-8 flex gap-4">
            <Link 
              href="/login" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Giriş Yap
            </Link>
            <Link 
              href="/register" 
              className="bg-white hover:bg-gray-100 text-primary border border-primary font-bold py-3 px-6 rounded-lg transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-blue-500"
            >
              Kayıt Ol
            </Link>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Nasıl Çalışır?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">QR Kodu Tarayın</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Müşterileriniz mekanınızdaki QR kodları akıllı telefonlarıyla kolayca tarayabilir.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Formu Doldurun</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Kullanıcı dostu formumuz sayesinde müşterileriniz hızlıca geri bildirim verebilir.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Sonuçları Analiz Edin</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tüm geri bildirimleri görüntüleyin, analiz edin ve işletmenizi geliştirmek için kullanın.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Link 
                href="/register" 
                className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Hemen Başlayın
              </Link>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md border border-blue-100 dark:border-blue-900">
              <div className="mb-6 flex justify-center">
                <div className="bg-blue-50 dark:bg-blue-900/30 w-64 h-64 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-primary">
                Geri Bildirim Formunuzu Oluşturun
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Özel QR kodunuzu oluşturun ve müşterilerinizden anında geri bildirim almaya başlayın.
              </p>
            </div>
          </div>
        </main>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">
            Neden Bizi Seçmelisiniz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-primary">Kolay Kullanım</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Kullanıcı dostu arayüzümüz sayesinde teknik bilgi gerektirmeden kolayca kullanabilirsiniz.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-primary">Detaylı Analiz</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Geri bildirimleri grafikler ve raporlarla analiz ederek işletmenizi geliştirebilirsiniz.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-primary">Güvenli Veri</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Tüm verileriniz güvenle saklanır ve sadece sizin erişiminize açıktır.
              </p>
            </div>
          </div>
        </section>
        
        <footer className="text-center text-gray-600 dark:text-gray-400 border-t border-blue-100 dark:border-blue-900 pt-8">
          <p>© {new Date().getFullYear()} Geri Bildirim Uygulaması. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}
