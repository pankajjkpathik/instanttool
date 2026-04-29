import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" }).format(isFinite(n) ? n : 0);

export const SipCalculator = () => {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { future, invested, gain } = useMemo(() => {
    const P = Number(monthly) || 0;
    const i = (Number(rate) || 0) / 12 / 100;
    const n = (Number(years) || 0) * 12;
    if (P <= 0 || n <= 0) return { future: 0, invested: 0, gain: 0 };
    const fv = i === 0 ? P * n : P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    return { future: fv, invested: P * n, gain: fv - P * n };
  }, [monthly, rate, years]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        {[
          { id: "monthly", label: "Monthly Investment", val: monthly, set: setMonthly, min: 500, max: 200000, step: 500, fmt: inr },
          { id: "rate", label: "Expected Return (% p.a.)", val: rate, set: setRate, min: 1, max: 30, step: 0.5, fmt: (n: number) => `${n}%` },
          { id: "years", label: "Time Period (Years)", val: years, set: setYears, min: 1, max: 40, step: 1, fmt: (n: number) => `${n} yrs` },
        ].map((f) => (
          <div key={f.id}>
            <div className="flex items-center justify-between">
              <Label htmlFor={f.id}>{f.label}</Label>
              <span className="text-sm font-semibold">{f.fmt(f.val)}</span>
            </div>
            <Input id={f.id} type="number" value={f.val} onChange={(e) => f.set(Number(e.target.value))} className="mt-2" />
            <input type="range" min={f.min} max={f.max} step={f.step} value={f.val}
              onChange={(e) => f.set(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">Future Value</div>
        <div className="text-4xl sm:text-5xl font-extrabold text-primary mt-1">{inr(future)}</div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-card p-4 shadow-soft">
            <div className="text-xs text-muted-foreground">Invested</div>
            <div className="text-lg font-bold mt-1">{inr(invested)}</div>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-soft">
            <div className="text-xs text-muted-foreground">Est. Returns</div>
            <div className="text-lg font-bold mt-1">{inr(gain)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
