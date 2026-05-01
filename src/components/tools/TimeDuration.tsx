import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TimeDuration = () => {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:30");

  const result = useMemo(() => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins < 0) mins += 24 * 60;
    return { h: Math.floor(mins / 60), m: mins % 60, total: mins };
  }, [start, end]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Start Time</Label><Input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1.5" /></div>
        <div><Label>End Time</Label><Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1.5" /></div>
      </div>
      <div className="rounded-xl bg-secondary p-6 text-center">
        <div className="text-sm text-muted-foreground">Duration</div>
        <div className="text-4xl font-extrabold text-primary mt-1">{result.h}h {result.m}m</div>
        <div className="mt-2 text-sm text-muted-foreground">{result.total} minutes total</div>
      </div>
    </div>
  );
};
