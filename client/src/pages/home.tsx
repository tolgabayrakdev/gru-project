import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            <div className="container mx-auto px-4 pt-20 pb-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Müşteri Geri Bildirimlerinizi Yönetin
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Müşterilerinizden gelen her türlü geri bildirimi kolayca toplayın, analiz edin ve işletmenizi geliştirin.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/sign-up">
                            <Button size="lg">
                                Hemen Başla
                            </Button>
                        </Link>
                        <Link to="/sign-in">
                            <Button variant="outline" size="lg">
                                Giriş Yap
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Özellikler</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Kolay Geri Bildirim Toplama"
                        description="Özelleştirilebilir formlar ile müşterilerinizden şikayet, istek ve tebrikleri kolayca toplayın."
                    />
                    <FeatureCard
                        title="Detaylı Analiz"
                        description="Toplanan geri bildirimleri kategorize edin, analiz edin ve işletmeniz için değerli içgörüler elde edin."
                    />
                    <FeatureCard
                        title="Akıllı Raporlama"
                        description="Otomatik raporlar ile müşteri memnuniyetini takip edin ve iyileştirme alanlarını belirleyin."
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <StepCard
                        number="1"
                        title="Üye Olun"
                        description="Hızlıca üye olun ve hesabınızı oluşturun."
                    />
                    <StepCard
                        number="2"
                        title="Formu Oluşturun"
                        description="İhtiyaçlarınıza göre özel geri bildirim formu oluşturun."
                    />
                    <StepCard
                        number="3"
                        title="Analiz Edin"
                        description="Gelen geri bildirimleri analiz edin ve raporları inceleyin."
                    />
                </div>
            </div>
        </div>
    )
}

function FeatureCard({ title, description }: { title: string, description: string }) {
    return (
        <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
    return (
        <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {number}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}
