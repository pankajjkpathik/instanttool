import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const QrGenerator = () => {
  const [text, setText] = useState("https://instanttool.in");
  const [size, setSize] = useState(240);
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text || " ")}`;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div><Label>Text or URL</Label>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text, link, UPI…" className="mt-2" /></div>
        <div>
          <div className="flex items-center justify-between"><Label>Size (px)</Label><span className="text-sm font-semibold">{size}</span></div>
          <input type="range" min={120} max={480} step={20} value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
        </div>
        <a href={url} download="qr-code.png" className="inline-flex rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Download PNG</a>
      </div>
      <div className="rounded-xl bg-secondary p-6 grid place-items-center">
        <img src={url} alt={`QR code for ${text}`} width={size} height={size} className="rounded-lg bg-card p-3 shadow-soft" loading="lazy" />
      </div>
    </div>
  );
};
