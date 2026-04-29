import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const BmiCalculator = () => {
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(170); // cm

  const { bmi, category, color } = useMemo(() => {
    const h = (Number(height) || 0) / 100;
    const w = Number(weight) || 0;
    if (h <= 0 || w <= 0) return { bmi: 0, category: "—", color: "muted-foreground" };
    const v = w / (h * h);
    let cat = "Normal", c = "accent";
    if (v < 18.5) { cat = "Underweight"; c = "daily"; }
    else if (v >= 25 && v < 30) { cat = "Overweight"; c = "daily"; }
    else if (v >= 30) { cat = "Obese"; c = "destructive"; }
    return { bmi: v, category: cat, color: c };
  }, [weight, height]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between"><Label htmlFor="w">Weight (kg)</Label><span className="text-sm font-semibold">{weight} kg</span></div>
          <Input id="w" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="mt-2" />
          <input type="range" min={20} max={200} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
        </div>
        <div>
          <div className="flex items-center justify-between"><Label htmlFor="h">Height (cm)</Label><span className="text-sm font-semibold">{height} cm</span></div>
          <Input id="h" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="mt-2" />
          <input type="range" min={100} max={220} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
        </div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">Your BMI</div>
        <div className="text-5xl font-extrabold text-primary mt-1">{bmi.toFixed(1)}</div>
        <div className="mt-3 inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: `hsl(var(--${color}) / 0.15)`, color: `hsl(var(--${color}))` }}>{category}</div>
        <ul className="mt-6 space-y-1.5 text-xs text-muted-foreground">
          <li>Underweight: &lt; 18.5</li><li>Normal: 18.5 – 24.9</li>
          <li>Overweight: 25 – 29.9</li><li>Obese: ≥ 30</li>
        </ul>
      </div>
    </div>
  );
};
