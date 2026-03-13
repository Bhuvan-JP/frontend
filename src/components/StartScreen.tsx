import { Package, PackageOpen } from "lucide-react";
import PricingTable from "./PricingTable";

interface StartScreenProps {
  onStore: () => void;
  onPickup: () => void;
}

const StartScreen = ({ onStore, onPickup }: StartScreenProps) => (
  <div className="flex flex-col items-center gap-10 py-12 animate-fade-in">
    <div className="text-center">
      <h2 className="text-3xl font-display font-bold text-foreground mb-2">Welcome to Cloakbe</h2>
      <p className="text-muted-foreground">Secure smart lockers for your belongings</p>
    </div>

    <div className="flex gap-6">
      <button onClick={onStore} className="btn-locker bg-primary text-primary-foreground flex flex-col items-center gap-3 min-w-[200px]">
        <Package className="w-8 h-8" />
        Store Item
      </button>
      <button onClick={onPickup} className="btn-locker bg-primary text-primary-foreground border border-border hover:border-primary/40 flex flex-col items-center gap-3 min-w-[200px]">
        <PackageOpen className="w-8 h-8" />
        Pick Up Item
      </button>
    </div>

    <PricingTable />
  </div>
);

export default StartScreen;