import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Word Counter (live stats)
export const WordCounter = () => {
  const [text, setText] = useState("Type or paste your text here…");
  const stats = useMemo(() => {
    const t = text.trim();
    return {
      chars: text.length,
      charsNoSpace: text.replace(/\s/g, "").length,
      words: t ? t.split(/\s+/).length : 0,
      sentences: t ? (t.match(/[.!?]+/g) || []).length || 1 : 0,
      paragraphs: t ? t.split(/\n+/).filter(Boolean).length : 0,
      readMin: Math.max(1, Math.round((t ? t.split(/\s+/).length : 0) / 200)),
    };
  }, [text]);
  return (
    <div className="space-y-4">
      <Textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} className="font-mono" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {[["Words", stats.words], ["Chars", stats.chars], ["No Spaces", stats.charsNoSpace], ["Sentences", stats.sentences], ["Paragraphs", stats.paragraphs], ["Read", `${stats.readMin}m`]].map(([k, v]) => (
          <div key={k as string} className="rounded-lg bg-secondary p-3 text-center">
            <div className="text-xl font-bold text-primary">{v}</div>
            <div className="text-xs text-muted-foreground">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Character Counter (alias of word counter, simpler)
export const CharacterCounter = WordCounter;

// Case Converter
export const CaseConverter = () => {
  const [text, setText] = useState("This is a Sample Text.");
  const ops = {
    UPPER: text.toUpperCase(),
    lower: text.toLowerCase(),
    Title: text.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()),
    Sentence: text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (c) => c.toUpperCase()),
    aLtErNaTiNg: text.split("").map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join(""),
    InVeRsE: text.split("").map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(""),
  };
  return (
    <div className="space-y-4">
      <Textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} />
      <div className="grid gap-2 sm:grid-cols-2">
        {Object.entries(ops).map(([k, v]) => (
          <div key={k} className="rounded-lg bg-secondary p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">{k}</span>
              <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(v)}>Copy</Button>
            </div>
            <div className="mt-1 text-sm break-words">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Lorem Ipsum
const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
export const LoremIpsum = () => {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const out = useMemo(() => {
    if (unit === "paragraphs") return Array.from({ length: count }, () => LOREM).join("\n\n");
    if (unit === "sentences") return LOREM.split(". ").slice(0, count).join(". ") + ".";
    return LOREM.split(" ").slice(0, count).join(" ");
  }, [count, unit]);
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><Label>Count</Label><Input type="number" min={1} value={count} onChange={(e) => setCount(Number(e.target.value))} className="mt-1.5" /></div>
        <div><Label>Unit</Label>
          <select value={unit} onChange={(e) => setUnit(e.target.value as any)} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
            <option value="paragraphs">Paragraphs</option><option value="sentences">Sentences</option><option value="words">Words</option>
          </select></div>
      </div>
      <Textarea rows={10} readOnly value={out} className="bg-secondary" />
      <Button onClick={() => navigator.clipboard.writeText(out)}>Copy</Button>
    </div>
  );
};

// URL Encoder/Decoder
export const UrlEncoder = () => {
  const [text, setText] = useState("hello world & friends");
  let enc = "", dec = "";
  try { enc = encodeURIComponent(text); } catch { enc = "Error"; }
  try { dec = decodeURIComponent(text); } catch { dec = "Invalid encoded text"; }
  return (
    <div className="space-y-4">
      <div><Label>Input</Label><Textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} className="mt-1.5 font-mono" /></div>
      <div><Label>URL Encoded</Label><Textarea rows={3} readOnly value={enc} className="mt-1.5 font-mono bg-secondary" /></div>
      <div><Label>URL Decoded</Label><Textarea rows={3} readOnly value={dec} className="mt-1.5 font-mono bg-secondary" /></div>
    </div>
  );
};

// Base64 Encoder/Decoder
export const Base64Encoder = () => {
  const [text, setText] = useState("Hello, World!");
  let enc = "", dec = "";
  try { enc = btoa(unescape(encodeURIComponent(text))); } catch { enc = "Error"; }
  try { dec = decodeURIComponent(escape(atob(text))); } catch { dec = "Not valid Base64"; }
  return (
    <div className="space-y-4">
      <div><Label>Input</Label><Textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} className="mt-1.5 font-mono" /></div>
      <div><Label>Base64 Encoded</Label><Textarea rows={3} readOnly value={enc} className="mt-1.5 font-mono bg-secondary" /></div>
      <div><Label>Base64 Decoded</Label><Textarea rows={3} readOnly value={dec} className="mt-1.5 font-mono bg-secondary" /></div>
    </div>
  );
};

// JSON Formatter
export const JsonFormatter = () => {
  const [text, setText] = useState('{"name":"InstantTool","tools":60,"free":true}');
  let out = "", err = "";
  try { out = JSON.stringify(JSON.parse(text), null, 2); } catch (e: any) { err = e.message; }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div><Label>Input JSON</Label>
        <Textarea rows={14} value={text} onChange={(e) => setText(e.target.value)} className="mt-1.5 font-mono text-xs" /></div>
      <div><Label>Formatted {err && <span className="text-destructive">· {err}</span>}</Label>
        <Textarea rows={14} readOnly value={out} className="mt-1.5 font-mono text-xs bg-secondary" /></div>
    </div>
  );
};

// Color Picker
export const ColorPicker = () => {
  const [color, setColor] = useState("#2563EB");
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  // RGB → HSL
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0));
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
  }
  const hsl = `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>Pick a Color</Label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value.toUpperCase())} className="mt-1.5 h-16 w-full rounded-md border border-border" /></div>
        <Input value={color} onChange={(e) => setColor(e.target.value)} className="font-mono" />
      </div>
      <div className="space-y-3">
        <div className="h-32 rounded-xl border border-border" style={{ background: color }} />
        {[["HEX", color], ["RGB", rgb], ["HSL", hsl]].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-lg bg-secondary p-3">
            <div><div className="text-xs text-muted-foreground">{k}</div><div className="font-mono font-bold">{v}</div></div>
            <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(v)}>Copy</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
