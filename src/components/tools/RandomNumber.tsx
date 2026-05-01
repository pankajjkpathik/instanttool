import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RandomNumber = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([42]);

  const generate = () => {
    const lo = Math.min(Number(min), Number(max));
    const hi = Math.max(Number(min), Number(max));
    const out: number[] = [];
    for (let i = 0; i < (Number(count) || 1); i++)
      out.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
    setResults(out);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div><Label>Min</Label><Input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>Max</Label><Input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>How many</Label><Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="mt-1.5" /></div>
      </div>
      <button onClick={generate} className="rounded-lg gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Generate</button>
      <div className="rounded-xl bg-secondary p-6">
        <div className="text-xs text-muted-foreground">Random Numbers</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {results.map((r, i) => (
            <span key={i} className="rounded-lg bg-card px-3 py-1.5 text-lg font-bold text-primary shadow-soft">{r}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
