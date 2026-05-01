import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(isFinite(n) ? n : 0);

const Result = ({ rows }: { rows: { label: string; value: string; primary?: boolean }[] }) => (
  <div className="rounded-xl bg-secondary p-6 space-y-3">
    {rows.map((r) => (
      <div key={r.label} className={r.primary ? "" : "rounded-lg bg-card p-3 shadow-soft"}>
        <div className="text-xs text-muted-foreground">{r.label}</div>
        <div className={r.primary ? "text-3xl font-extrabold text-primary" : "text-lg font-bold"}>{r.value}</div>
      </div>
    ))}
  </div>
);

const NumIn = ({ label, value, onChange, suffix }: { label: string; value: number; onChange: (n: number) => void; suffix?: string }) => (
  <div>
    <div className="flex items-baseline justify-between"><Label>{label}</Label>{suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}</div>
    <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1.5" />
  </div>
);

// ============ Income Tax (India FY24-25 New Regime) ============
export const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState(1200000);
  const tax = useMemo(() => {
    const i = Math.max(0, Number(income) || 0);
    // New regime FY 2024-25 slabs
    const slabs = [
      [300000, 0], [700000, 0.05], [1000000, 0.10],
      [1200000, 0.15], [1500000, 0.20], [Infinity, 0.30],
    ] as const;
    let prev = 0, t = 0;
    for (const [cap, rate] of slabs) {
      if (i <= prev) break;
      const taxable = Math.min(i, cap) - prev;
      t += taxable * rate;
      prev = cap;
    }
    // Section 87A rebate up to 7L taxable
    if (i <= 700000) t = 0;
    const cess = t * 0.04;
    return { tax: t, cess, total: t + cess };
  }, [income]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <NumIn label="Annual Income (₹)" value={income} onChange={setIncome} suffix="New Regime FY 24-25" />
      </div>
      <Result rows={[
        { label: "Income Tax", value: inr(tax.tax), primary: true },
        { label: "Health & Education Cess (4%)", value: inr(tax.cess) },
        { label: "Total Tax Payable", value: inr(tax.total) },
      ]} />
    </div>
  );
};

// ============ FD Calculator ============
export const FdCalculator = () => {
  const [P, setP] = useState(100000);
  const [R, setR] = useState(7);
  const [Y, setY] = useState(5);
  const [n, setN] = useState(4); // quarterly
  const { maturity, interest } = useMemo(() => {
    const m = (Number(P) || 0) * Math.pow(1 + (Number(R) || 0) / 100 / n, n * (Number(Y) || 0));
    return { maturity: m, interest: m - Number(P) };
  }, [P, R, Y, n]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <NumIn label="Principal (₹)" value={P} onChange={setP} />
        <NumIn label="Interest Rate (% p.a.)" value={R} onChange={setR} />
        <NumIn label="Tenure (Years)" value={Y} onChange={setY} />
        <div>
          <Label>Compounding</Label>
          <select value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
            <option value={1}>Yearly</option><option value={2}>Half-yearly</option>
            <option value={4}>Quarterly</option><option value={12}>Monthly</option>
          </select>
        </div>
      </div>
      <Result rows={[
        { label: "Maturity Amount", value: inr(maturity), primary: true },
        { label: "Interest Earned", value: inr(interest) },
        { label: "Principal", value: inr(P) },
      ]} />
    </div>
  );
};

// ============ PPF Calculator (15-year) ============
export const PpfCalculator = () => {
  const [yearly, setYearly] = useState(150000);
  const [R, setR] = useState(7.1);
  const [Y, setY] = useState(15);
  const { maturity, invested, interest } = useMemo(() => {
    let bal = 0;
    const r = (Number(R) || 0) / 100;
    for (let i = 0; i < (Number(Y) || 0); i++) {
      bal = (bal + Number(yearly)) * (1 + r);
    }
    const inv = (Number(yearly) || 0) * (Number(Y) || 0);
    return { maturity: bal, invested: inv, interest: bal - inv };
  }, [yearly, R, Y]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <NumIn label="Yearly Investment (₹)" value={yearly} onChange={setYearly} suffix="Max ₹1.5L" />
        <NumIn label="Interest Rate (% p.a.)" value={R} onChange={setR} />
        <NumIn label="Tenure (Years)" value={Y} onChange={setY} suffix="Min 15" />
      </div>
      <Result rows={[
        { label: "Maturity Amount", value: inr(maturity), primary: true },
        { label: "Total Invested", value: inr(invested) },
        { label: "Interest Earned", value: inr(interest) },
      ]} />
    </div>
  );
};

