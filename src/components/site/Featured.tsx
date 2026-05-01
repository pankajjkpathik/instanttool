import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import sectionTools from "@/assets/section-tools.jpg";

export const Featured = () => (
  <section className="py-16 md:py-20">
    <div className="container-tool">
      <div className="grid items-center gap-10 lg:grid-cols-2 rounded-3xl bg-card border border-border p-6 sm:p-10 shadow-card">
        {/* Tool preview image */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/15 to-accent/10 blur-2xl" />
          <img
            src={sectionTools}
            alt="EMI Calculator preview on a smartphone with rupee coins and breakdown chart"
            width={1280}
            height={896}
            loading="lazy"
            className="relative rounded-2xl shadow-card w-full"
          />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">Featured tool</span>
          <h2 className="mt-2 text-3xl md:text-4xl">EMI Calculator</h2>
          <p className="mt-3 text-muted-foreground">
            Plan your home, car or personal loan in seconds. Get exact monthly
            EMI, total interest, and a clear amortization breakdown — built for
            Indian rupees and tenure formats.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>✓ Instant results as you type</li>
            <li>✓ Year-wise interest & principal split</li>
            <li>✓ Compare multiple loan scenarios</li>
          </ul>
          <Link
            to="/tool/emi-calculator"
            className="mt-7 inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
          >
            Try EMI Calculator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
