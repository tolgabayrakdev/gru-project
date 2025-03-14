import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  description: z.string().min(1, "Açıklama zorunludur"),
  gradient: z.string(),
  font: z.string(),
  backgroundColor: z.string().regex(/^#/, "Geçerli bir renk kodu giriniz"),
  feedbackPageId: z.string().optional(),
})

const gradients = [
  { value: "bg-gradient-to-r from-purple-500 to-pink-500", label: "Mor - Pembe" },
  { value: "bg-gradient-to-r from-cyan-500 to-blue-500", label: "Mavi - Turkuaz" },
  { value: "bg-gradient-to-r from-orange-500 to-red-500", label: "Turuncu - Kırmızı" },
]

const fonts = [
  { value: "font-sans", label: "Sans Serif" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Monospace" },
]

export default function CreatePreviewPage() {
  const [feedbackPages, setFeedbackPages] = useState([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      gradient: gradients[0].value,
      font: fonts[0].value,
      backgroundColor: "#ffffff",
    },
  })

  useEffect(() => {
    // Feedback sayfalarını çek
    const fetchFeedbackPages = async () => {
      try {
        const response = await fetch("/api/feedback-pages")
        const data = await response.json()
        setFeedbackPages(data)
      } catch (error) {
        console.error("Feedback sayfaları yüklenemedi:", error)
      }
    }

    fetchFeedbackPages()
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/preview-pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Önizleme sayfası oluşturulamadı")
      }

      // Başarılı olduğunda yönlendirme yapılabilir
      // router.push("/preview-pages")
    } catch (error) {
      console.error("Hata:", error)
    }
  }

  const formValues = form.watch()

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Form */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Yeni Önizleme Sayfası</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gradient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gradient</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Gradient seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gradients.map((gradient) => (
                          <SelectItem key={gradient.value} value={gradient.value}>
                            {gradient.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="font"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Font seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fonts.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arka Plan Rengi</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feedbackPageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback Sayfası</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Feedback sayfası seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {feedbackPages.map((page: any) => (
                          <SelectItem key={page.id} value={page.id}>
                            {page.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Oluştur</Button>
            </form>
          </Form>
        </Card>

        {/* Preview */}
        <Card className={`p-6 ${formValues.gradient} ${formValues.font}`} style={{ backgroundColor: formValues.backgroundColor }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{formValues.title || "Başlık"}</h2>
            <p className="text-gray-700">{formValues.description || "Açıklama"}</p>
          </div>
        </Card>
      </div>
    </div>
  )
} 