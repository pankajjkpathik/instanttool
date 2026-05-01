import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Shape = "rectangle" | "square" | "circle" | "triangle";

export const AreaCalculator = () => {
  const [shape, setShape] = useState<Shape>("rectangle");
  const [a, setA] = useState(10);
  const [b, setB] = useState(5);

  const area = useMemo(() => {
    const x = Number(a) || 0, y = Number(b) || 0;
    if (shape === "rectangle") return x * y;
    if (shape === "square") return x * x;
    if (shape === "circle") return Math.PI * x * x;
    return 0.5 * x * y;
  }, [shape, a, b]);

  const labels = {
    rectangle: ["Length", "Width"],
    square: ["Side", ""],
    circle: ["Radius", ""],
    triangle: ["Base", "Height"],
  }[shape];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["rectangle", "square", "circle", "triangle"] as Shape[]).map((s) => (
          <button key={s} onClick={() => setShape(s)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold capitalize ${shape === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>{labels[0]}</Label><Input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1.5" /></div>
        {labels[1] && <div><Label>{labels[1]}</Label><Input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="mt-1.5" /></div>}
      </div>
      <div className="rounded-xl bg-secondary p-6 text-center">
        <div className="text-sm text-muted-foreground">Area</div>
        <div className="text-4xl font-extrabold text-primary mt-1">{area.toFixed(2)} <span className="text-lg">sq units</span></div>
      </div>
    </div>
  );
};
