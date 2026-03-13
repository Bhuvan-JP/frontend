import logo from "@/assets/cloakbe-logo.png";

const Header = () => (
  <header className="w-full py-4 px-8 flex items-center gap-3 border-b border-border/50 bg-card/60 backdrop-blur-sm">
    <img src={logo} alt="Cloakbe" className="h-10 w-10" />
    <div>
      <h1 className="text-xl font-bold font-display text-foreground tracking-tight">Cloakbe</h1>
      <p className="text-xs text-muted-foreground">Smart Locker System</p>
    </div>
  </header>
);

export default Header;
