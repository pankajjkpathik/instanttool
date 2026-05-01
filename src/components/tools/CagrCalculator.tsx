import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CagrCalculator = () => {
  const [start, setStart] = useState(100000);
  const [end, setEnd] = useState(200000);
  const [years, setYears] = useState(5);

  const cagr = useMemo(() => {
    const s = Number(start), e = Number(end), y = Number(years);
    if (s <= 0 || y <= 0) return 0;
    return (Math.pow(e / s, 1 / y) - 1) * 100;
  }, [start, end, years]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div><Label>Initial Value (₹)</Label><Input type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Final Value (₹)</Label><Input type="number" value={end} onChange={(e) => setEnd(Number(e.target.value))} className="mt-2" /></div>
        <div><Label>Tenure (Years)</Label><Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-2" /></div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center text-center">
        <div className="text-sm text-muted-foreground">CAGR</div>
        <div className="text-5xl font-extrabold text-primary mt-1">{cagr.toFixed(2)}%</div>
        <p className="mt-3 text-xs text-muted-foreground">Compound Annual Growth Rate over {years} years</p>
      </div>
    </div>
  );
};
