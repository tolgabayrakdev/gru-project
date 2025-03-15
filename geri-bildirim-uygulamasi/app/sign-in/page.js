"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "E-posta adresi gereklidir";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      // Burada giriş işlemi yapılacak (API çağrısı vb.)
      console.log("Form gönderiliyor:", formData);
      
      // Simüle edilmiş API çağrısı
      setTimeout(() => {
        setIsSubmitting(false);
        // Başarılı giriş sonrası yönlendirme yapılabilir
      }, 1500);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Hesabınıza giriş yapın
            </CardTitle>
            <CardDescription className="text-center">
              Veya{" "}
              <Link href="/sign-up" className="font-medium text-primary hover:text-primary/90">
                yeni bir hesap oluşturun
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email-address" className="text-sm font-medium text-gray-700">
                  E-posta adresi
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="E-posta adresiniz"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Şifre
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Şifreniz"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">
                    Beni hatırla
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="#" className="font-medium text-primary hover:text-primary/90">
                    Şifrenizi mi unuttunuz?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full mt-4" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-xs text-gray-600">
              Giriş yaparak, <Link href="#" className="text-primary hover:text-primary/90">Kullanım Şartları</Link> ve{" "}
              <Link href="#" className="text-primary hover:text-primary/90">Gizlilik Politikası</Link>'nı kabul etmiş olursunuz.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
