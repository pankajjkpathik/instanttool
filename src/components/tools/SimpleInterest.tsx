import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2, style: "currency", currency: "INR" }).format(isFinite(n) ? n : 0);

export const SimpleInterest = () => {
  const [P, setP] = useState(100000);
  const [R, setR] = useState(8);
  const [T, setT] = useState(5);
  const { interest, total } = useMemo(() => {
    const i = ((Number(P) || 0) * (Number(R) || 0) * (Number(T) || 0)) / 100;
    return { interest: i, total: (Number(P) || 0) + i };
  }, [P, R, T]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div><Label>Principal (₹)</Label><Input type="number" value={P} onChange={(e) => setP(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Rate (% p.a.)</Label><Input type="number" value={R} onChange={(e) => setR(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Time (Years)</Label><Input type="number" value={T} onChange={(e) => setT(Number(e.target.value))} className="mt-2" /></div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">Simple Interest</div>
        <div className="text-4xl font-extrabold text-primary mt-1">{inr(interest)}</div>
        <div className="mt-4 rounded-lg bg-card p-4 shadow-soft">
          <div className="text-xs text-muted-foreground">Total Amount</div>
          <div className="text-xl font-bold">{inr(total)}</div>
        </div>
      </div>
    </div>
  );
};
