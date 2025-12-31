import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Wallet,
  Star,
  Users,
  Zap
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container py-20 lg:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="h-3 w-3 mr-1" />
              Trusted by 50,000+ Affiliates
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Share Products You Love.
              <span className="gradient-text"> Earn Real Money.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Generate tracked links, share with your audience, and earn commissions on every sale. 
              Transparent tracking, verified reviews, and fast payouts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth/register">
                  Start Earning Today
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "₹2.5Cr+", label: "Paid to Affiliates" },
              { value: "50K+", label: "Active Affiliates" },
              { value: "500+", label: "Products" },
              { value: "15%", label: "Avg. Commission" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful tools to help you share, track, and earn more.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: TrendingUp, title: "Real-Time Tracking", desc: "See clicks and conversions as they happen" },
            { icon: Shield, title: "Verified Reviews", desc: "Build trust with referrer-tagged reviews" },
            { icon: Wallet, title: "Fast Payouts", desc: "Weekly payouts via UPI or bank transfer" },
            { icon: Users, title: "Team Support", desc: "Create organizations and manage teams" },
          ].map((feature) => (
            <div key={feature.title} className="p-6 rounded-xl border hover:border-primary/20 hover:bg-primary/5 transition-all">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="gradient-hero rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Join thousands of affiliates who are already earning with RefShare.
          </p>
          <Button variant="glass" size="xl" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground" asChild>
            <Link to="/auth/register">
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
