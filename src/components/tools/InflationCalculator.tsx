import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" }).format(isFinite(n) ? n : 0);

export const InflationCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const { future, lostValue } = useMemo(() => {
    const f = (Number(amount) || 0) * Math.pow(1 + (Number(rate) || 0) / 100, Number(years) || 0);
    const realValue = (Number(amount) || 0) / Math.pow(1 + (Number(rate) || 0) / 100, Number(years) || 0);
    return { future: f, lostValue: (Number(amount) || 0) - realValue };
  }, [amount, rate, years]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div><Label>Today's Amount (₹)</Label><Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Inflation Rate (% p.a.)</Label><Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Years</Label><Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-2" /></div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">Equivalent Future Cost</div>
        <div className="text-4xl font-extrabold text-primary mt-1">{inr(future)}</div>
        <div className="mt-4 rounded-lg bg-card p-4 shadow-soft">
          <div className="text-xs text-muted-foreground">Real value lost over {years} years</div>
          <div className="text-xl font-bold">{inr(lostValue)}</div>
        </div>
      </div>
    </div>
  );
};
