import { Check } from "lucide-react";
import StepWrapper from "../StepWrapper";

const LOCKERS = [
  { size: "Small" as const, dims: "30×30×45 cm", icon: "📦", desc: "Bags, purses, small items" },
  { size: "Medium" as const, dims: "40×40×60 cm", icon: "🎒", desc: "Backpacks, shopping bags" },
  { size: "Large" as const, dims: "50×50×80 cm", icon: "🧳", desc: "Luggage, large bags" },
];

interface SelectLockerProps {
  selected: string | null;
  onSelect: (size: "Small" | "Medium" | "Large") => void;
  onBack: () => void;
}

const SelectLocker = ({ selected, onSelect, onBack }: SelectLockerProps) => (
  <StepWrapper title="Select Locker Size" subtitle="Choose the best fit for your item" onBack={onBack} step={4} totalSteps={7}>
    <div className="space-y-3">
      {LOCKERS.map((l) => (
        <button
          key={l.size}
          onClick={() => onSelect(l.size)}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
            selected === l.size
              ? "border-primary bg-accent"
              : "border-border hover:border-primary/30 bg-secondary/50"
          }`}
        >
          <span className="text-3xl">{l.icon}</span>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{l.size}</p>
            <p className="text-xs text-muted-foreground">{l.dims} · {l.desc}</p>
          </div>
          {selected === l.size && (
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </button>
      ))}
    </div>
  </StepWrapper>
);

export default SelectLocker;
