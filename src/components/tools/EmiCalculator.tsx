import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" }).format(
    isFinite(n) ? n : 0,
  );

export const EmiCalculator = () => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const P = Number(amount) || 0;
    const R = (Number(rate) || 0) / 12 / 100;
    const N = (Number(years) || 0) * 12;
    if (P <= 0 || N <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };
    const emi = R === 0 ? P / N : (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    return { emi, totalInterest: totalPayment - P, totalPayment };
  }, [amount, rate, years]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="amount">Loan Amount</Label>
            <span className="text-sm font-semibold">{formatINR(amount)}</span>
          </div>
          <Input id="amount" type="number" min={10000} value={amount}
            onChange={(e) => setAmount(Number(e.target.value))} className="mt-2" />
          <input type="range" min={10000} max={10000000} step={10000} value={amount}
            onChange={(e) => setAmount(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="rate">Interest Rate (% per year)</Label>
            <span className="text-sm font-semibold">{rate}%</span>
          </div>
          <Input id="rate" type="number" step="0.1" min={0.1} value={rate}
            onChange={(e) => setRate(Number(e.target.value))} className="mt-2" />
          <input type="range" min={1} max={30} step={0.1} value={rate}
            onChange={(e) => setRate(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="years">Loan Tenure (Years)</Label>
            <span className="text-sm font-semibold">{years} yrs</span>
          </div>
          <Input id="years" type="number" min={1} max={40} value={years}
            onChange={(e) => setYears(Number(e.target.value))} className="mt-2" />
          <input type="range" min={1} max={30} step={1} value={years}
            onChange={(e) => setYears(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
        </div>
      </div>

      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">Monthly EMI</div>
        <div className="text-4xl sm:text-5xl font-extrabold text-primary mt-1">{formatINR(emi)}</div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-card p-4 shadow-soft">
            <div className="text-xs text-muted-foreground">Total Interest</div>
            <div className="text-lg font-bold mt-1">{formatINR(totalInterest)}</div>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-soft">
            <div className="text-xs text-muted-foreground">Total Payment</div>
            <div className="text-lg font-bold mt-1">{formatINR(totalPayment)}</div>
          </div>
        </div>

        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-card">
          <div className="h-full gradient-primary"
            style={{ width: `${totalPayment ? (amount / totalPayment) * 100 : 0}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Principal</span><span>Interest</span>
        </div>
      </div>
    </div>
  );
};
