import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const twoDig = (n: number): string => n < 20 ? ones[n] : `${tens[Math.floor(n / 10)]}${n % 10 ? " " + ones[n % 10] : ""}`;
const threeDig = (n: number): string => {
  const h = Math.floor(n / 100), r = n % 100;
  return `${h ? ones[h] + " Hundred" + (r ? " " : "") : ""}${r ? twoDig(r) : ""}`.trim();
};

const indianFormat = (num: number): string => {
  if (num === 0) return "Zero";
  if (num < 0) return "Minus " + indianFormat(-num);
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const rest = num % 1000;
  const parts: string[] = [];
  if (crore) parts.push(twoDig(crore) + " Crore");
  if (lakh) parts.push(twoDig(lakh) + " Lakh");
  if (thousand) parts.push(twoDig(thousand) + " Thousand");
  if (rest) parts.push(threeDig(rest));
  return parts.join(" ").trim();
};

export const NumberToWords = () => {
  const [num, setNum] = useState("123456");
  const result = useMemo(() => {
    const n = parseInt(num.replace(/[^0-9-]/g, ""), 10);
    if (!isFinite(n)) return "—";
    return indianFormat(n) + " Rupees Only";
  }, [num]);

  return (
    <div className="space-y-5">
      <div><Label>Enter Number</Label><Input value={num} onChange={(e) => setNum(e.target.value)} className="mt-2" /></div>
      <div className="rounded-xl bg-secondary p-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">In Words (Indian System)</div>
        <div className="mt-2 text-xl sm:text-2xl font-bold text-primary">{result}</div>
      </div>
    </div>
  );
};
