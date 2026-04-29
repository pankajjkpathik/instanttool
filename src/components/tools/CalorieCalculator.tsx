import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CalorieCalculator = () => {
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] = useState(1.55);

  const { bmr, tdee } = useMemo(() => {
    const w = Number(weight) || 0, h = Number(height) || 0, a = Number(age) || 0;
    const b = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    return { bmr: b, tdee: b * activity };
  }, [age, gender, weight, height, activity]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Age</Label><Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="mt-1.5" /></div>
          <div><Label>Gender</Label>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(["male", "female"] as const).map((g) => (
                <button key={g} type="button" onClick={() => setGender(g)}
                  className={`rounded-lg border px-3 py-2 text-sm capitalize ${gender === g ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>{g}</button>
              ))}
            </div>
          </div>
          <div><Label>Weight (kg)</Label><Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="mt-1.5" /></div>
          <div><Label>Height (cm)</Label><Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="mt-1.5" /></div>
        </div>
        <div><Label>Activity Level</Label>
          <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value={1.2}>Sedentary (little exercise)</option>
            <option value={1.375}>Light (1–3 days/wk)</option>
            <option value={1.55}>Moderate (3–5 days/wk)</option>
            <option value={1.725}>Active (6–7 days/wk)</option>
            <option value={1.9}>Very active (athlete)</option>
          </select>
        </div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">Daily Calorie Need (TDEE)</div>
        <div className="text-5xl font-extrabold text-primary mt-1">{Math.round(tdee)} <span className="text-lg">kcal</span></div>
        <div className="mt-3 text-sm text-muted-foreground">BMR: {Math.round(bmr)} kcal/day</div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-xs text-muted-foreground">Lose</div><div className="font-bold">{Math.round(tdee - 500)}</div></div>
          <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-xs text-muted-foreground">Maintain</div><div className="font-bold">{Math.round(tdee)}</div></div>
          <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-xs text-muted-foreground">Gain</div><div className="font-bold">{Math.round(tdee + 500)}</div></div>
        </div>
      </div>
    </div>
  );
};
