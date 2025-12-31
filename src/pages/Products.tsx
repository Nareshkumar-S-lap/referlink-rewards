import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Star, 
  Share2,
  ChevronRight,
  Sparkles
} from "lucide-react";

// Mock product data
const products = [
  {
    id: "1",
    title: "Premium Wireless Earbuds Pro",
    slug: "premium-wireless-earbuds-pro",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
    price: 4999,
    commissionType: "percentage",
    commissionValue: 15,
    category: "Electronics",
    rating: 4.8,
    reviewCount: 234,
    tags: ["trending", "bestseller"],
  },
  {
    id: "2",
    title: "Organic Face Serum - Vitamin C",
    slug: "organic-face-serum-vitamin-c",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop",
    price: 1299,
    commissionType: "percentage",
    commissionValue: 20,
    category: "Beauty",
    rating: 4.6,
    reviewCount: 567,
    tags: ["new"],
  },
  {
    id: "3",
    title: "Smart Fitness Watch Series X",
    slug: "smart-fitness-watch-series-x",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop",
    price: 8999,
    commissionType: "flat",
    commissionValue: 800,
    category: "Electronics",
    rating: 4.9,
    reviewCount: 1203,
    tags: ["bestseller"],
  },
  {
    id: "4",
    title: "Yoga Mat Premium - Eco Friendly",
    slug: "yoga-mat-premium-eco-friendly",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop",
    price: 1999,
    commissionType: "percentage",
    commissionValue: 25,
    category: "Fitness",
    rating: 4.7,
    reviewCount: 89,
    tags: ["eco"],
  },
  {
    id: "5",
    title: "Portable Bluetooth Speaker",
    slug: "portable-bluetooth-speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    price: 2499,
    commissionType: "percentage",
    commissionValue: 12,
    category: "Electronics",
    rating: 4.5,
    reviewCount: 342,
    tags: [],
  },
  {
    id: "6",
    title: "Coffee Maker - Espresso Pro",
    slug: "coffee-maker-espresso-pro",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop",
    price: 12999,
    commissionType: "flat",
    commissionValue: 1500,
    category: "Home",
    rating: 4.8,
    reviewCount: 456,
    tags: ["premium"],
  },
];

const categories = ["All", "Electronics", "Beauty", "Fitness", "Home", "Fashion"];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              500+ Products Available
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4">
              Find Products to
              <span className="gradient-text"> Share & Earn</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Browse our curated collection of high-converting products. 
              Generate your unique link and start earning commissions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px] h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="border-b bg-card sticky top-16 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="shrink-0"
                >
                  {cat}
                </Button>
              ))}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] shrink-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="commission-high">Commission: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

interface ProductCardProps {
  product: typeof products[0];
}

function ProductCard({ product }: ProductCardProps) {
  const commissionDisplay = product.commissionType === "percentage"
    ? `${product.commissionValue}%`
    : `₹${product.commissionValue}`;
  
  const estimatedEarning = product.commissionType === "percentage"
    ? Math.round((product.price * product.commissionValue) / 100)
    : product.commissionValue;

  return (
    <Card hover className="overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.tags.includes("trending") && (
            <Badge className="bg-destructive text-destructive-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
          {product.tags.includes("bestseller") && (
            <Badge variant="referred">Bestseller</Badge>
          )}
          {product.tags.includes("new") && (
            <Badge variant="success">New</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="commission" className="text-sm px-3 py-1">
            {commissionDisplay} Commission
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h3 className="font-heading font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
        </div>

        <div className="flex items-end justify-between pt-2 border-t">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-heading font-bold text-lg">₹{product.price.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">You earn</p>
            <p className="font-heading font-bold text-lg text-success">
              ₹{estimatedEarning.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="gradient" className="flex-1" asChild>
            <Link to={`/products/${product.slug}`}>
              <Share2 className="h-4 w-4" />
              Share & Earn
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link to={`/products/${product.slug}`}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
