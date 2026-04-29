import { Gift } from "lucide-react";
import { useState } from "react";

export const EmailCapture = () => {
  const [email, setEmail] = useState("");
  return (
    <section className="py-16 md:py-20">
      <div className="container-tool">
        <div className="mx-auto max-w-3xl rounded-3xl gradient-primary p-8 sm:p-12 text-center shadow-glow">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-foreground/15 backdrop-blur mb-5">
            <Gift className="h-7 w-7 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl text-primary-foreground">
            Get a Free Personal Finance Planner
          </h2>
          <p className="mt-3 text-primary-foreground/85">
            A ready-to-use Excel sheet to track expenses, savings & investments. Delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="mt-7 mx-auto flex max-w-md flex-col sm:flex-row gap-3"
          >
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-xl bg-card px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-xl gradient-cta px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-soft hover:opacity-95"
            >
              Download Now
            </button>
          </form>
          <p className="mt-3 text-xs text-primary-foreground/70">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
};
