const PRICING = [
  { size: "Small", icon: "📦", dims: "30×30×45 cm", prices: [20, 50, 80, 120] },
  { size: "Medium", icon: "📦", dims: "40×40×60 cm", prices: [30, 70, 110, 160] },
  { size: "Large", icon: "📦", dims: "50×50×80 cm", prices: [50, 110, 170, 250] },
];

const DURATIONS = ["1 Hour", "3 Hours", "6 Hours", "12 Hours"];

const PricingTable = () => (
  <div className="w-full max-w-3xl mx-auto">
    <h3 className="text-lg font-display font-semibold text-foreground mb-4 text-center">Pricing</h3>
    <div className="card-elevated overflow-hidden p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary/60">
            <th className="text-left px-5 py-3 font-semibold text-foreground">Size</th>
            {DURATIONS.map((d) => (
              <th key={d} className="px-5 py-3 font-semibold text-foreground text-center">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PRICING.map((row, i) => (
            <tr key={row.size} className={i < PRICING.length - 1 ? "border-b border-border/40" : ""}>
              <td className="px-5 py-4 font-medium text-foreground">
                <span className="mr-2">{row.icon}</span>{row.size}
                <span className="block text-xs text-muted-foreground mt-0.5">{row.dims}</span>
              </td>
              {row.prices.map((p, j) => (
                <td key={j} className="px-5 py-4 text-center font-semibold text-foreground">₹{p}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PricingTable;
