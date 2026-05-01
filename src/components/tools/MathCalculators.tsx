import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NumIn = ({ label, value, onChange }: { label: string; value: number | string; onChange: (n: number) => void }) => (
  <div>
    <Label>{label}</Label>
    <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1.5" />
  </div>
);

const Box = ({ title, value, sub }: { title: string; value: string; sub?: string }) => (
  <div className="rounded-xl bg-secondary p-6 text-center">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className="text-4xl font-extrabold text-primary mt-1">{value}</div>
    {sub && <div className="mt-2 text-sm">{sub}</div>}
  </div>
);

// Ratio Calculator a:b = c:?
export const RatioCalculator = () => {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(8);
  const d = a ? (b * c) / a : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <NumIn label="A" value={a} onChange={setA} />
          <NumIn label="B" value={b} onChange={setB} />
        </div>
        <NumIn label="C" value={c} onChange={setC} />
        <p className="text-xs text-muted-foreground">A : B = C : D</p>
      </div>
      <Box title="D" value={`${d.toLocaleString(undefined, { maximumFractionDigits: 4 })}`} sub={`${a} : ${b} = ${c} : ${d.toFixed(2)}`} />
    </div>
  );
};

// Average Calculator (comma list)
export const AverageCalculator = () => {
  const [text, setText] = useState("10, 20, 30, 40, 50");
  const result = useMemo(() => {
    const nums = text.split(/[,\s]+/).map(Number).filter((n) => !isNaN(n));
    if (!nums.length) return { mean: 0, sum: 0, n: 0, min: 0, max: 0 };
    const sum = nums.reduce((a, b) => a + b, 0);
    return { mean: sum / nums.length, sum, n: nums.length, min: Math.min(...nums), max: Math.max(...nums) };
  }, [text]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>Numbers (comma or space separated)</Label>
          <Input value={text} onChange={(e) => setText(e.target.value)} className="mt-1.5" /></div>
      </div>
      <div className="space-y-3">
        <Box title="Average" value={result.mean.toFixed(2)} />
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-muted-foreground text-xs">Sum</div><div className="font-bold">{result.sum}</div></div>
          <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-muted-foreground text-xs">Count</div><div className="font-bold">{result.n}</div></div>
          <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-muted-foreground text-xs">Min</div><div className="font-bold">{result.min}</div></div>
          <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-muted-foreground text-xs">Max</div><div className="font-bold">{result.max}</div></div>
        </div>
      </div>
    </div>
  );
};

// LCM & HCF
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const LcmHcf = () => {
  const [a, setA] = useState(12);
  const [b, setB] = useState(18);
  const h = gcd(a, b);
  const l = h ? Math.abs(a * b) / h : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <NumIn label="Number A" value={a} onChange={setA} />
        <NumIn label="Number B" value={b} onChange={setB} />
      </div>
      <div className="space-y-3">
        <Box title="HCF (GCD)" value={`${h}`} />
        <Box title="LCM" value={`${l}`} />
      </div>
    </div>
  );
};

// Square Root
export const SquareRoot = () => {
  const [n, setN] = useState(144);
  const r = Math.sqrt(Math.max(0, n));
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <NumIn label="Number" value={n} onChange={setN} />
      </div>
      <div className="space-y-3">
        <Box title="Square Root" value={r.toFixed(6)} sub={`√${n}`} />
        <Box title="Square" value={`${(n * n).toLocaleString()}`} sub={`${n}²`} />
      </div>
    </div>
  );
};
