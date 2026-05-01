import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(isFinite(n) ? n : 0);

export const ProfitLoss = () => {
  const [cp, setCp] = useState(1000);
  const [sp, setSp] = useState(1200);

  const { diff, pct, label } = useMemo(() => {
    const d = (Number(sp) || 0) - (Number(cp) || 0);
    const p = cp ? (d / Number(cp)) * 100 : 0;
    return { diff: Math.abs(d), pct: Math.abs(p), label: d >= 0 ? "Profit" : "Loss" };
  }, [cp, sp]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div><Label>Cost Price (₹)</Label><Input type="number" value={cp} onChange={(e) => setCp(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Selling Price (₹)</Label><Input type="number" value={sp} onChange={(e) => setSp(Number(e.target.value))} className="mt-2" /></div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center text-center">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-4xl font-extrabold text-primary mt-1">{inr(diff)}</div>
        <div className="mt-2 text-lg font-semibold">{pct.toFixed(2)}% {label}</div>
      </div>
    </div>
  );
};
