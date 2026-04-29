import {
  IndianRupee, LineChart, HeartPulse, Cake, Receipt, Percent,
  Ruler, Clock, Droplet, Flame, KeyRound, QrCode,
} from "lucide-react";

const tools = [
  { icon: IndianRupee, name: "EMI Calculator", color: "finance" },
  { icon: LineChart, name: "SIP Calculator", color: "math" },
  { icon: HeartPulse, name: "BMI Calculator", color: "health" },
  { icon: Cake, name: "Age Calculator", color: "daily" },
  { icon: Receipt, name: "GST Calculator", color: "finance" },
  { icon: Percent, name: "Percentage Calculator", color: "utility" },
  { icon: Ruler, name: "Unit Converter", color: "math" },
  { icon: Clock, name: "Date Difference", color: "daily" },
  { icon: Droplet, name: "Water Intake", color: "health" },
  { icon: Flame, name: "Calorie Calculator", color: "health" },
  { icon: KeyRound, name: "Password Generator", color: "utility" },
  { icon: QrCode, name: "QR Code Generator", color: "utility" },
];

export const Popular = () => (
  <section id="popular" className="py-16 md:py-20 bg-secondary/40">
    <div className="container-tool">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl">Popular tools</h2>
        <p className="mt-2 text-muted-foreground">A handful of favorites used by thousands every day.</p>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map(({ icon: Icon, name, color }) => (
          <a
            key={name}
            href="#"
            className="group rounded-2xl bg-card border border-border p-5 shadow-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow transition-all"
          >
            <div
              className="grid h-10 w-10 place-items-center rounded-lg mb-3"
              style={{ backgroundColor: `hsl(var(--${color}) / 0.12)`, color: `hsl(var(--${color}))` }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-semibold text-sm group-hover:text-primary transition-colors">{name}</div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
