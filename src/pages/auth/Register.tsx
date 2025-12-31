import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, ArrowRight, ArrowLeft, Shield, User, Building2 } from "lucide-react";

type UserType = "individual" | "organization";

export default function Register() {
  const [step, setStep] = useState<"type" | "details" | "phone" | "otp">("type");
  const [userType, setUserType] = useState<UserType>("individual");
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "details" && name) {
      setStep("phone");
    } else if (step === "phone" && phone.length >= 10) {
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

      {step === "type" && (
        <>
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              Join RefShare
            </h1>
            <p className="text-muted-foreground">
              Choose how you want to earn with RefShare
            </p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => {
                setUserType("individual");
                setStep("details");
              }}
              className="p-6 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg">Individual</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Share products personally and earn commissions directly to your account
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setUserType("organization");
                setStep("details");
              }}
              className="p-6 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg">Organization</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Create a team, invite members, and manage earnings collectively
                  </p>
                </div>
              </div>
            </button>
          </div>
        </>
      )}

      {step === "details" && (
        <form onSubmit={handleContinue} className="space-y-4">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              {userType === "individual" ? "Your details" : "Organization details"}
            </h1>
            <p className="text-muted-foreground">
              Tell us a bit about {userType === "individual" ? "yourself" : "your organization"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Name</label>
              <Input
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {userType === "organization" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization Name</label>
                <Input
                  placeholder="Acme Inc."
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button type="submit" variant="hero" size="xl" className="w-full">
              Continue
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full"
              onClick={() => setStep("type")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go back
            </Button>
          </div>
        </form>
      )}

      {step === "phone" && (
        <form onSubmit={handleContinue} className="space-y-4">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              Verify your phone
            </h1>
            <p className="text-muted-foreground">
              We'll send you a verification code
            </p>
          </div>

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

          <div className="space-y-3">
            <Button type="submit" variant="hero" size="xl" className="w-full">
              Send OTP
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full"
              onClick={() => setStep("details")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go back
            </Button>
          </div>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              Enter verification code
            </h1>
            <p className="text-muted-foreground">
              We've sent a 6-digit code to {phone}
            </p>
          </div>

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
              Create Account
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

      {step === "type" && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" asChild>
            <Link to="/auth/login">Sign in</Link>
          </Button>
        </>
      )}
    </div>
  );
}
