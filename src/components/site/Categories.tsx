import { Link } from "react-router-dom";
import { Wallet, TrendingUp, HeartPulse, CalendarDays, Calculator, Settings2 } from "lucide-react";

const categories = [
  { icon: Wallet, title: "Personal Finance", desc: "EMI, GST, Tax & loan calculators", color: "finance", to: "/category/finance" },
  { icon: TrendingUp, title: "Investment & Savings", desc: "SIP, FD, PPF, NPS, CAGR & more", color: "math", to: "/category/investment" },
  { icon: HeartPulse, title: "Health & Fitness", desc: "BMI, BMR, calorie & water trackers", color: "health", to: "/category/health" },
  { icon: CalendarDays, title: "Daily Utilities", desc: "Age, date, timer & quick tools", color: "daily", to: "/category/daily" },
  { icon: Calculator, title: "Math Calculators", desc: "Percentage, ratio, scientific & more", color: "utility", to: "/category/math" },
  { icon: Settings2, title: "Utility & Converters", desc: "Unit, currency, text & web tools", color: "finance", to: "/category/utility" },
];

export const Categories = () => (
  <section id="categories" className="py-16 md:py-20">
    <div className="container-tool">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl md:text-4xl">Browse by category</h2>
        <p className="mt-2 text-muted-foreground">Six powerful clusters covering 60+ free tools for India.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ icon: Icon, title, desc, color, anchor }) => (
          <a
            key={title}
            href={anchor}
            className="group rounded-2xl bg-card border border-border p-6 shadow-card hover:-translate-y-1 hover:shadow-glow hover:border-primary/40 transition-all"
          >
            <div
              className="grid h-12 w-12 place-items-center rounded-xl mb-4 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `hsl(var(--${color}) / 0.12)`, color: `hsl(var(--${color}))` }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);
