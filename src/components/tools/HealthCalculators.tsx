import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NumIn = ({ label, value, onChange, suffix }: { label: string; value: number; onChange: (n: number) => void; suffix?: string }) => (
  <div>
    <div className="flex items-baseline justify-between"><Label>{label}</Label>{suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}</div>
    <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1.5" />
  </div>
);

const Box = ({ title, value, sub }: { title: string; value: string; sub?: string }) => (
  <div className="rounded-xl bg-secondary p-6 text-center">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className="text-4xl font-extrabold text-primary mt-1">{value}</div>
    {sub && <div className="mt-2 text-sm">{sub}</div>}
  </div>
);

// BMR — Mifflin-St Jeor
export const BmrCalculator = () => {
  const [age, setAge] = useState(28);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [sex, setSex] = useState<"male" | "female">("male");
  const bmr = useMemo(() => {
    const base = 10 * weight + 6.25 * height - 5 * age;
    return sex === "male" ? base + 5 : base - 161;
  }, [age, weight, height, sex]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <NumIn label="Age (years)" value={age} onChange={setAge} />
        <NumIn label="Weight (kg)" value={weight} onChange={setWeight} />
        <NumIn label="Height (cm)" value={height} onChange={setHeight} />
        <div>
          <Label>Sex</Label>
          <select value={sex} onChange={(e) => setSex(e.target.value as any)} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </div>
      </div>
      <Box title="Basal Metabolic Rate" value={`${Math.round(bmr)} kcal/day`} sub="Calories your body burns at rest" />
    </div>
  );
};

// Body Fat % — US Navy method
export const BodyFatCalculator = () => {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(170);
  const [neck, setNeck] = useState(38);
  const [waist, setWaist] = useState(85);
  const [hip, setHip] = useState(95);
  const bf = useMemo(() => {
    const log10 = (x: number) => Math.log(x) / Math.LN10;
    if (sex === "male") {
      return 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450;
    }
    return 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.221 * log10(height)) - 450;
  }, [sex, height, neck, waist, hip]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label>Sex</Label>
          <select value={sex} onChange={(e) => setSex(e.target.value as any)} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </div>
        <NumIn label="Height (cm)" value={height} onChange={setHeight} />
        <NumIn label="Neck (cm)" value={neck} onChange={setNeck} />
        <NumIn label="Waist (cm)" value={waist} onChange={setWaist} />
        {sex === "female" && <NumIn label="Hip (cm)" value={hip} onChange={setHip} />}
      </div>
      <Box title="Body Fat" value={`${bf.toFixed(1)}%`} sub="US Navy method estimate" />
    </div>
  );
};

// Ideal Weight — Devine formula
export const IdealWeightCalculator = () => {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(170);
  const inches = height / 2.54;
  const over5ft = Math.max(0, inches - 60);
  const ideal = sex === "male" ? 50 + 2.3 * over5ft : 45.5 + 2.3 * over5ft;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label>Sex</Label>
          <select value={sex} onChange={(e) => setSex(e.target.value as any)} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </div>
        <NumIn label="Height (cm)" value={height} onChange={setHeight} />
      </div>
      <Box title="Ideal Body Weight" value={`${ideal.toFixed(1)} kg`} sub="Devine formula" />
    </div>
  );
};

// Pregnancy Due Date — Naegele's rule
export const PregnancyDueDate = () => {
  const [lmp, setLmp] = useState(new Date().toISOString().slice(0, 10));
  const due = useMemo(() => {
    const d = new Date(lmp);
    d.setDate(d.getDate() + 280);
    return d.toDateString();
  }, [lmp]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>First Day of Last Period</Label>
          <Input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="mt-1.5" /></div>
        <p className="text-xs text-muted-foreground">Based on Naegele's rule (LMP + 280 days).</p>
      </div>
      <Box title="Estimated Due Date" value={due} />
    </div>
  );
};

