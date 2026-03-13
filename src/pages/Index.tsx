import { useState } from "react";
import Header from "@/components/Header";
import StartScreen from "@/components/StartScreen";
import PhoneInput from "@/components/store/PhoneInput";
import OtpVerify from "@/components/store/OtpVerify";
import CreatePassword from "@/components/store/CreatePassword";
import SelectLocker from "@/components/store/SelectLocker";
import SelectTime from "@/components/store/SelectTime";
import Payment from "@/components/store/Payment";
import LockerAllocated from "@/components/store/LockerAllocated";
import PickupAuth from "@/components/pickup/PickupAuth";
import PickupDetails from "@/components/pickup/PickupDetails";
import UnlockLocker from "@/components/pickup/UnlockLocker";

const PRICES: Record<string, number[]> = {
  Small: [20, 50, 80, 120],
  Medium: [30, 70, 110, 160],
  Large: [50, 110, 170, 250],
};
const DURATION_INDEX: Record<number, number> = { 1: 0, 3: 1, 6: 2, 12: 3 };

type Screen =
  | "home"
  | "store-phone"
  | "store-otp"
  | "store-password"
  | "store-locker"
  | "store-time"
  | "store-payment"
  | "store-allocated"
  | "pickup-auth"
  | "pickup-otp"
  | "pickup-details"
  | "pickup-payment"
  | "pickup-unlock";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [phone, setPhone] = useState("");
  const [lockerSize, setLockerSize] = useState<"Small" | "Medium" | "Large" | null>(null);
  const [hours, setHours] = useState<number | null>(null);

  const getPrice = () => {
    if (!lockerSize || !hours) return 0;
    return PRICES[lockerSize][DURATION_INDEX[hours]];
  };

  const lockerId = "B-4";

  const reset = () => {
    setScreen("home");
    setPhone("");
    setLockerSize(null);
    setHours(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-start justify-center px-4 overflow-y-auto">
        <div className="w-full max-w-2xl" key={screen}>
          {screen === "home" && (
            <StartScreen onStore={() => setScreen("store-phone")} onPickup={() => setScreen("pickup-auth")} />
          )}

          {/* STORE FLOW */}
          {screen === "store-phone" && (
            <PhoneInput onSubmit={(p) => { setPhone(p); setScreen("store-otp"); }} onBack={reset} />
          )}
          {screen === "store-otp" && (
            <OtpVerify phone={phone} onVerify={() => setScreen("store-password")} onBack={() => setScreen("store-phone")} />
          )}
          {screen === "store-password" && (
            <CreatePassword onSubmit={() => setScreen("store-locker")} onBack={() => setScreen("store-otp")} />
          )}
          {screen === "store-locker" && (
            <SelectLocker selected={lockerSize} onSelect={(s) => { setLockerSize(s); setScreen("store-time"); }} onBack={() => setScreen("store-password")} />
          )}
          {screen === "store-time" && (
            <SelectTime lockerSize={lockerSize!} selectedHours={hours} onSelect={setHours} onBack={() => setScreen("store-locker")} onContinue={() => setScreen("store-payment")} />
          )}
          {screen === "store-payment" && (
            <Payment amount={getPrice()} onSuccess={() => setScreen("store-allocated")} onBack={() => setScreen("store-time")} />
          )}
          {screen === "store-allocated" && (
            <LockerAllocated lockerId={lockerId} onDone={reset} />
          )}

          {/* PICKUP FLOW */}
          {screen === "pickup-auth" && (
            <PickupAuth
              onOtpLogin={(p) => { setPhone(p); setScreen("pickup-otp"); }}
              onPasswordLogin={() => setScreen("pickup-details")}
              onBack={reset}
            />
          )}
          {screen === "pickup-otp" && (
            <OtpVerify phone={phone} onVerify={() => setScreen("pickup-details")} onBack={() => setScreen("pickup-auth")} step={1} totalSteps={4} />
          )}
          {screen === "pickup-details" && (
            <PickupDetails
              lockerId={lockerId}
              remainingTime="1h 23m"
              location="Block B, Floor 1"
              hasExtraCharge={false}
              extraAmount={0}
              onProceed={() => setScreen("pickup-unlock")}
              onBack={() => setScreen("pickup-auth")}
            />
          )}
          {screen === "pickup-payment" && (
            <Payment amount={30} onSuccess={() => setScreen("pickup-unlock")} onBack={() => setScreen("pickup-details")} step={3} totalSteps={4} />
          )}
          {screen === "pickup-unlock" && (
            <UnlockLocker lockerId={lockerId} onDone={reset} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
