import { useState } from "react";
import { LockOpen, Lock } from "lucide-react";
import StepWrapper from "../StepWrapper";

interface LockerAllocatedProps {
  lockerId: string;
  onDone: () => void;
}

const LockerAllocated = ({ lockerId, onDone }: LockerAllocatedProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <StepWrapper title="Your Locker is Ready!" step={7} totalSteps={7}>
      <div className="flex flex-col items-center gap-6 py-4">
        <div className="relative">
          <div className={`w-32 h-40 rounded-2xl border-4 border-foreground/20 bg-secondary flex items-center justify-center overflow-hidden ${opened ? "" : ""}`}>
            {/* Locker body */}
            <span className="text-3xl font-display font-bold text-foreground">{lockerId}</span>
          </div>
          {/* Door */}
          <div
            className={`absolute inset-0 w-32 h-40 rounded-2xl border-4 border-primary bg-primary/10 flex items-center justify-center ${
              opened ? "animate-door-open" : ""
            }`}
          >
            {opened ? (
              <LockOpen className="w-10 h-10 text-primary" />
            ) : (
              <Lock className="w-10 h-10 text-primary" />
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">Locker {lockerId}</p>
          <p className="text-sm text-muted-foreground">{opened ? "Locker is open — place your item" : "Click to open your locker"}</p>
        </div>

        {!opened ? (
          <button onClick={() => setOpened(true)} className="btn-locker bg-primary text-primary-foreground animate-pulse-glow">
            Open Locker
          </button>
        ) : (
          <button onClick={onDone} className="btn-locker bg-primary text-primary-foreground">
            Done — Return Home
          </button>
        )}
      </div>
    </StepWrapper>
  );
};

export default LockerAllocated;