// ============ Lumpsum Investment ============
export const LumpsumCalculator = () => {
  const [P, setP] = useState(500000);
  const [R, setR] = useState(12);
  const [Y, setY] = useState(10);
  const { maturity, gain } = useMemo(() => {
    const m = (Number(P) || 0) * Math.pow(1 + (Number(R) || 0) / 100, Number(Y) || 0);
    return { maturity: m, gain: m - Number(P) };
  }, [P, R, Y]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <NumIn label="Lumpsum Amount (₹)" value={P} onChange={setP} />
        <NumIn label="Expected Return (% p.a.)" value={R} onChange={setR} />
        <NumIn label="Investment Period (Years)" value={Y} onChange={setY} />
      </div>
      <Result rows={[
        { label: "Future Value", value: inr(maturity), primary: true },
        { label: "Estimated Returns", value: inr(gain) },
        { label: "Invested Amount", value: inr(P) },
      ]} />
    </div>
  );
};

// ============ Compound Interest ============
export const CompoundInterestCalculator = () => {
  const [P, setP] = useState(100000);
  const [R, setR] = useState(8);
  const [Y, setY] = useState(5);
  const [n, setN] = useState(1);
  const { amount, interest } = useMemo(() => {
    const a = (Number(P) || 0) * Math.pow(1 + (Number(R) || 0) / 100 / n, n * (Number(Y) || 0));
    return { amount: a, interest: a - Number(P) };
  }, [P, R, Y, n]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <NumIn label="Principal (₹)" value={P} onChange={setP} />
        <NumIn label="Rate (% p.a.)" value={R} onChange={setR} />
        <NumIn label="Time (Years)" value={Y} onChange={setY} />
        <div>
          <Label>Compounding</Label>
          <select value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
            <option value={1}>Yearly</option><option value={2}>Half-yearly</option>
            <option value={4}>Quarterly</option><option value={12}>Monthly</option>
          </select>
        </div>
      </div>
      <Result rows={[
        { label: "Total Amount", value: inr(amount), primary: true },
        { label: "Compound Interest", value: inr(interest) },
        { label: "Principal", value: inr(P) },
      ]} />
    </div>
  );
};

// ============ Discount Calculator ============
export const DiscountCalculator = () => {
  const [price, setPrice] = useState(2999);
  const [pct, setPct] = useState(25);
  const saved = ((Number(price) || 0) * (Number(pct) || 0)) / 100;
  const final = (Number(price) || 0) - saved;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <NumIn label="Original Price (₹)" value={price} onChange={setPrice} />
        <NumIn label="Discount (%)" value={pct} onChange={setPct} />
      </div>
      <Result rows={[
        { label: "Final Price", value: inr(final), primary: true },
        { label: "You Save", value: inr(saved) },
      ]} />
    </div>
  );
};

// ============ Currency Converter (reference rates) ============
const RATES: Record<string, number> = {
  INR: 1, USD: 83, EUR: 90, GBP: 105, AED: 22.6, SGD: 62, AUD: 55, CAD: 61, JPY: 0.55,
};
export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const result = ((Number(amount) || 0) * RATES[from]) / RATES[to];
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <NumIn label="Amount" value={amount} onChange={setAmount} />
        <div className="grid grid-cols-2 gap-3">
          <div><Label>From</Label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
              {Object.keys(RATES).map((k) => <option key={k}>{k}</option>)}
            </select></div>
          <div><Label>To</Label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
              {Object.keys(RATES).map((k) => <option key={k}>{k}</option>)}
            </select></div>
        </div>
        <p className="text-xs text-muted-foreground">Reference rates only. Use your bank for transactional rates.</p>
      </div>
      <Result rows={[
        { label: `${amount} ${from} =`, value: `${result.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`, primary: true },
        { label: "1 " + from, value: `${(RATES[from] / RATES[to]).toFixed(4)} ${to}` },
      ]} />
    </div>
  );
};
