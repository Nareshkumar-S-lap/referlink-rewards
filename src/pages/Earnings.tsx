import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Banknote,
  ChevronDown
} from "lucide-react";

// Mock data
const earningsSummary = {
  total: 24580,
  pending: 12380,
  approved: 8450,
  paid: 3750,
  reversed: 0,
};

const conversions = [
  {
    id: "1",
    orderId: "ORD-2024-001234",
    product: "Premium Wireless Earbuds Pro",
    productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop",
    buyer: "Pri***a S.",
    orderAmount: 4999,
    commission: 750,
    status: "pending",
    date: "2024-01-20",
    returnWindowEnds: "2024-01-27",
  },
  {
    id: "2",
    orderId: "ORD-2024-001198",
    product: "Smart Fitness Watch Series X",
    productImage: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop",
    buyer: "Ram***h K.",
    orderAmount: 8999,
    commission: 800,
    status: "approved",
    date: "2024-01-18",
    returnWindowEnds: null,
  },
  {
    id: "3",
    orderId: "ORD-2024-001156",
    product: "Organic Face Serum - Vitamin C",
    productImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop",
    buyer: "Anu***a R.",
    orderAmount: 1299,
    commission: 260,
    status: "paid",
    date: "2024-01-15",
    returnWindowEnds: null,
  },
  {
    id: "4",
    orderId: "ORD-2024-001089",
    product: "Yoga Mat Premium - Eco Friendly",
    productImage: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop",
    buyer: "Vik***m P.",
    orderAmount: 1999,
    commission: 500,
    status: "approved",
    date: "2024-01-12",
    returnWindowEnds: null,
  },
  {
    id: "5",
    orderId: "ORD-2024-001045",
    product: "Coffee Maker - Espresso Pro",
    productImage: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop",
    buyer: "Sne***a M.",
    orderAmount: 12999,
    commission: 1500,
    status: "paid",
    date: "2024-01-10",
    returnWindowEnds: null,
  },
];

const payouts = [
  {
    id: "1",
    amount: 2500,
    status: "processing",
    requestedAt: "2024-01-19",
    processedAt: null,
    method: "UPI",
  },
  {
    id: "2",
    amount: 1250,
    status: "paid",
    requestedAt: "2024-01-05",
    processedAt: "2024-01-07",
    method: "Bank Transfer",
  },
];

export default function Earnings() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredConversions = statusFilter === "all" 
    ? conversions 
    : conversions.filter(c => c.status === statusFilter);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="border-b bg-card">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold">Earnings</h1>
              <p className="text-muted-foreground mt-1">
                Track your commissions and payouts
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="gradient" className="gap-2">
                <Banknote className="h-4 w-4" />
                Request Payout
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 space-y-8">
        {/* Earnings Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="col-span-2 lg:col-span-1 gradient-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5" />
                <p className="text-sm opacity-90">Total Earnings</p>
              </div>
              <p className="text-3xl font-heading font-bold">₹{earningsSummary.total.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <p className="text-2xl font-heading font-bold">₹{earningsSummary.pending.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
              <p className="text-2xl font-heading font-bold text-success">₹{earningsSummary.approved.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">Paid</p>
              </div>
              <p className="text-2xl font-heading font-bold">₹{earningsSummary.paid.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <p className="text-sm text-muted-foreground">Reversed</p>
              </div>
              <p className="text-2xl font-heading font-bold">₹{earningsSummary.reversed.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="conversions">
          <TabsList>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          <TabsContent value="conversions" className="mt-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="reversed">Reversed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
            </div>

            {/* Conversions Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-medium text-sm">Product</th>
                        <th className="text-left p-4 font-medium text-sm">Order</th>
                        <th className="text-left p-4 font-medium text-sm">Buyer</th>
                        <th className="text-right p-4 font-medium text-sm">Order Amount</th>
                        <th className="text-right p-4 font-medium text-sm">Commission</th>
                        <th className="text-center p-4 font-medium text-sm">Status</th>
                        <th className="text-left p-4 font-medium text-sm">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredConversions.map((conversion) => (
                        <tr key={conversion.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={conversion.productImage} 
                                alt={conversion.product}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <span className="font-medium text-sm line-clamp-1 max-w-[200px]">
                                {conversion.product}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-mono text-xs">{conversion.orderId}</span>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {conversion.buyer}
                          </td>
                          <td className="p-4 text-right font-medium">
                            ₹{conversion.orderAmount.toLocaleString()}
                          </td>
                          <td className="p-4 text-right font-semibold text-success">
                            +₹{conversion.commission.toLocaleString()}
                          </td>
                          <td className="p-4 text-center">
                            <Badge 
                              variant={
                                conversion.status === "paid" ? "paid" :
                                conversion.status === "approved" ? "approved" :
                                conversion.status === "reversed" ? "destructive" : "pending"
                              }
                            >
                              {conversion.status}
                            </Badge>
                            {conversion.returnWindowEnds && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Clears {conversion.returnWindowEnds}
                              </p>
                            )}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {conversion.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Payout Request Card */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Request Payout</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-success/10">
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-3xl font-heading font-bold text-success">₹8,450</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payout Amount</label>
                    <Input type="number" placeholder="Enter amount" />
                    <p className="text-xs text-muted-foreground">Minimum: ₹500</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payout Method</label>
                    <Select defaultValue="upi">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI - john@okaxis</SelectItem>
                        <SelectItem value="bank">Bank Transfer - HDFC ****1234</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="gradient" className="w-full">
                    Request Payout
                  </Button>
                </CardContent>
              </Card>

              {/* Payout History */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payouts.map((payout) => (
                      <div 
                        key={payout.id}
                        className="flex items-center justify-between p-4 rounded-lg border"
                      >
                        <div>
                          <p className="font-heading font-bold text-lg">₹{payout.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{payout.method}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={payout.status === "paid" ? "paid" : "pending"}
                          >
                            {payout.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {payout.processedAt || payout.requestedAt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
