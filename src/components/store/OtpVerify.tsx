import { useState, useEffect, useRef } from "react";
import StepWrapper from "../StepWrapper";

interface OtpVerifyProps {
  phone: string;
  onVerify: () => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

const OtpVerify = ({ phone, onVerify, onBack, step = 2, totalSteps = 7 }: OtpVerifyProps) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isFilled = otp.every((d) => d !== "");

  return (
    <StepWrapper title="Verify OTP" subtitle={`Code sent to +91 ${phone}`} onBack={onBack} step={step} totalSteps={totalSteps}>
      <div className="space-y-6">
        <div className="flex justify-center gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold bg-secondary rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
            />
          ))}
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {countdown > 0 ? (
            <span>Resend in {countdown}s</span>
          ) : (
            <button onClick={() => setCountdown(30)} className="text-primary font-medium hover:underline">Resend OTP</button>
          )}
        </div>
        <button
          disabled={!isFilled}
          onClick={onVerify}
          className="w-full btn-locker bg-primary text-primary-foreground disabled:opacity-40 disabled:hover:shadow-none disabled:hover:translate-y-0"
        >
          Verify
        </button>
      </div>
    </StepWrapper>
  );
};

export default OtpVerify;
