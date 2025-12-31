import { Outlet, Link } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">R</span>
          </div>
          <span className="font-heading font-bold text-2xl text-primary-foreground">RefShare</span>
        </Link>
        
        <div className="space-y-6">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground leading-tight">
            Share Products.<br />
            Earn Commissions.<br />
            Build Trust.
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Join thousands of affiliates who earn by sharing products they love. Track your links, see real conversions, and get paid.
          </p>
          
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-primary-foreground">₹2.5Cr+</p>
              <p className="text-primary-foreground/70 text-sm">Paid to affiliates</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-foreground">50K+</p>
              <p className="text-primary-foreground/70 text-sm">Active affiliates</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-foreground">500+</p>
              <p className="text-primary-foreground/70 text-sm">Products</p>
            </div>
          </div>
        </div>

        <p className="text-primary-foreground/60 text-sm">
          © 2024 RefShare. All rights reserved.
        </p>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
