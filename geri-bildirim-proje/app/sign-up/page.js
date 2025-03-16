import Link from "next/link";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUp() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-2">
                        <QrCode className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Hesap Oluştur</CardTitle>
                    <CardDescription className="text-center">
                        Geri bildirim formları oluşturmak için kaydolun
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Ad</Label>
                            <Input id="firstName" placeholder="Adınız" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Soyad</Label>
                            <Input id="lastName" placeholder="Soyadınız" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input id="email" type="email" placeholder="ornek@mail.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Şifre</Label>
                        <Input id="password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                        <Input id="confirmPassword" type="password" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            <span className="text-muted-foreground">
                                <Link href="/terms" className="text-primary hover:underline">
                                    Kullanım Şartları
                                </Link>
                                'nı kabul ediyorum
                            </span>
                        </label>
                    </div>
                    <Button className="w-full">Kaydol</Button>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div className="text-sm text-center text-muted-foreground">
                        Zaten hesabınız var mı?{" "}
                        <Link href="/sign-in" className="text-primary hover:underline">
                            Giriş Yapın
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
