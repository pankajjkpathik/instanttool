import { Download, FileSpreadsheet, CheckCircle2 } from "lucide-react";

const features = [
  "Monthly Budget Planner with auto totals & savings %",
  "EMI Tracker for home, car & personal loans",
  "SIP & goal calculator with future value projections",
  "Income Tax estimator (New Regime FY 2025-26)",
  "Net Worth tracker — assets vs liabilities",
  "Year-at-a-glance summary across 12 months",
];

export const PlannerCTA = () => (
  <section id="planner" className="py-16 md:py-20">
    <div className="container-tool">
      <div className="rounded-3xl gradient-primary p-8 sm:p-12 text-primary-foreground shadow-glow grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Free download
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
            Personal Finance Planner for Indian Households
          </h2>
          <p className="mt-3 text-base opacity-90 max-w-xl">
            A ready-to-use Excel workbook with budgeting, EMI, SIP, tax, net
            worth and yearly summary — all formulas pre-built. Just fill the
            yellow cells.
          </p>
          <a
            href="/InstantTool-Personal-Finance-Planner.xlsx"
            download
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-card text-foreground px-6 py-3.5 text-sm font-semibold shadow-soft hover:opacity-95 transition"
          >
            <Download className="h-4 w-4" /> Download Free Planner (.xlsx)
          </a>
          <p className="mt-3 text-xs opacity-80">No signup required · 6 sheets · ~13 KB</p>
        </div>
        <ul className="grid gap-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 rounded-xl bg-primary-foreground/10 px-4 py-3 text-sm">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
