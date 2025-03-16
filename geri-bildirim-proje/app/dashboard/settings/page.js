import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Ayarlar</h1>
      <p className="text-muted-foreground">Hesap ayarlarınızı buradan yönetebilirsiniz.</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
            <CardDescription>
              Kişisel bilgilerinizi güncelleyin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad</Label>
                <Input id="firstName" defaultValue="Kullanıcı" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad</Label>
                <Input id="lastName" defaultValue="Adı" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" type="email" defaultValue="kullanici@ornek.com" disabled />
              <p className="text-xs text-muted-foreground">E-posta adresinizi değiştirmek için lütfen destek ekibiyle iletişime geçin.</p>
            </div>
            <Button>Değişiklikleri Kaydet</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Şifre Değiştir</CardTitle>
            <CardDescription>
              Hesap güvenliğiniz için şifrenizi düzenli olarak değiştirin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mevcut Şifre</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Yeni Şifre</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button>Şifreyi Güncelle</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
