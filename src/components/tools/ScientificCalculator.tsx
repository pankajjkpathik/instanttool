import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Safe scientific evaluator: allows digits, operators, parentheses, dot, and named functions.
const ALLOWED = /^[0-9+\-*/().,\s^a-zA-Z]+$/;
const fnMap: Record<string, string> = {
  sin: "Math.sin", cos: "Math.cos", tan: "Math.tan",
  log: "Math.log10", ln: "Math.log", sqrt: "Math.sqrt",
  abs: "Math.abs", exp: "Math.exp", pi: "Math.PI", e: "Math.E",
};

const safeEval = (expr: string): number => {
  if (!ALLOWED.test(expr)) return NaN;
  let e = expr.replace(/\^/g, "**");
  for (const [k, v] of Object.entries(fnMap)) e = e.replace(new RegExp(`\\b${k}\\b`, "g"), v);
  try { // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const r = Function(`"use strict";return (${e})`)();
    return typeof r === "number" ? r : NaN;
  } catch { return NaN; }
};

export const ScientificCalculator = () => {
  const [expr, setExpr] = useState("sin(pi/4) + sqrt(2)");
  const result = useMemo(() => safeEval(expr), [expr]);

  return (
    <div className="space-y-5">
      <div>
        <Label>Expression</Label>
        <Input value={expr} onChange={(e) => setExpr(e.target.value)} className="mt-2 font-mono" />
        <p className="mt-2 text-xs text-muted-foreground">Supports + − × ÷ ^ ( ) and sin, cos, tan, log, ln, sqrt, abs, exp, pi, e</p>
      </div>
      <div className="rounded-xl bg-secondary p-6 text-center">
        <div className="text-sm text-muted-foreground">Result</div>
        <div className="text-4xl font-extrabold text-primary mt-1">{isFinite(result) ? result.toLocaleString(undefined, { maximumFractionDigits: 10 }) : "—"}</div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {["sin(", "cos(", "tan(", "sqrt(", "log(", "ln(", "pi", "e", "(", ")", "^", "+", "-", "*", "/", "."].map((b) => (
          <button key={b} onClick={() => setExpr(expr + b)}
            className="rounded-lg border border-border bg-card px-2 py-2 text-sm font-mono hover:bg-secondary">{b}</button>
        ))}
      </div>
    </div>
  );
};
