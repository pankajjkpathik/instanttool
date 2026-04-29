import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";

const sets = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  num: "0123456789",
  sym: "!@#$%^&*()-_=+[]{};:,.?/",
};

export const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, num: true, sym: true });
  const [pwd, setPwd] = useState("");
  const [copied, setCopied] = useState(false);

  const gen = useCallback(() => {
    const pool = (Object.keys(opts) as (keyof typeof opts)[])
      .filter((k) => opts[k]).map((k) => sets[k]).join("");
    if (!pool) { setPwd(""); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let out = "";
    for (let i = 0; i < length; i++) out += pool[arr[i] % pool.length];
    setPwd(out);
  }, [length, opts]);

  useEffect(() => { gen(); }, [gen]);

  const copy = async () => {
    if (!pwd) return;
    await navigator.clipboard.writeText(pwd);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between"><Label>Length</Label><span className="text-sm font-semibold">{length}</span></div>
          <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(opts) as (keyof typeof opts)[]).map((k) => (
            <label key={k} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm cursor-pointer">
              <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} />
              <span className="capitalize">{k === "num" ? "Numbers" : k === "sym" ? "Symbols" : `${k}case`}</span>
            </label>
          ))}
        </div>
        <button onClick={gen} className="inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
          <RefreshCw className="h-4 w-4" /> Regenerate
        </button>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground mb-2">Generated Password</div>
        <div className="rounded-lg bg-card p-4 font-mono text-base break-all shadow-soft">{pwd || "—"}</div>
        <button onClick={copy} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">
          <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};
