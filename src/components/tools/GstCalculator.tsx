import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2, style: "currency", currency: "INR" }).format(isFinite(n) ? n : 0);

export const GstCalculator = () => {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const { base, gst, total } = useMemo(() => {
    const a = Number(amount) || 0;
    const r = Number(rate) || 0;
    if (mode === "add") {
      const g = (a * r) / 100;
      return { base: a, gst: g, total: a + g };
    }
    const b = a / (1 + r / 100);
    return { base: b, gst: a - b, total: a };
  }, [amount, rate, mode]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <Label>Calculation Type</Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(["add", "remove"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${mode === m ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>
                {m === "add" ? "Add GST" : "Remove GST"}
              </button>
            ))}
          </div>
        </div>
        <div><Label htmlFor="a">Amount (₹)</Label>
          <Input id="a" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-2" /></div>
        <div>
          <Label>GST Rate</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {[3, 5, 12, 18, 28].map((r) => (
              <button key={r} type="button" onClick={() => setRate(r)}
                className={`rounded-full border px-3 py-1.5 text-sm ${rate === r ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>{r}%</button>
            ))}
            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-24" />
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center space-y-3">
        <div className="rounded-lg bg-card p-4 shadow-soft"><div className="text-xs text-muted-foreground">Base Amount</div><div className="text-xl font-bold">{inr(base)}</div></div>
        <div className="rounded-lg bg-card p-4 shadow-soft"><div className="text-xs text-muted-foreground">GST ({rate}%)</div><div className="text-xl font-bold">{inr(gst)}</div></div>
        <div className="rounded-lg gradient-primary p-4 text-primary-foreground"><div className="text-xs opacity-80">Total</div><div className="text-2xl font-extrabold">{inr(total)}</div></div>
      </div>
    </div>
  );
};
