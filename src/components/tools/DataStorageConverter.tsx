import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const units: Record<string, number> = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4, PB: 1024 ** 5 };

export const DataStorageConverter = () => {
  const [val, setVal] = useState(1);
  const [from, setFrom] = useState("GB");
  const [to, setTo] = useState("MB");

  const result = useMemo(() => ((Number(val) || 0) * units[from]) / units[to], [val, from, to]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div><Label>Value</Label><Input type="number" value={val} onChange={(e) => setVal(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>From</Label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {Object.keys(units).map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
        <div><Label>To</Label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {Object.keys(units).map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="rounded-xl bg-secondary p-6 text-center">
        <div className="text-sm text-muted-foreground">Result</div>
        <div className="text-3xl font-extrabold text-primary mt-1">{result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {to}</div>
      </div>
    </div>
  );
};
