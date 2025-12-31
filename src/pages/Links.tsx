import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Link2, 
  Copy, 
  Check, 
  ExternalLink,
  QrCode,
  BarChart3,
  MousePointerClick,
  ShoppingCart,
  TrendingUp,
  Search,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const links = [
  {
    id: "1",
    product: {
      title: "Premium Wireless Earbuds Pro",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop",
      slug: "premium-wireless-earbuds-pro",
    },
    refCode: "john_d_earbuds",
    shortUrl: "refshare.app/p/earbuds?ref=john_d",
    clicks: 456,
    conversions: 34,
    conversionRate: 7.5,
    earnings: 12500,
    status: "active",
    createdAt: "2024-01-05",
  },
  {
    id: "2",
    product: {
      title: "Smart Fitness Watch Series X",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop",
      slug: "smart-fitness-watch-series-x",
    },
    refCode: "john_d_watch",
    shortUrl: "refshare.app/p/watch?ref=john_d",
    clicks: 321,
    conversions: 28,
    conversionRate: 8.7,
    earnings: 8960,
    status: "active",
    createdAt: "2024-01-08",
  },
  {
    id: "3",
    product: {
      title: "Coffee Maker - Espresso Pro",
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop",
      slug: "coffee-maker-espresso-pro",
    },
    refCode: "john_d_coffee",
    shortUrl: "refshare.app/p/coffee?ref=john_d",
    clicks: 189,
    conversions: 12,
    conversionRate: 6.3,
    earnings: 3120,
    status: "active",
    createdAt: "2024-01-10",
  },
];

const totalStats = {
  totalLinks: 12,
  totalClicks: 1234,
  totalConversions: 89,
  avgConversionRate: 7.2,
};

export default function Links() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    setCopiedId(id);
    toast({
      title: "Link copied!",
      description: "Share link copied to clipboard.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLinks = links.filter(link => 
    link.product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="border-b bg-card">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold">My Links</h1>
              <p className="text-muted-foreground mt-1">
                Manage and track your share links
              </p>
            </div>
            <Button variant="gradient" asChild>
              <Link to="/products">
                <Plus className="h-4 w-4" />
                Create New Link
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Link2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">{totalStats.totalLinks}</p>
                  <p className="text-sm text-muted-foreground">Active Links</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MousePointerClick className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">{totalStats.totalClicks.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">{totalStats.totalConversions}</p>
                  <p className="text-sm text-muted-foreground">Conversions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">{totalStats.avgConversionRate}%</p>
                  <p className="text-sm text-muted-foreground">Avg. CVR</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search links..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Links List */}
        <div className="space-y-4">
          {filteredLinks.map((link) => (
            <Card key={link.id} hover>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Product Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={link.product.image} 
                      alt={link.product.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-semibold truncate">
                          {link.product.title}
                        </h3>
                        <Badge variant="success" className="shrink-0">Active</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                          {link.shortUrl}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-6 lg:gap-8">
                    <div className="text-center">
                      <p className="text-lg font-heading font-bold">{link.clicks}</p>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-heading font-bold">{link.conversions}</p>
                      <p className="text-xs text-muted-foreground">Sales</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-heading font-bold">{link.conversionRate}%</p>
                      <p className="text-xs text-muted-foreground">CVR</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-heading font-bold text-success">
                        ₹{link.earnings.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Earned</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button 
                      variant={copiedId === link.id ? "success" : "default"} 
                      size="sm"
                      onClick={() => handleCopy(link.id, link.shortUrl)}
                    >
                      {copiedId === link.id ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="icon">
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/products/${link.product.slug}`}>
                        <BarChart3 className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLinks.length === 0 && (
          <div className="text-center py-16">
            <Link2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium">No links found</p>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "Create your first share link to get started"}
            </p>
            <Button variant="gradient" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
