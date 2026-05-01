import { Wallet, TrendingUp, HeartPulse, CalendarDays, Calculator, Settings2, ArrowRight } from "lucide-react";

const groups = [
  {
    id: "cluster-finance",
    icon: Wallet, color: "finance",
    title: "Personal Finance",
    desc: "EMI, loans, taxes & GST — for every Indian borrower.",
    tools: [
      ["EMI Calculator", "emi-calculator"],
      ["Home Loan EMI Calculator", "home-loan-calculator"],
      ["Personal Loan EMI Calculator", "personal-loan-emi-calculator"],
      ["Car Loan EMI Calculator", "car-loan-calculator"],
      ["GST Calculator", "gst-calculator"],
      ["Income Tax Calculator", "income-tax-calculator"],
      ["FD Calculator", "fd-calculator"],
      ["RD Calculator", "rd-calculator"],
      ["PPF Calculator", "ppf-calculator"],
      ["SIP Calculator", "sip-calculator"],
    ],
  },
  {
    id: "cluster-investment",
    icon: TrendingUp, color: "math",
    title: "Investment & Savings",
    desc: "Long-term wealth building — SIP, mutual funds, retirement.",
    tools: [
      ["Lumpsum Calculator", "lumpsum-calculator"],
      ["Compound Interest Calculator", "compound-interest"],
      ["Retirement Calculator India", "retirement-calculator-india"],
      ["Inflation Calculator India", "inflation-calculator-india"],
      ["Savings Goal Calculator", "savings-goal-calculator"],
      ["Mutual Fund Return Calculator", "mutual-fund-return-calculator"],
      ["CAGR Calculator", "cagr-calculator"],
      ["SWP Calculator", "swp-calculator"],
      ["NPS Calculator", "nps-calculator"],
      ["Sukanya Samriddhi Calculator", "sukanya-samriddhi-calculator"],
    ],
  },
  {
    id: "cluster-health",
    icon: HeartPulse, color: "health",
    title: "Health & Fitness",
    desc: "Track BMI, calories, water, fitness & wellness goals.",
    tools: [
      ["BMI Calculator", "bmi-calculator"],
      ["BMI Calculator by Age", "bmi-calculator-by-age"],
      ["BMI Chart Tool", "body-mass-index-chart"],
      ["Ideal Weight Calculator", "ideal-weight"],
      ["Calorie Calculator", "calorie-calculator"],
      ["BMR Calculator", "bmr-calculator"],
      ["Body Fat Calculator", "body-fat-calculator"],
      ["Water Intake Calculator", "water-intake"],
      ["Pregnancy Due Date", "pregnancy-due-date"],
      ["Ovulation Calculator", "ovulation-calculator"],
    ],
  },
  {
    id: "cluster-daily",
    icon: CalendarDays, color: "daily",
    title: "Daily Utility Tools",
    desc: "Quick everyday calculators that save you minutes daily.",
    tools: [
      ["Age Calculator", "age-calculator"],
      ["Date Difference Calculator", "date-difference"],
      ["Time Duration Calculator", "time-duration-calculator"],
      ["Days Between Dates", "days-between-dates"],
      ["Working Days Calculator", "working-days"],
      ["Countdown Timer", "countdown-timer"],
      ["Random Number Generator", "random-number-generator"],
      ["Number to Words Converter", "number-to-words-converter"],
      ["Roman Numeral Converter", "roman-numeral-converter"],
      ["Password Generator", "password-generator"],
    ],
  },
  {
    id: "cluster-math",
    icon: Calculator, color: "utility",
    title: "Math Calculators",
    desc: "Evergreen math, conversions & school/college essentials.",
    tools: [
      ["Percentage Calculator", "percentage-calculator"],
      ["Average Calculator", "average-calculator"],
      ["Ratio Calculator", "ratio-calculator"],
      ["Fraction Calculator", "fraction-calculator"],
      ["Scientific Calculator", "scientific-calculator"],
      ["Simple Interest Calculator", "simple-interest-calculator"],
      ["Profit & Loss Calculator", "profit-loss-calculator"],
      ["Discount Calculator", "discount-calculator"],
      ["Speed Distance Time", "speed-distance-time-calculator"],
      ["Area Calculator", "area-calculator"],
    ],
  },
  {
    id: "cluster-utility",
    icon: Settings2, color: "finance",
    title: "Utility & Converters",
    desc: "All-in-one converters and developer/text utilities.",
    tools: [
      ["Unit Converter (All-in-One)", "unit-converter-all-in-one"],
      ["Length Converter", "length-converter"],
      ["Weight Converter", "weight-converter"],
      ["Temperature Converter", "temperature-converter"],
      ["Currency Converter", "currency-converter"],
      ["Data Storage Converter", "data-storage-converter"],
      ["Text Case Converter", "case-converter"],
      ["Remove Duplicate Text", "remove-duplicate-text"],
      ["Word Counter", "word-counter"],
      ["JSON Formatter", "json-formatter"],
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
          60+ Free Online Calculators & Tools for India
        </h2>
        <p className="mt-2 text-muted-foreground">
          Six powerful clusters — Personal Finance, Investment, Health, Daily,
          Math and Utility — built for Indian users in rupees, lakhs and Indian
          formats.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ id, icon: Icon, color, title, desc, tools }) => (
          <div
            key={title}
            id={id}
            className="rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-glow transition-all scroll-mt-24"
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

            <ul className="grid grid-cols-1 gap-y-2 text-sm">
              {tools.map(([label, slug]) => (
                <li key={slug}>
                  <a
                    href={`/tool/${slug}`}
                    title={`Free ${label} online`}
                    className="text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#categories"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              View all categories <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);
