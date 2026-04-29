import { Link } from "react-router-dom";
import { ArrowRight, IndianRupee } from "lucide-react";

export const Featured = () => (
  <section className="py-16 md:py-20">
    <div className="container-tool">
      <div className="grid items-center gap-10 lg:grid-cols-2 rounded-3xl bg-card border border-border p-6 sm:p-10 shadow-card">
        {/* Tool preview */}
        <div className="rounded-2xl gradient-hero p-6 sm:p-8">
          <div className="rounded-xl bg-card shadow-soft p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <IndianRupee className="h-4 w-4" /> EMI Calculator
            </div>
            {[
              { label: "Loan Amount", val: "₹ 10,00,000" },
              { label: "Interest Rate", val: "8.5 %" },
              { label: "Tenure", val: "20 years" },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{f.label}</span><span className="font-semibold text-foreground">{f.val}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-3/4 gradient-primary rounded-full" />
                </div>
              </div>
            ))}
            <div className="rounded-xl gradient-primary p-4 text-primary-foreground">
              <div className="text-xs opacity-80">Monthly EMI</div>
              <div className="text-2xl font-extrabold">₹ 8,678</div>
            </div>
          </div>
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
