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

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ad gereklidir";
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Soyad gereklidir";
    }
    
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
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı gereklidir";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }
    
    // Terms validation
    if (!formData.terms) {
      newErrors.terms = "Kullanım şartlarını kabul etmelisiniz";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      // Burada kayıt işlemi yapılacak (API çağrısı vb.)
      console.log("Form gönderiliyor:", formData);
      
      // Simüle edilmiş API çağrısı
      setTimeout(() => {
        setIsSubmitting(false);
        // Başarılı kayıt sonrası yönlendirme yapılabilir
      }, 1500);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Yeni hesap oluşturun
            </CardTitle>
            <CardDescription className="text-center">
              Zaten hesabınız var mı?{" "}
              <Link href="/sign-in" className="font-medium text-primary hover:text-primary/90">
                Giriş yapın
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                    Ad
                  </label>
                  <Input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    placeholder="Adınız"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                    Soyad
                  </label>
                  <Input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    placeholder="Soyadınız"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
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
                  autoComplete="new-password"
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
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                  Şifre Tekrarı
                </label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Şifrenizi tekrar girin"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={formData.terms}
                  onChange={handleChange}
                  className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ${
                    errors.terms ? "border-red-500" : ""
                  }`}
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-900">
                  <span>
                    <Link href="#" className="font-medium text-primary hover:text-primary/90">
                      Kullanım şartlarını
                    </Link>{" "}
                    ve{" "}
                    <Link href="#" className="font-medium text-primary hover:text-primary/90">
                      gizlilik politikasını
                    </Link>{" "}
                    kabul ediyorum
                  </span>
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-600">{errors.terms}</p>
              )}

              <Button 
                type="submit" 
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Kayıt yapılıyor..." : "Kayıt Ol"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-xs text-gray-600">
              Kayıt olarak, tüm kişisel verilerinizin gizlilik politikamıza uygun olarak işleneceğini kabul etmiş olursunuz.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
