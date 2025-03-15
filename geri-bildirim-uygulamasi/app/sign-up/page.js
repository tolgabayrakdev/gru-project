import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md border border-blue-100 dark:border-blue-900 shadow-lg">
          <CardHeader className="space-y-1 border-b pb-6">
            <CardTitle className="text-2xl font-bold text-center text-primary">Kayıt Ol</CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              Hesap oluşturmak için bilgilerinizi girin
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">Ad</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Adınız" 
                    required 
                    className="border-blue-100 dark:border-blue-900 focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Soyad</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Soyadınız" 
                    required 
                    className="border-blue-100 dark:border-blue-900 focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">E-posta</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="ornek@mail.com" 
                  required 
                  className="border-blue-100 dark:border-blue-900 focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Parola</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="border-blue-100 dark:border-blue-900 focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Parola Tekrar</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  required 
                  className="border-blue-100 dark:border-blue-900 focus:border-primary focus:ring-primary"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-colors"
              >
                Kayıt Ol
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-blue-100 dark:border-blue-900 pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Zaten hesabınız var mı?{" "}
              <Link href="/sign-in" className="font-medium text-primary hover:text-primary/90 transition-colors">
                Giriş Yap
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
