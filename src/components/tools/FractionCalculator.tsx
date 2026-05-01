import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));

export const FractionCalculator = () => {
  const [n1, setN1] = useState(1); const [d1, setD1] = useState(2);
  const [n2, setN2] = useState(1); const [d2, setD2] = useState(3);
  const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");

  const result = useMemo(() => {
    let n = 0, d = 1;
    if (op === "+") { n = n1 * d2 + n2 * d1; d = d1 * d2; }
    if (op === "-") { n = n1 * d2 - n2 * d1; d = d1 * d2; }
    if (op === "*") { n = n1 * n2; d = d1 * d2; }
    if (op === "/") { n = n1 * d2; d = d1 * n2; }
    if (!d) return "—";
    const g = gcd(n, d) || 1;
    return `${n / g} / ${d / g}  =  ${(n / d).toFixed(4)}`;
  }, [n1, d1, n2, d2, op]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
        <div><Label>Num 1</Label><Input type="number" value={n1} onChange={(e) => setN1(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>Den 1</Label><Input type="number" value={d1} onChange={(e) => setD1(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>Num 2</Label><Input type="number" value={n2} onChange={(e) => setN2(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>Den 2</Label><Input type="number" value={d2} onChange={(e) => setD2(Number(e.target.value))} className="mt-1.5" /></div>
      </div>
      <div className="flex gap-2">
        {(["+", "-", "*", "/"] as const).map((o) => (
          <button key={o} onClick={() => setOp(o)}
            className={`rounded-lg border px-4 py-2 text-base font-bold ${op === o ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>{o}</button>
        ))}
      </div>
      <div className="rounded-xl bg-secondary p-6 text-center">
        <div className="text-sm text-muted-foreground">Result</div>
        <div className="text-2xl sm:text-3xl font-extrabold text-primary mt-1">{result}</div>
      </div>
    </div>
  );
};
