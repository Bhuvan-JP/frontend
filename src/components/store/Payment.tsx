import { useState, useEffect } from "react";
import { QrCode, CheckCircle2 } from "lucide-react";
import StepWrapper from "../StepWrapper";

interface PaymentProps {
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

const Payment = ({ amount, onSuccess, onBack, step = 6, totalSteps = 7 }: PaymentProps) => {
  const [timer, setTimer] = useState(120);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (timer > 0 && !paid) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer, paid]);

  const handlePay = () => {
    setPaid(true);
    setTimeout(onSuccess, 1500);
  };

  const mins = Math.floor(timer / 60);
  const secs = timer % 60;

  return (
    <StepWrapper title={paid ? "Payment Successful" : "Complete Payment"} subtitle={paid ? "Redirecting..." : `Pay ₹${amount} to continue`} onBack={!paid ? onBack : undefined} step={step} totalSteps={totalSteps}>
      {paid ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <CheckCircle2 className="w-16 h-16 text-success animate-scale-in" />
          <p className="text-lg font-semibold text-foreground">₹{amount} Paid</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-secondary rounded-2xl p-6 flex flex-col items-center gap-4">
            <div className="w-40 h-40 bg-card rounded-xl border border-border flex items-center justify-center">
              <QrCode className="w-28 h-28 text-foreground/80" />
            </div>
            <p className="text-sm text-muted-foreground">Scan QR code to pay</p>
          </div>

          <div className="flex items-center justify-between px-2">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-2xl font-bold text-foreground">₹{amount}</span>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Payment valid for <span className="font-semibold text-foreground">{mins}:{secs.toString().padStart(2, "0")}</span>
          </div>

          <button onClick={handlePay} className="w-full btn-locker bg-primary text-primary-foreground">
            Simulate Payment
          </button>
        </div>
      )}
    </StepWrapper>
  );
};

export default Payment;
