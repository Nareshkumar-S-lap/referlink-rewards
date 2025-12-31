import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Link2, 
  MousePointerClick,
  ShoppingCart,
  ArrowUpRight,
  Star,
  BarChart3,
  Calendar,
  ChevronRight
} from "lucide-react";

// Mock data
const stats = [
  {
    title: "Total Earnings",
    value: "₹24,580",
    change: "+12.5%",
    trend: "up",
    icon: Wallet,
    color: "success",
  },
  {
    title: "Total Clicks",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: MousePointerClick,
    color: "primary",
  },
  {
    title: "Conversions",
    value: "89",
    change: "+15.3%",
    trend: "up",
    icon: ShoppingCart,
    color: "accent",
  },
  {
    title: "Active Links",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Link2,
    color: "secondary",
  },
];

const recentConversions = [
  {
    id: "1",
    product: "Premium Wireless Earbuds Pro",
    buyer: "Pri***a",
    amount: 4999,
    commission: 750,
    status: "pending",
    date: "Today, 2:30 PM",
  },
  {
    id: "2",
    product: "Smart Fitness Watch Series X",
    buyer: "Ram***h",
    amount: 8999,
    commission: 800,
    status: "approved",
    date: "Yesterday",
  },
  {
    id: "3",
    product: "Organic Face Serum",
    buyer: "Anu***a",
    amount: 1299,
    commission: 260,
    status: "paid",
    date: "Jan 15, 2024",
  },
];

const topProducts = [
  {
    id: "1",
    title: "Premium Wireless Earbuds Pro",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop",
    clicks: 456,
    conversions: 34,
    earnings: 12500,
  },
  {
    id: "2",
    title: "Smart Fitness Watch Series X",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop",
    clicks: 321,
    conversions: 28,
    earnings: 8960,
  },
  {
    id: "3",
    title: "Coffee Maker - Espresso Pro",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop",
    clicks: 189,
    conversions: 12,
    earnings: 3120,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="border-b bg-card">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Track your performance and earnings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Last 30 days
              </Button>
              <Button variant="gradient" asChild>
                <Link to="/products">
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} hover>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  <Badge 
                    variant={stat.trend === "up" ? "success" : "destructive"}
                    className="gap-1"
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-heading font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Conversions */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Recent Conversions
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/earnings">
                  View all
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentConversions.map((conversion) => (
                  <div 
                    key={conversion.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{conversion.product}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>Buyer: {conversion.buyer}</span>
                        <span>·</span>
                        <span>{conversion.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className="font-semibold text-success">+₹{conversion.commission}</p>
                        <p className="text-xs text-muted-foreground">₹{conversion.amount} sale</p>
                      </div>
                      <Badge 
                        variant={
                          conversion.status === "paid" ? "paid" :
                          conversion.status === "approved" ? "approved" : "pending"
                        }
                      >
                        {conversion.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Earnings Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
                  <div>
                    <p className="text-sm text-muted-foreground">Available to Withdraw</p>
                    <p className="text-2xl font-heading font-bold text-success">₹8,450</p>
                  </div>
                  <Button variant="success" size="sm">
                    Withdraw
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-lg font-heading font-semibold">₹12,380</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Paid</p>
                    <p className="text-lg font-heading font-semibold">₹3,750</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3">Performance</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <span className="font-medium">7.2%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Order Value</span>
                    <span className="font-medium">₹3,890</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">EPC</span>
                    <span className="font-medium">₹19.92</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Top Performing Products
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/links">
                View all links
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topProducts.map((product, idx) => (
                <div 
                  key={product.id}
                  className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/20 hover:bg-primary/5 transition-all"
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      #{idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-2">{product.title}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{product.clicks} clicks</span>
                      <span>{product.conversions} sales</span>
                    </div>
                    <p className="text-sm font-semibold text-success mt-1">
                      ₹{product.earnings.toLocaleString()} earned
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
