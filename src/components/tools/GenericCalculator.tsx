import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * GenericCalculator
 * A safe, dynamic numeric calculator used as a working placeholder for tools
 * that don't yet have a hand-built UI. It evaluates a math expression with
 * basic operators (+ - * / ^ and parentheses) — no `eval`.
 */
const tokenize = (s: string) => s.replace(/\s+/g, "").match(/(\d+\.?\d*|[+\-*/^()])/g) ?? [];

const prec: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
const right = new Set(["^"]);

const toRPN = (tokens: string[]) => {
  const out: string[] = []; const ops: string[] = [];
  for (const t of tokens) {
    if (/^\d/.test(t)) out.push(t);
    else if (t === "(") ops.push(t);
    else if (t === ")") {
      while (ops.length && ops[ops.length - 1] !== "(") out.push(ops.pop()!);
      ops.pop();
    } else {
      while (ops.length) {
        const top = ops[ops.length - 1];
        if (top === "(") break;
        const a = prec[t], b = prec[top];
        if (b > a || (b === a && !right.has(t))) out.push(ops.pop()!); else break;
      }
      ops.push(t);
    }
  }
  while (ops.length) out.push(ops.pop()!);
  return out;
};

const evalRPN = (rpn: string[]) => {
  const st: number[] = [];
  for (const t of rpn) {
    if (/^\d/.test(t)) st.push(parseFloat(t));
    else {
      const b = st.pop() ?? 0, a = st.pop() ?? 0;
      st.push(t === "+" ? a + b : t === "-" ? a - b : t === "*" ? a * b : t === "/" ? a / b : Math.pow(a, b));
    }
  }
  return st[0];
};

export const GenericCalculator = ({ toolName }: { toolName: string }) => {
  const [a, setA] = useState(100);
  const [b, setB] = useState(20);
  const [expr, setExpr] = useState("(100 + 20) * 2");

  const exprResult = useMemo(() => {
    try { const r = evalRPN(toRPN(tokenize(expr))); return isFinite(r) ? r : NaN; }
    catch { return NaN; }
  }, [expr]);

  const sum = (Number(a) || 0) + (Number(b) || 0);
  const diff = (Number(a) || 0) - (Number(b) || 0);
  const prod = (Number(a) || 0) * (Number(b) || 0);
  const div = b ? (Number(a) || 0) / Number(b) : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Value A</Label>
          <Input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>Value B</Label>
          <Input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="mt-1.5" /></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[["A + B", sum], ["A − B", diff], ["A × B", prod], ["A ÷ B", div]].map(([k, v]) => (
          <div key={k as string} className="rounded-lg border border-border bg-card p-3 text-center">
            <div className="text-xs text-muted-foreground">{k}</div>
            <div className="text-lg font-bold text-primary">{(v as number).toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-secondary p-5">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Quick expression</Label>
        <Input value={expr} onChange={(e) => setExpr(e.target.value)} className="mt-2 font-mono" />
        <div className="mt-3 text-2xl font-extrabold text-primary">
          = {isFinite(exprResult) ? exprResult.toLocaleString(undefined, { maximumFractionDigits: 6 }) : "—"}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          A general-purpose calculator for {toolName}. A dedicated, fully optimized
          version is being rolled out — bookmark this page to use it as soon as it goes live.
        </p>
      </div>
    </div>
  );
};
