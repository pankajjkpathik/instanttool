import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const RemoveDuplicates = () => {
  const [text, setText] = useState("apple\nbanana\napple\norange\nbanana");
  const [caseSensitive, setCs] = useState(false);

  const out = useMemo(() => {
    const lines = text.split(/\r?\n/);
    const seen = new Set<string>();
    const res: string[] = [];
    for (const l of lines) {
      const k = caseSensitive ? l : l.toLowerCase();
      if (!seen.has(k)) { seen.add(k); res.push(l); }
    }
    return { text: res.join("\n"), removed: lines.length - res.length };
  }, [text, caseSensitive]);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <Label>Input (one item per line)</Label>
        <Textarea rows={10} value={text} onChange={(e) => setText(e.target.value)} className="mt-2 font-mono" />
        <label className="mt-2 inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCs(e.target.checked)} /> Case-sensitive
        </label>
      </div>
      <div>
        <Label>Unique Output ({out.removed} removed)</Label>
        <Textarea rows={10} readOnly value={out.text} className="mt-2 font-mono bg-secondary" />
      </div>
    </div>
  );
};
