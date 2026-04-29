import { TrendingUp, IndianRupee, LineChart, Cake, Percent, ArrowRight } from "lucide-react";

const trending = [
  { icon: IndianRupee, name: "EMI Calculator", color: "finance" },
  { icon: LineChart, name: "SIP Calculator", color: "math" },
  { icon: Cake, name: "Age Calculator", color: "daily" },
  { icon: Percent, name: "Percentage Calculator", color: "utility" },
];

export const Trending = () => (
  <section className="py-16 md:py-20 bg-secondary/40">
    <div className="container-tool">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            <TrendingUp className="h-4 w-4" /> Trending now
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl">Most used this week</h2>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-4 md:overflow-visible">
        {trending.map(({ icon: Icon, name, color }) => (
          <div
            key={name}
            className="min-w-[240px] md:min-w-0 rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-glow transition"
          >
            <div
              className="grid h-11 w-11 place-items-center rounded-xl mb-4"
              style={{ backgroundColor: `hsl(var(--${color}) / 0.12)`, color: `hsl(var(--${color}))` }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-base">{name}</h3>
            <a
              href="#"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              Use Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);
