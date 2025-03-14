import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full flex items-center justify-center flex-col">
            <h1 className="text-9xl font-bold mb-4">404</h1>
            <p className="text-xl font-bold mb-1">Üzgünüz, aradığınız sayfa bulunamadı.</p>
            <Button onClick={() => navigate(-1)}>
                Geri Dön
            </Button>
        </div>
    )
}