import { IndianRupee, LineChart, Cake, Percent, HeartPulse, Receipt } from "lucide-react";

const quick = [
  { icon: IndianRupee, name: "EMI", color: "finance" },
  { icon: LineChart, name: "SIP", color: "math" },
  { icon: Cake, name: "Age", color: "daily" },
  { icon: Percent, name: "Percentage", color: "utility" },
  { icon: HeartPulse, name: "BMI", color: "health" },
  { icon: Receipt, name: "GST", color: "finance" },
];

export const QuickStrip = () => (
  <section aria-label="Popular tools quick access" className="border-b border-border bg-card">
    <div className="container-tool py-5">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Popular:
        </span>
        {quick.map(({ icon: Icon, name, color }) => (
          <a
            key={name}
            href="#popular"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary hover:shadow-soft transition-all"
          >
            <span
              className="grid h-6 w-6 place-items-center rounded-full"
              style={{ backgroundColor: `hsl(var(--${color}) / 0.15)`, color: `hsl(var(--${color}))` }}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            {name}
          </a>
        ))}
      </div>
    </div>
  </section>
);
