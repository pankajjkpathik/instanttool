import {
  Wallet, HeartPulse, CalendarDays, Calculator, Settings2, ArrowRight,
} from "lucide-react";

const groups = [
  {
    icon: Wallet,
    color: "finance",
    title: "Finance Calculators",
    desc: "Plan loans, taxes & investments for Indian users.",
    tools: [
      "EMI Calculator", "SIP Calculator", "GST Calculator", "Income Tax Calculator",
      "FD Calculator", "PPF Calculator", "Home Loan Calculator", "Car Loan Calculator",
      "Lumpsum Calculator", "Compound Interest",
    ],
  },
  {
    icon: HeartPulse,
    color: "health",
    title: "Health & Fitness Tools",
    desc: "Track BMI, calories and daily wellness goals.",
    tools: [
      "BMI Calculator", "BMR Calculator", "Calorie Calculator", "Water Intake",
      "Body Fat Calculator", "Ideal Weight", "Pregnancy Due Date", "Ovulation Calculator",
      "Heart Rate Zone", "Macro Calculator",
    ],
  },
  {
    icon: CalendarDays,
    color: "daily",
    title: "Daily Utility Tools",
    desc: "Quick everyday calculators that save time.",
    tools: [
      "Age Calculator", "Date Difference", "Working Days", "Countdown Timer",
      "Stopwatch", "World Clock", "Time Zone Converter", "Birthday Reminder",
      "Leap Year Check", "Week Number",
    ],
  },
  {
    icon: Calculator,
    color: "math",
    title: "Math & Conversion Tools",
    desc: "Solve everyday math, ratios and conversions instantly.",
    tools: [
      "Percentage Calculator", "Ratio Calculator", "Average Calculator", "LCM & HCF",
      "Square Root", "Discount Calculator", "Length Converter", "Weight Converter",
      "Temperature Converter", "Currency Converter",
    ],
  },
  {
    icon: Settings2,
    color: "utility",
    title: "Text & Web Utilities",
    desc: "Smart text, password and web tools for productivity.",
    tools: [
      "Password Generator", "QR Code Generator", "Word Counter", "Character Counter",
      "Case Converter", "Lorem Ipsum", "URL Encoder", "Base64 Encoder",
      "JSON Formatter", "Color Picker",
    ],
  },
];

export const ExploreTools = () => (
  <section id="explore" className="py-16 md:py-20 bg-secondary/40">
    <div className="container-tool">
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Explore all tools
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl">
          50+ Free Online Calculators & Tools for India
        </h2>
        <p className="mt-2 text-muted-foreground">
          Browse the complete InstantTool library — finance, health, daily
          utility, math and text tools — built for Indian users in rupees,
          lakhs and Indian formats.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ icon: Icon, color, title, desc, tools }) => (
          <div
            key={title}
            className="rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-glow transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl"
                style={{ backgroundColor: `hsl(var(--${color}) / 0.12)`, color: `hsl(var(--${color}))` }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg leading-tight">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {tools.map((t) => {
                const slug = t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                return (
                  <li key={t}>
                    <a
                      href={`/tool/${slug}`}
                      title={`Free ${t} online`}
                      className="text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
                    >
                      {t}
                    </a>
                  </li>
                );
              })}
            </ul>

            <a
              href="#categories"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              View all {title.split(" ")[0].toLowerCase()} tools <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);
