import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const WaterIntake = () => {
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(30); // mins/day

  const litres = useMemo(() => {
    const w = Number(weight) || 0;
    const a = Number(activity) || 0;
    // 35 ml/kg + 350 ml per 30 min activity
    return (w * 35 + (a / 30) * 350) / 1000;
  }, [weight, activity]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between"><Label>Weight (kg)</Label><span className="text-sm font-semibold">{weight} kg</span></div>
          <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="mt-2" />
          <input type="range" min={20} max={200} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
        </div>
        <div>
          <div className="flex items-center justify-between"><Label>Daily Activity (minutes)</Label><span className="text-sm font-semibold">{activity} min</span></div>
          <Input type="number" value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="mt-2" />
          <input type="range" min={0} max={240} value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="mt-3 w-full accent-[hsl(var(--primary))]" />
        </div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">Recommended Daily Water</div>
        <div className="text-5xl font-extrabold text-primary mt-1">{litres.toFixed(2)} <span className="text-lg">L</span></div>
        <div className="mt-3 text-sm text-muted-foreground">≈ {Math.round((litres * 1000) / 250)} glasses (250 ml)</div>
      </div>
    </div>
  );
};
