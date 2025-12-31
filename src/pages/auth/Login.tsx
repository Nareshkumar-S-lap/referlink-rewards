import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, ArrowRight, ArrowLeft, Shield } from "lucide-react";

export default function Login() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep("otp");
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
        <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">R</span>
        </div>
        <span className="font-heading font-bold text-2xl">RefShare</span>
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          {step === "phone" ? "Welcome back" : "Enter verification code"}
        </h1>
        <p className="text-muted-foreground">
          {step === "phone" 
            ? "Sign in with your phone number to continue" 
            : `We've sent a 6-digit code to ${phone}`
          }
        </p>
      </div>

      {step === "phone" ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full">
            Continue
            <ArrowRight className="h-5 w-5" />
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button type="button" className="text-primary font-medium hover:underline">
                Resend
              </button>
            </p>
          </div>

          <div className="space-y-3">
            <Button type="submit" variant="hero" size="xl" className="w-full">
              Verify & Continue
              <Shield className="h-5 w-5" />
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full"
              onClick={() => setStep("phone")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Change phone number
            </Button>
          </div>
        </form>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            New to RefShare?
          </span>
        </div>
      </div>

      <Button variant="outline" className="w-full" asChild>
        <Link to="/auth/register">Create an account</Link>
      </Button>
    </div>
  );
}
