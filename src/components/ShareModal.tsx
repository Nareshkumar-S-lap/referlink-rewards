import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Check,
  Download,
  MessageCircle,
  Send,
  Twitter,
  Facebook,
  Mail,
  Smartphone,
  Share2,
  QrCode,
  Link2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareLink: string;
  productTitle: string;
  productPrice: number;
  productImage?: string;
  defaultTab?: "link" | "qr";
}

export function ShareModal({
  open,
  onOpenChange,
  shareLink,
  productTitle,
  productPrice,
  productImage,
  defaultTab = "link",
}: ShareModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const shareMessage = `Check out this amazing deal! ${productTitle} for just ₹${productPrice.toLocaleString()} ${shareLink}`;
  const encodedMessage = encodeURIComponent(shareMessage);
  const encodedUrl = encodeURIComponent(shareLink);
  const encodedTitle = encodeURIComponent(productTitle);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 300;
      canvas.height = 300;
      ctx?.drawImage(img, 0, 0, 300, 300);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-${productTitle.replace(/\s+/g, "-").toLowerCase()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    
    toast({
      title: "Downloaded!",
      description: "QR code saved to your device.",
    });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle,
          text: `Check out this amazing deal! ${productTitle} for just ₹${productPrice.toLocaleString()}`,
          url: shareLink,
        });
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "text-green-500",
      url: `https://wa.me/?text=${encodedMessage}`,
    },
    {
      name: "Telegram",
      icon: Send,
      color: "text-blue-500",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "text-sky-500",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(`Check out ${productTitle}!`)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "text-orange-500",
      url: `mailto:?subject=${encodedTitle}&body=${encodedMessage}`,
    },
    {
      name: "SMS",
      icon: Smartphone,
      color: "text-primary",
      url: `sms:?body=${encodedMessage}`,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share Product
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link" className="gap-2">
              <Link2 className="h-4 w-4" />
              Share Link
            </TabsTrigger>
            <TabsTrigger value="qr" className="gap-2">
              <QrCode className="h-4 w-4" />
              QR Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4 mt-4">
            {/* Copy Link */}
            <div className="flex gap-2">
              <Input
                value={shareLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant={copied ? "success" : "default"}
                size="icon"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            {/* Social Share Grid */}
            <div className="grid grid-cols-3 gap-2">
              {shareLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="outline"
                  className="flex-col h-auto py-3 gap-1.5 hover:bg-accent/50"
                  onClick={() => window.open(link.url, "_blank")}
                >
                  <link.icon className={`h-5 w-5 ${link.color}`} />
                  <span className="text-xs">{link.name}</span>
                </Button>
              ))}
            </div>

            {/* Native Share (mobile) */}
            {"share" in navigator && (
              <Button
                variant="gradient"
                className="w-full"
                onClick={handleNativeShare}
              >
                <Share2 className="h-4 w-4" />
                Share via Device
              </Button>
            )}
          </TabsContent>

          <TabsContent value="qr" className="space-y-4 mt-4">
            {/* QR Code Display */}
            <div
              ref={qrRef}
              className="flex flex-col items-center justify-center p-6 bg-background rounded-xl border-2 border-dashed border-primary/20"
            >
              <div className="p-4 bg-white rounded-xl shadow-lg">
                <QRCodeSVG
                  value={shareLink}
                  size={180}
                  level="H"
                  includeMargin={false}
                  imageSettings={
                    productImage
                      ? {
                          src: productImage,
                          height: 40,
                          width: 40,
                          excavate: true,
                        }
                      : undefined
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Scan to view product
              </p>
            </div>

            {/* QR Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={handleDownloadQR}>
                <Download className="h-4 w-4" />
                Download PNG
              </Button>
              <Button variant="default" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy Link
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Print this QR code on flyers, business cards, or share digitally
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
