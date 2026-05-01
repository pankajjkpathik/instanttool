import { Zap, Gift, Smartphone, ShieldCheck } from "lucide-react";
import sectionWhy from "@/assets/section-why.jpg";

const features = [
  { icon: Zap, title: "Instant Results", desc: "Lightning-fast calculations as you type." },
  { icon: Gift, title: "100% Free", desc: "All tools forever free. No hidden fees." },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Optimized for every screen size." },
  { icon: ShieldCheck, title: "Privacy First", desc: "All calculations stay in your browser." },
];

export const Trust = () => (
  <section className="py-16 md:py-20 bg-secondary/40">
    <div className="container-tool">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Why choose us</span>
          <h2 className="mt-2 text-3xl md:text-4xl">Built for speed, privacy & every Indian household</h2>
          <p className="mt-3 text-muted-foreground">
            From students to small business owners, thousands of Indians use InstantTool every day to make smarter decisions in seconds.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-card border border-border p-5 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/15 to-accent/10 blur-2xl" />
          <img
            src={sectionWhy}
            alt="Indian users — student, homemaker, business owner — happily using InstantTool calculators"
            width={1280}
            height={896}
            loading="lazy"
            className="relative rounded-2xl shadow-card w-full"
          />
        </div>
      </div>
    </div>
  </section>
);
