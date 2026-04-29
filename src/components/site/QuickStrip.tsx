import { IndianRupee, LineChart, Cake, Percent, HeartPulse, Receipt, Ruler, Flame, Droplet, KeyRound } from "lucide-react";

const quick = [
  { icon: IndianRupee, name: "EMI Calculator", color: "finance" },
  { icon: LineChart, name: "SIP Calculator", color: "math" },
  { icon: Receipt, name: "GST Calculator", color: "finance" },
  { icon: Cake, name: "Age Calculator", color: "daily" },
  { icon: Percent, name: "Percentage", color: "utility" },
  { icon: HeartPulse, name: "BMI Calculator", color: "health" },
  { icon: Flame, name: "Calorie", color: "health" },
  { icon: Droplet, name: "Water Intake", color: "health" },
  { icon: Ruler, name: "Unit Converter", color: "math" },
  { icon: KeyRound, name: "Password Gen", color: "utility" },
];

export const QuickStrip = () => (
  <section
    id="quick-tools"
    aria-label="Quick access to popular free online calculators"
    className="border-b border-border bg-card"
  >
    <div className="container-tool py-6">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          ⚡ Quick Tools
        </h2>
        <span className="hidden sm:inline text-xs text-muted-foreground">
          Most-used free calculators in India
        </span>
      </div>
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
        {quick.map(({ icon: Icon, name, color }) => (
          <a
            key={name}
            href="#popular"
            aria-label={`Open ${name}`}
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
