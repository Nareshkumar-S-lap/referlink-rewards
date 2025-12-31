import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Send, 
  QrCode, 
  Link2, 
  BarChart3,
  Clock,
  ShieldCheck,
  TrendingUp,
  ArrowLeft,
  ThumbsUp,
  Flag,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock product data
const product = {
  id: "1",
  title: "Premium Wireless Earbuds Pro",
  slug: "premium-wireless-earbuds-pro",
  description: "Experience crystal-clear audio with our Premium Wireless Earbuds Pro. Featuring active noise cancellation, 30-hour battery life, and premium sound quality that rivals high-end headphones. Perfect for music lovers, podcast enthusiasts, and professionals who demand the best.",
  images: [
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=600&h=600&fit=crop",
  ],
  price: 4999,
  commissionType: "percentage",
  commissionValue: 15,
  attributionWindow: 7,
  returnWindow: 7,
  category: "Electronics",
  rating: 4.8,
  reviewCount: 234,
  tags: ["trending", "bestseller"],
};

// Mock reviews
const reviews = [
  {
    id: "1",
    buyerName: "Priya S.",
    rating: 5,
    title: "Best earbuds I've ever owned!",
    body: "The sound quality is incredible. Battery life is exactly as advertised. Highly recommend!",
    isVerified: true,
    isReferred: true,
    referrerName: "Rahul M.",
    createdAt: "2024-01-15",
    helpful: 24,
  },
  {
    id: "2",
    buyerName: "Amit K.",
    rating: 4,
    title: "Great value for money",
    body: "Good sound quality and comfortable fit. Only minor issue is the app could be better.",
    isVerified: true,
    isReferred: false,
    referrerName: null,
    createdAt: "2024-01-10",
    helpful: 12,
  },
  {
    id: "3",
    buyerName: "Sneha R.",
    rating: 5,
    title: "Amazing noise cancellation!",
    body: "Perfect for working from home. The noise cancellation is on another level.",
    isVerified: true,
    isReferred: true,
    referrerName: "Vikram P.",
    createdAt: "2024-01-05",
    helpful: 18,
  },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareLink = `https://refshare.app/p/${slug}?ref=john_d`;

  const handleGenerateLink = () => {
    setLinkGenerated(true);
    toast({
      title: "Link Generated!",
      description: "Your unique share link is ready.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const commissionDisplay = product.commissionType === "percentage"
    ? `${product.commissionValue}%`
    : `₹${product.commissionValue}`;
  
  const estimatedEarning = product.commissionType === "percentage"
    ? Math.round((product.price * product.commissionValue) / 100)
    : product.commissionValue;

  return (
    <div className="min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="border-b bg-card">
        <div className="container py-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.includes("trending") && (
                  <Badge variant="destructive">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {product.tags.includes("bestseller") && (
                  <Badge variant="referred">Bestseller</Badge>
                )}
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-5 w-5 ${star <= product.rating ? "fill-accent text-accent" : "text-muted"}`} 
                    />
                  ))}
                  <span className="font-semibold ml-1">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Price & Commission */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Product Price</p>
                    <p className="font-heading text-3xl font-bold">₹{product.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Your Commission</p>
                    <p className="font-heading text-3xl font-bold text-success">
                      ₹{estimatedEarning.toLocaleString()}
                    </p>
                    <Badge variant="commission" className="mt-1">{commissionDisplay}</Badge>
                  </div>
                </div>
                <div className="flex gap-4 mt-4 pt-4 border-t text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {product.attributionWindow} day attribution
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    {product.returnWindow} day return window
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Link Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-primary" />
                  Your Share Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!linkGenerated ? (
                  <Button variant="hero" size="xl" className="w-full" onClick={handleGenerateLink}>
                    <Share2 className="h-5 w-5" />
                    Generate My Share Link
                  </Button>
                ) : (
                  <>
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
                    <div className="grid grid-cols-4 gap-2">
                      <Button variant="outline" className="flex-col h-auto py-3 gap-1">
                        <MessageCircle className="h-5 w-5 text-green-500" />
                        <span className="text-xs">WhatsApp</span>
                      </Button>
                      <Button variant="outline" className="flex-col h-auto py-3 gap-1">
                        <Send className="h-5 w-5 text-blue-500" />
                        <span className="text-xs">Telegram</span>
                      </Button>
                      <Button variant="outline" className="flex-col h-auto py-3 gap-1">
                        <QrCode className="h-5 w-5 text-foreground" />
                        <span className="text-xs">QR Code</span>
                      </Button>
                      <Button variant="outline" className="flex-col h-auto py-3 gap-1">
                        <Share2 className="h-5 w-5 text-foreground" />
                        <span className="text-xs">More</span>
                      </Button>
                    </div>
                  </>
                )}

                {/* Link Stats */}
                {linkGenerated && (
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                    <div className="text-center">
                      <p className="font-heading text-2xl font-bold">0</p>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                    </div>
                    <div className="text-center">
                      <p className="font-heading text-2xl font-bold">0</p>
                      <p className="text-xs text-muted-foreground">Conversions</p>
                    </div>
                    <div className="text-center">
                      <p className="font-heading text-2xl font-bold text-success">₹0</p>
                      <p className="text-xs text-muted-foreground">Earned</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Buyer CTA */}
            <Button variant="gold" size="xl" className="w-full">
              Buy Now - ₹{product.price.toLocaleString()}
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16">
          <Tabs defaultValue="reviews">
            <TabsList>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="details">Product Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews" className="mt-6">
              {/* Rating Summary */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="font-heading text-5xl font-bold">{product.rating}</p>
                        <div className="flex gap-0.5 justify-center my-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= product.rating ? "fill-accent text-accent" : "text-muted"}`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{product.reviewCount} reviews</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const percent = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : 2;
                          return (
                            <div key={rating} className="flex items-center gap-2">
                              <span className="text-sm w-3">{rating}</span>
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              <Progress value={percent} className="h-2 flex-1" />
                              <span className="text-xs text-muted-foreground w-8">{percent}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Button variant="gradient" size="lg">
                        <Star className="h-4 w-4" />
                        Write a Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6 prose prose-sm max-w-none">
                  <h3>Product Specifications</h3>
                  <ul>
                    <li>Active Noise Cancellation (ANC)</li>
                    <li>30-hour total battery life</li>
                    <li>Bluetooth 5.3 connectivity</li>
                    <li>IPX4 water resistance</li>
                    <li>Touch controls</li>
                    <li>Wireless charging case</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}

interface ReviewCardProps {
  review: typeof reviews[0];
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{review.buyerName}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-3 w-3 ${star <= review.rating ? "fill-accent text-accent" : "text-muted"}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{review.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="verified">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Verified Purchase
            </Badge>
            {review.isReferred && (
              <Badge variant="referred">
                Purchased via {review.referrerName}'s link
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">{review.title}</h4>
          <p className="text-muted-foreground">{review.body}</p>
        </div>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t">
          <Button variant="ghost" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            Helpful ({review.helpful})
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Flag className="h-4 w-4" />
            Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
