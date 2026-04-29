import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const categories = {
  Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
  Weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495, ton: 1000 },
  Temperature: { C: 1, F: 1, K: 1 } as Record<string, number>,
} as const;

const tempConvert = (v: number, from: string, to: string) => {
  let c = v;
  if (from === "F") c = (v - 32) * (5 / 9);
  if (from === "K") c = v - 273.15;
  if (to === "C") return c;
  if (to === "F") return c * (9 / 5) + 32;
  return c + 273.15;
};

export const UnitConverter = () => {
  const [cat, setCat] = useState<keyof typeof categories>("Length");
  const units = Object.keys(categories[cat]);
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[1]);
  const [val, setVal] = useState(1);

  const result = useMemo(() => {
    if (cat === "Temperature") return tempConvert(Number(val) || 0, from, to);
    const f = (categories[cat] as Record<string, number>)[from];
    const t = (categories[cat] as Record<string, number>)[to];
    return ((Number(val) || 0) * f) / t;
  }, [cat, from, to, val]);

  const onCat = (c: keyof typeof categories) => {
    setCat(c);
    const u = Object.keys(categories[c]);
    setFrom(u[0]); setTo(u[1] || u[0]);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(categories) as (keyof typeof categories)[]).map((c) => (
          <button key={c} type="button" onClick={() => onCat(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>{c}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div><Label>Value</Label><Input type="number" value={val} onChange={(e) => setVal(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>From</Label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {units.map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
        <div><Label>To</Label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {units.map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="rounded-xl bg-secondary p-6 text-center">
        <div className="text-sm text-muted-foreground">Result</div>
        <div className="text-3xl sm:text-4xl font-extrabold text-primary mt-1">
          {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} <span className="text-lg">{to}</span>
        </div>
      </div>
    </div>
  );
};
