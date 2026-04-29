import { Wallet, HeartPulse, CalendarDays, Calculator, Settings2 } from "lucide-react";

const categories = [
  { icon: Wallet, title: "Finance Tools", desc: "EMI, SIP, GST, Tax & loan calculators", color: "finance" },
  { icon: HeartPulse, title: "Health Tools", desc: "BMI, BMR, calorie & water trackers", color: "health" },
  { icon: CalendarDays, title: "Daily Utilities", desc: "Age, date difference & timers", color: "daily" },
  { icon: Calculator, title: "Math Calculators", desc: "Percentage, ratio & unit converters", color: "math" },
  { icon: Settings2, title: "Utility Tools", desc: "Text, password & QR code tools", color: "utility" },
];

export const Categories = () => (
  <section id="categories" className="py-16 md:py-20">
    <div className="container-tool">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl md:text-4xl">Browse by category</h2>
        <p className="mt-2 text-muted-foreground">Pick a category to find the perfect tool in seconds.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map(({ icon: Icon, title, desc, color }) => (
          <a
            key={title}
            href="#popular"
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
