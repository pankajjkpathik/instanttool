import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PercentageCalculator = () => {
  const [pct, setPct] = useState(15);
  const [num, setNum] = useState(200);
  const [a, setA] = useState(50);
  const [b, setB] = useState(200);
  const [old, setOld] = useState(100);
  const [now, setNow] = useState(125);

  const r1 = ((Number(pct) || 0) * (Number(num) || 0)) / 100;
  const r2 = b ? ((Number(a) || 0) / Number(b)) * 100 : 0;
  const r3 = old ? (((Number(now) || 0) - Number(old)) / Number(old)) * 100 : 0;

  const Card = ({ title, children, result }: any) => (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="text-sm font-semibold mb-3">{title}</div>
      <div className="grid gap-3">{children}</div>
      <div className="mt-4 rounded-lg bg-secondary p-3 text-center">
        <div className="text-2xl font-extrabold text-primary">{result}</div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Card title="What is X% of Y?" result={r1.toLocaleString(undefined, { maximumFractionDigits: 2 })}>
        <div><Label>Percent (%)</Label><Input type="number" value={pct} onChange={(e) => setPct(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>Of</Label><Input type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} className="mt-1.5" /></div>
      </Card>
      <Card title="X is what % of Y?" result={`${r2.toFixed(2)}%`}>
        <div><Label>X</Label><Input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>Y</Label><Input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="mt-1.5" /></div>
      </Card>
      <Card title="Increase / Decrease %" result={`${r3.toFixed(2)}%`}>
        <div><Label>From</Label><Input type="number" value={old} onChange={(e) => setOld(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>To</Label><Input type="number" value={now} onChange={(e) => setNow(Number(e.target.value))} className="mt-1.5" /></div>
      </Card>
    </div>
  );
};
