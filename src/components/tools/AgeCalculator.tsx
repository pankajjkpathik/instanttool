import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AgeCalculator = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [dob, setDob] = useState("2000-01-01");
  const [on, setOn] = useState(today);

  const result = useMemo(() => {
    const d1 = new Date(dob), d2 = new Date(on);
    if (isNaN(+d1) || isNaN(+d2) || d2 < d1) return null;
    let y = d2.getFullYear() - d1.getFullYear();
    let m = d2.getMonth() - d1.getMonth();
    let d = d2.getDate() - d1.getDate();
    if (d < 0) { m -= 1; d += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); }
    if (m < 0) { y -= 1; m += 12; }
    const totalDays = Math.floor((+d2 - +d1) / 86400000);
    return { y, m, d, totalDays, weeks: Math.floor(totalDays / 7), months: y * 12 + m };
  }, [dob, on]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div><Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-2" /></div>
        <div><Label htmlFor="on">Age on Date</Label>
          <Input id="on" type="date" value={on} onChange={(e) => setOn(e.target.value)} className="mt-2" /></div>
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center">
        {result ? (<>
          <div className="text-sm text-muted-foreground">Your Age</div>
          <div className="text-3xl sm:text-4xl font-extrabold text-primary mt-1">
            {result.y} <span className="text-lg">years</span> {result.m} <span className="text-lg">months</span> {result.d} <span className="text-lg">days</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-xs text-muted-foreground">Months</div><div className="font-bold">{result.months}</div></div>
            <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-xs text-muted-foreground">Weeks</div><div className="font-bold">{result.weeks.toLocaleString()}</div></div>
            <div className="rounded-lg bg-card p-3 shadow-soft"><div className="text-xs text-muted-foreground">Days</div><div className="font-bold">{result.totalDays.toLocaleString()}</div></div>
          </div>
        </>) : <div className="text-muted-foreground">Enter valid dates.</div>}
      </div>
    </div>
  );
};
