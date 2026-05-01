import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" }).format(isFinite(n) ? n : 0);

export const RdCalculator = () => {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [months, setMonths] = useState(60);

  const { maturity, invested, interest } = useMemo(() => {
    const P = Number(monthly) || 0;
    const r = (Number(rate) || 0) / 400; // quarterly compounding rate
    const n = Number(months) || 0;
    let M = 0;
    for (let i = 1; i <= n; i++) {
      const q = (n - i + 1) / 3; // quarters remaining
      M += P * Math.pow(1 + r, q);
    }
    return { maturity: M, invested: P * n, interest: M - P * n };
  }, [monthly, rate, months]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div><Label>Monthly Deposit (₹)</Label><Input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Interest Rate (% p.a.)</Label><Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Tenure (Months)</Label><Input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="mt-2" /></div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">Maturity Amount</div>
        <div className="text-4xl font-extrabold text-primary mt-1">{inr(maturity)}</div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-card p-4 shadow-soft"><div className="text-xs text-muted-foreground">Invested</div><div className="text-lg font-bold">{inr(invested)}</div></div>
          <div className="rounded-lg bg-card p-4 shadow-soft"><div className="text-xs text-muted-foreground">Interest</div><div className="text-lg font-bold">{inr(interest)}</div></div>
        </div>
      </div>
    </div>
  );
};
