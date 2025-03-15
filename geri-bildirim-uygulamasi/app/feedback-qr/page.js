"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function FeedbackQR() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get the base URL of the application
    const baseUrl = window.location.origin;
    setUrl(`${baseUrl}/feedback-form`);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link kopyalandı!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById("qr-code");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "feedback-form-qr.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast.success("QR kod indirildi!");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Geri Bildirim Formu QR Kodu</CardTitle>
          <CardDescription>
            Bu QR kodu taratarak veya linki paylaşarak geri bildirim formuna erişebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="bg-white p-4 rounded-lg">
            <QRCode
              id="qr-code"
              value={url}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div className="w-full space-y-4">
            <div className="flex space-x-2">
              <Input value={url} readOnly />
              <Button onClick={handleCopyLink}>
                {copied ? "Kopyalandı!" : "Kopyala"}
              </Button>
            </div>
            
            <Button 
              onClick={handleDownloadQR} 
              variant="outline" 
              className="w-full"
            >
              QR Kodu İndir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 