import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const map: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

const toRoman = (n: number): string => {
  if (n < 1 || n > 3999) return "—";
  let res = "";
  for (const [v, s] of map) { while (n >= v) { res += s; n -= v; } }
  return res;
};

const fromRoman = (s: string): number => {
  const v: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  const str = s.toUpperCase();
  for (let i = 0; i < str.length; i++) {
    const c = v[str[i]] || 0, n = v[str[i + 1]] || 0;
    total += c < n ? -c : c;
  }
  return total;
};

export const RomanNumeral = () => {
  const [num, setNum] = useState("2026");
  const [rom, setRom] = useState("MMXXVI");
  const fromNum = useMemo(() => toRoman(parseInt(num) || 0), [num]);
  const fromRom = useMemo(() => fromRoman(rom), [rom]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl bg-secondary p-5 space-y-3">
        <Label>Number → Roman</Label>
        <Input type="number" value={num} onChange={(e) => setNum(e.target.value)} />
        <div className="text-2xl font-extrabold text-primary">{fromNum}</div>
      </div>
      <div className="rounded-xl bg-secondary p-5 space-y-3">
        <Label>Roman → Number</Label>
        <Input value={rom} onChange={(e) => setRom(e.target.value.toUpperCase())} />
        <div className="text-2xl font-extrabold text-primary">{fromRom || "—"}</div>
      </div>
    </div>
  );
};
