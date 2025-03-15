'use client';

import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Geri Bildirimler</h3>
              <p className="text-sm text-muted-foreground">Toplam geri bildirim sayısı</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-500/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Onaylanan</h3>
              <p className="text-sm text-muted-foreground">Onaylanan geri bildirimler</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-yellow-500/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Bekleyen</h3>
              <p className="text-sm text-muted-foreground">Bekleyen geri bildirimler</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Hoş Geldiniz, {user?.name || 'Kullanıcı'}!</h2>
        <p className="text-muted-foreground">
          Geri bildirim uygulamasına hoş geldiniz. Bu panel üzerinden geri bildirimleri yönetebilir, 
          yeni geri bildirimler ekleyebilir ve mevcut geri bildirimleri inceleyebilirsiniz.
        </p>
      </div>
    </div>
  );
}
