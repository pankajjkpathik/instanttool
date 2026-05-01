import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" }).format(isFinite(n) ? n : 0);

export const RetirementCalculator = () => {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExp, setMonthlyExp] = useState(40000);
  const [inflation, setInflation] = useState(6);
  const [returnRate, setReturnRate] = useState(12);
  const [postReturn, setPostReturn] = useState(7);
  const [lifeExp, setLifeExp] = useState(80);

  const { corpus, monthlySip } = useMemo(() => {
    const yearsToRetire = retireAge - age;
    const yearsAfter = lifeExp - retireAge;
    const futureExp = monthlyExp * Math.pow(1 + inflation / 100, yearsToRetire);
    const realRate = (postReturn - inflation) / 100;
    const months = yearsAfter * 12;
    const r = realRate / 12;
    const c = r === 0 ? futureExp * months : futureExp * (1 - Math.pow(1 + r, -months)) / r;
    const i = returnRate / 12 / 100;
    const n = yearsToRetire * 12;
    const sip = i === 0 ? c / n : (c * i) / ((Math.pow(1 + i, n) - 1) * (1 + i));
    return { corpus: c, monthlySip: sip };
  }, [age, retireAge, monthlyExp, inflation, returnRate, postReturn, lifeExp]);

  const fields = [
    { l: "Current Age", v: age, set: setAge },
    { l: "Retirement Age", v: retireAge, set: setRetireAge },
    { l: "Life Expectancy", v: lifeExp, set: setLifeExp },
    { l: "Monthly Expense Today (₹)", v: monthlyExp, set: setMonthlyExp },
    { l: "Inflation (%)", v: inflation, set: setInflation },
    { l: "Return Pre-retirement (%)", v: returnRate, set: setReturnRate },
    { l: "Return Post-retirement (%)", v: postReturn, set: setPostReturn },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.l}><Label>{f.l}</Label><Input type="number" value={f.v} onChange={(e) => f.set(Number(e.target.value))} className="mt-1.5" /></div>
        ))}
      </div>
      <div className="rounded-xl bg-secondary p-6 flex flex-col justify-center space-y-4">
        <div>
          <div className="text-sm text-muted-foreground">Required Retirement Corpus</div>
          <div className="text-3xl sm:text-4xl font-extrabold text-primary mt-1">{inr(corpus)}</div>
        </div>
        <div className="rounded-lg gradient-primary p-4 text-primary-foreground">
          <div className="text-xs opacity-80">Monthly SIP needed</div>
          <div className="text-2xl font-extrabold">{inr(monthlySip)}</div>
        </div>
      </div>
    </div>
  );
};
