import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const DateDifference = () => {
  const [from, setFrom] = useState("2024-01-01");
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));

  const r = useMemo(() => {
    const a = new Date(from), b = new Date(to);
    if (isNaN(+a) || isNaN(+b)) return null;
    const ms = Math.abs(+b - +a);
    const days = Math.floor(ms / 86400000);
    return { days, weeks: Math.floor(days / 7), hours: Math.floor(ms / 3600000), minutes: Math.floor(ms / 60000) };
  }, [from, to]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div><Label>From Date</Label><Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-2" /></div>
        <div><Label>To Date</Label><Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="mt-2" /></div>
      </div>
      <div className="rounded-xl bg-secondary p-6">
        {r ? (
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Days", r.days], ["Weeks", r.weeks],
              ["Hours", r.hours], ["Minutes", r.minutes],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-lg bg-card p-4 shadow-soft">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="text-2xl font-extrabold text-primary">{(v as number).toLocaleString()}</div>
              </div>
            ))}
          </div>
        ) : <div className="text-muted-foreground">Enter valid dates.</div>}
      </div>
    </div>
  );
};
