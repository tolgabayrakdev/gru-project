"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function FeedbackForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    feedbackType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, feedbackType: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.feedbackType) {
      toast.error("Lütfen tüm alanları doldurunuz.");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        toast.success("Geri bildiriminiz başarıyla gönderildi.");
        setFormData({
          title: "",
          content: "",
          feedbackType: "",
        });
      } else {
        const error = await response.json();
        toast.error(error.message || "Bir hata oluştu.");
      }
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Geri Bildirim Formu</CardTitle>
          <CardDescription>
            Lütfen görüş, öneri, dilek veya şikayetlerinizi bizimle paylaşın.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Başlık
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Geri bildirim başlığı"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="feedbackType" className="text-sm font-medium">
                Geri Bildirim Tipi
              </label>
              <Select 
                value={formData.feedbackType} 
                onValueChange={handleSelectChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Geri bildirim tipi seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dilek">Dilek</SelectItem>
                  <SelectItem value="istek">İstek</SelectItem>
                  <SelectItem value="şikayet">Şikayet</SelectItem>
                  <SelectItem value="öneri">Öneri</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                İçerik
              </label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Geri bildiriminizi detaylı bir şekilde yazınız"
                rows={5}
                required
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Gönderiliyor..." : "Gönder"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 