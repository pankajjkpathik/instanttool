import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SpeedDistanceTime = () => {
  const [mode, setMode] = useState<"speed" | "distance" | "time">("speed");
  const [d, setD] = useState(100);
  const [t, setT] = useState(2);
  const [s, setS] = useState(50);

  const result = useMemo(() => {
    if (mode === "speed") return { label: "Speed (km/h)", value: t ? d / t : 0 };
    if (mode === "distance") return { label: "Distance (km)", value: s * t };
    return { label: "Time (hours)", value: s ? d / s : 0 };
  }, [mode, d, t, s]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["speed", "distance", "time"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold capitalize ${mode === m ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>
            Find {m}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {mode !== "distance" && <div><Label>Distance (km)</Label><Input type="number" value={d} onChange={(e) => setD(Number(e.target.value))} className="mt-1.5" /></div>}
        {mode !== "time" && <div><Label>Time (hours)</Label><Input type="number" value={t} onChange={(e) => setT(Number(e.target.value))} className="mt-1.5" /></div>}
        {mode !== "speed" && <div><Label>Speed (km/h)</Label><Input type="number" value={s} onChange={(e) => setS(Number(e.target.value))} className="mt-1.5" /></div>}
      </div>
      <div className="rounded-xl bg-secondary p-6 text-center">
        <div className="text-sm text-muted-foreground">{result.label}</div>
        <div className="text-4xl font-extrabold text-primary mt-1">{result.value.toFixed(2)}</div>
      </div>
    </div>
  );
};
