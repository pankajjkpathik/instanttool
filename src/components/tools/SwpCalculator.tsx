import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" }).format(isFinite(n) ? n : 0);

export const SwpCalculator = () => {
  const [corpus, setCorpus] = useState(1000000);
  const [withdraw, setWithdraw] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const { remaining, totalWithdrawn } = useMemo(() => {
    let bal = Number(corpus) || 0;
    const w = Number(withdraw) || 0;
    const r = (Number(rate) || 0) / 12 / 100;
    const months = (Number(years) || 0) * 12;
    let withdrawn = 0;
    for (let i = 0; i < months && bal > 0; i++) {
      bal = bal * (1 + r) - w;
      withdrawn += w;
    }
    return { remaining: Math.max(0, bal), totalWithdrawn: withdrawn };
  }, [corpus, withdraw, rate, years]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div><Label>Corpus Invested (₹)</Label><Input type="number" value={corpus} onChange={(e) => setCorpus(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Monthly Withdrawal (₹)</Label><Input type="number" value={withdraw} onChange={(e) => setWithdraw(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Expected Return (% p.a.)</Label><Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Period (Years)</Label><Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-2" /></div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center space-y-3">
        <div className="rounded-lg bg-card p-4 shadow-soft"><div className="text-xs text-muted-foreground">Total Withdrawn</div><div className="text-xl font-bold">{inr(totalWithdrawn)}</div></div>
        <div className="rounded-lg gradient-primary p-4 text-primary-foreground"><div className="text-xs opacity-80">Balance Remaining</div><div className="text-2xl font-extrabold">{inr(remaining)}</div></div>
      </div>
    </div>
  );
};