// Ovulation
export const OvulationCalculator = () => {
  const [lmp, setLmp] = useState(new Date().toISOString().slice(0, 10));
  const [cycle, setCycle] = useState(28);
  const result = useMemo(() => {
    const d = new Date(lmp);
    d.setDate(d.getDate() + (cycle - 14));
    const win0 = new Date(d); win0.setDate(d.getDate() - 5);
    const win1 = new Date(d); win1.setDate(d.getDate() + 1);
    return { ovulation: d.toDateString(), window: `${win0.toDateString()} – ${win1.toDateString()}` };
  }, [lmp, cycle]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>First Day of Last Period</Label>
          <Input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="mt-1.5" /></div>
        <NumIn label="Cycle Length (days)" value={cycle} onChange={setCycle} />
      </div>
      <div className="space-y-3">
        <Box title="Ovulation Day" value={result.ovulation} />
        <div className="rounded-lg bg-card p-4 shadow-soft text-sm"><b>Fertile Window:</b> {result.window}</div>
      </div>
    </div>
  );
};

// Heart Rate Zones — Karvonen-style %max
export const HeartRateZone = () => {
  const [age, setAge] = useState(30);
  const max = 220 - age;
  const zones = [
    { name: "Warm-up (50-60%)", low: max * 0.5, high: max * 0.6 },
    { name: "Fat Burn (60-70%)", low: max * 0.6, high: max * 0.7 },
    { name: "Aerobic (70-80%)", low: max * 0.7, high: max * 0.8 },
    { name: "Anaerobic (80-90%)", low: max * 0.8, high: max * 0.9 },
    { name: "Maximum (90-100%)", low: max * 0.9, high: max },
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <NumIn label="Age (years)" value={age} onChange={setAge} />
        <Box title="Max Heart Rate" value={`${max} bpm`} />
      </div>
      <div className="space-y-2">
        {zones.map((z) => (
          <div key={z.name} className="rounded-lg bg-secondary p-3">
            <div className="text-sm text-muted-foreground">{z.name}</div>
            <div className="text-lg font-bold text-primary">{Math.round(z.low)} – {Math.round(z.high)} bpm</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Macros (40/30/30 default)
export const MacroCalculator = () => {
  const [calories, setCalories] = useState(2000);
  const [carb, setCarb] = useState(40);
  const [protein, setProtein] = useState(30);
  const [fat, setFat] = useState(30);
  const c = (calories * carb / 100) / 4;
  const p = (calories * protein / 100) / 4;
  const f = (calories * fat / 100) / 9;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <NumIn label="Daily Calories" value={calories} onChange={setCalories} />
        <NumIn label="Carbs %" value={carb} onChange={setCarb} />
        <NumIn label="Protein %" value={protein} onChange={setProtein} />
        <NumIn label="Fat %" value={fat} onChange={setFat} />
      </div>
      <div className="space-y-3">
        <Box title="Carbs" value={`${c.toFixed(0)} g`} />
        <Box title="Protein" value={`${p.toFixed(0)} g`} />
        <Box title="Fat" value={`${f.toFixed(0)} g`} />
      </div>
    </div>
  );
};

// BMI by Age (just calls BMI + age category)
export const BmiByAge = () => {
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const bmi = weight / Math.pow(height / 100, 2);
  const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
  const note = age >= 65 ? "For 65+, BMI 23-30 may be healthier." : age < 18 ? "Use child/teen percentile charts." : "Adult standard ranges apply.";
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <NumIn label="Age" value={age} onChange={setAge} />
        <NumIn label="Weight (kg)" value={weight} onChange={setWeight} />
        <NumIn label="Height (cm)" value={height} onChange={setHeight} />
      </div>
      <div className="space-y-3">
        <Box title="BMI" value={bmi.toFixed(1)} sub={cat} />
        <div className="rounded-lg bg-card p-4 shadow-soft text-sm">{note}</div>
      </div>
    </div>
  );
};

// BMI Chart (static reference)
export const BmiChart = () => {
  const rows = [
    ["Underweight", "< 18.5", "text-blue-500"],
    ["Normal", "18.5 – 24.9", "text-green-500"],
    ["Overweight", "25 – 29.9", "text-yellow-500"],
    ["Obese Class I", "30 – 34.9", "text-orange-500"],
    ["Obese Class II", "35 – 39.9", "text-red-500"],
    ["Obese Class III", "≥ 40", "text-red-700"],
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary"><tr><th className="p-3 text-left">Category</th><th className="p-3 text-left">BMI Range (kg/m²)</th></tr></thead>
        <tbody>
          {rows.map(([c, r, cls]) => (
            <tr key={c} className="border-t border-border"><td className={`p-3 font-semibold ${cls}`}>{c}</td><td className="p-3">{r}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="bg-card p-4 text-xs text-muted-foreground">WHO classification for adults. Use the BMI Calculator to find your value.</div>
    </div>
  );
};
