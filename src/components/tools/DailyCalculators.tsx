import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Box = ({ title, value, sub }: { title: string; value: string; sub?: string }) => (
  <div className="rounded-xl bg-secondary p-6 text-center">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className="text-3xl sm:text-4xl font-extrabold text-primary mt-1">{value}</div>
    {sub && <div className="mt-2 text-sm">{sub}</div>}
  </div>
);

// Working Days between two dates (excludes Sat/Sun)
export const WorkingDays = () => {
  const [start, setStart] = useState(new Date().toISOString().slice(0, 10));
  const [end, setEnd] = useState(new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10));
  const result = useMemo(() => {
    const s = new Date(start), e = new Date(end);
    if (e < s) return { working: 0, weekend: 0, total: 0 };
    let w = 0, we = 0;
    const d = new Date(s);
    while (d <= e) {
      const day = d.getDay();
      if (day === 0 || day === 6) we++; else w++;
      d.setDate(d.getDate() + 1);
    }
    return { working: w, weekend: we, total: w + we };
  }, [start, end]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>Start Date</Label><Input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1.5" /></div>
        <div><Label>End Date</Label><Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1.5" /></div>
      </div>
      <div className="space-y-3">
        <Box title="Working Days" value={`${result.working}`} sub={`${result.weekend} weekend days · ${result.total} total`} />
      </div>
    </div>
  );
};

// Days Between Dates
export const DaysBetweenDates = () => {
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const days = useMemo(() => Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000), [start, end]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>From</Label><Input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1.5" /></div>
        <div><Label>To</Label><Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1.5" /></div>
      </div>
      <div className="space-y-3">
        <Box title="Days" value={`${Math.abs(days)}`} sub={`${(Math.abs(days) / 7).toFixed(1)} weeks · ${(Math.abs(days) / 365.25).toFixed(2)} years`} />
      </div>
    </div>
  );
};

// Countdown Timer
export const CountdownTimer = () => {
  const [target, setTarget] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 16));
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i); }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>Target Date & Time</Label>
          <Input type="datetime-local" value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1.5" /></div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        {[["Days", d], ["Hours", h], ["Min", m], ["Sec", s]].map(([k, v]) => (
          <div key={k as string} className="rounded-xl bg-secondary p-4">
            <div className="text-3xl font-extrabold text-primary">{String(v).padStart(2, "0")}</div>
            <div className="text-xs text-muted-foreground mt-1">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stopwatch
export const Stopwatch = () => {
  const [running, setRunning] = useState(false);
  const [ms, setMs] = useState(0);
  useEffect(() => {
    if (!running) return;
    const start = Date.now() - ms;
    const i = setInterval(() => setMs(Date.now() - start), 50);
    return () => clearInterval(i);
  }, [running]);
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl font-extrabold text-primary tabular-nums">
        {String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}.{String(cs).padStart(2, "0")}
      </div>
      <div className="flex justify-center gap-3">
        <Button onClick={() => setRunning(!running)}>{running ? "Pause" : "Start"}</Button>
        <Button variant="secondary" onClick={() => { setMs(0); setRunning(false); }}>Reset</Button>
      </div>
    </div>
  );
};

// World Clock
const ZONES = ["Asia/Kolkata", "America/New_York", "Europe/London", "Asia/Dubai", "Asia/Singapore", "Asia/Tokyo", "Australia/Sydney", "America/Los_Angeles"];
export const WorldClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ZONES.map((z) => (
        <div key={z} className="rounded-xl bg-secondary p-4">
          <div className="text-xs text-muted-foreground">{z.replace("_", " ")}</div>
          <div className="text-2xl font-bold text-primary mt-1">
            {now.toLocaleTimeString("en-GB", { timeZone: z, hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </div>
          <div className="text-xs mt-1">{now.toLocaleDateString("en-GB", { timeZone: z, weekday: "short", day: "numeric", month: "short" })}</div>
        </div>
      ))}
    </div>
  );
};

// Time Zone Converter
export const TimeZoneConverter = () => {
  const [time, setTime] = useState(new Date().toISOString().slice(0, 16));
  const [from, setFrom] = useState("Asia/Kolkata");
  const [to, setTo] = useState("America/New_York");
  const result = useMemo(() => {
    try {
      const d = new Date(time);
      return d.toLocaleString("en-GB", { timeZone: to, hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" });
    } catch { return "—"; }
  }, [time, to]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>Date & Time</Label><Input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1.5" /></div>
        <div><Label>From</Label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
            {ZONES.map((z) => <option key={z}>{z}</option>)}
          </select></div>
        <div><Label>To</Label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm">
            {ZONES.map((z) => <option key={z}>{z}</option>)}
          </select></div>
      </div>
      <Box title={`Time in ${to.split("/")[1].replace("_", " ")}`} value={result} />
    </div>
  );
};

// Birthday Reminder (countdown to next birthday + age)
export const BirthdayReminder = () => {
  const [dob, setDob] = useState("1995-06-15");
  const result = useMemo(() => {
    const b = new Date(dob); const now = new Date();
    const next = new Date(now.getFullYear(), b.getMonth(), b.getDate());
    if (next < now) next.setFullYear(next.getFullYear() + 1);
    const days = Math.ceil((next.getTime() - now.getTime()) / 86400000);
    const age = next.getFullYear() - b.getFullYear();
    return { days, age, on: next.toDateString() };
  }, [dob]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>Date of Birth</Label><Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1.5" /></div>
      </div>
      <div className="space-y-3">
        <Box title="Days Until Next Birthday" value={`${result.days}`} sub={`On ${result.on} — turning ${result.age}`} />
      </div>
    </div>
  );
};

// Leap Year Check
export const LeapYearCheck = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>Year</Label><Input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="mt-1.5" /></div>
      </div>
      <Box title={`${year}`} value={isLeap ? "Leap Year ✓" : "Not a Leap Year"} sub={isLeap ? "366 days · February has 29" : "365 days · February has 28"} />
    </div>
  );
};

// Week Number
export const WeekNumber = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const week = useMemo(() => {
    const d = new Date(date);
    const target = new Date(d.valueOf());
    const dayNr = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const diff = target.getTime() - firstThursday.getTime();
    return 1 + Math.round(diff / (7 * 86400000));
  }, [date]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div><Label>Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5" /></div>
      </div>
      <Box title="ISO Week Number" value={`Week ${week}`} sub={new Date(date).toDateString()} />
    </div>
  );
};
