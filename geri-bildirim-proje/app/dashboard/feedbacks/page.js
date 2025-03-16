import React from 'react'

export default function page() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold">Geri Bildirimler</h1>
            <p className="text-muted-foreground">Müşterilerinizden gelen tüm geri bildirimleri burada görüntüleyebilirsiniz.</p>

            <div className="border rounded-lg p-4 text-center text-muted-foreground">
                Henüz geri bildirim bulunmamaktadır.
            </div>
        </div>
    )
}
