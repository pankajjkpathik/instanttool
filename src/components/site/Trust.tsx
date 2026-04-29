import { Zap, Gift, Smartphone, ShieldCheck } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant Results", desc: "Lightning-fast calculations as you type." },
  { icon: Gift, title: "100% Free", desc: "All tools forever free. No hidden fees." },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Optimized for every screen size." },
  { icon: ShieldCheck, title: "No Signup Required", desc: "Use any tool without an account." },
];

export const Trust = () => (
  <section className="py-16 md:py-20 bg-secondary/40">
    <div className="container-tool">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl">Why use InstantTool?</h2>
        <p className="mt-2 text-muted-foreground">Built for speed, privacy, and everyday usefulness.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl bg-card border border-border p-6 text-center shadow-card">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground mb-4">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-base">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
