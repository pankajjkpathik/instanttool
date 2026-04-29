import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-tools.jpg";

export const Hero = () => (
  <section id="home" className="gradient-hero">
    <div className="container-tool py-12 md:py-20 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary shadow-soft">
            <Sparkles className="h-3.5 w-3.5" /> 50+ free tools, no signup
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Free Online Tools &{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Calculators
            </span>{" "}
            for Daily Use
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Calculate EMI, SIP, BMI, GST & more instantly — fast, free, and
            accurate. Built for Indian users.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#popular"
              className="inline-flex items-center gap-2 rounded-xl gradient-cta px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-glow hover:opacity-95 transition"
            >
              Start Using Tools <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-xl bg-card border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition"
            >
              Explore Categories
            </a>
          </div>
          <div className="mt-8 flex gap-6 text-sm text-muted-foreground">
            <div><span className="font-bold text-foreground">2M+</span> calculations</div>
            <div><span className="font-bold text-foreground">50+</span> tools</div>
            <div><span className="font-bold text-foreground">4.9★</span> rated</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/10 blur-2xl" />
          <img
            src={heroImg}
            alt="InstantTool dashboard preview with calculator tools"
            width={1024}
            height={1024}
            className="relative rounded-2xl shadow-card w-full"
          />
        </div>
      </div>
    </div>
  </section>
);
