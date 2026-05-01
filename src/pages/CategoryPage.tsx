import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { allTools, type CategoryKey } from "@/data/toolsData";

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute("content", content);
};

const META: Record<CategoryKey, { label: string; intro: string }> = {
  finance: { label: "Personal Finance Calculators", intro: "EMI, GST, income tax and loan calculators built for Indian borrowers and salaried earners. Plan smarter before you sign any financial commitment." },
  investment: { label: "Investment & Savings Calculators", intro: "SIP, FD, RD, PPF, NPS, CAGR and retirement tools to grow your wealth — with India-specific assumptions and tax treatment." },
  health: { label: "Health & Fitness Calculators", intro: "BMI, BMR, calorie, body fat and pregnancy tools to help you track and improve your health using globally-recognised formulas." },
  daily: { label: "Daily Utility Calculators", intro: "Age, date difference, working days, world clock and timer tools for everyday planning, scheduling and productivity." },
  math: { label: "Math Calculators", intro: "Scientific, percentage, ratio, average, LCM/HCF, square root and area calculators for students, teachers and professionals." },
  utility: { label: "Utility & Converters", intro: "Unit, currency and data-storage converters plus password, QR, JSON, Base64 and text tools — everything in one place." },
};

const CategoryPage = () => {
  const { key = "" } = useParams<{ key: CategoryKey }>();
  const meta = META[key as CategoryKey];
  if (!meta) return <Navigate to="/" replace />;

  const tools = allTools.filter((t) => t.category === key);

  useEffect(() => {
    const title = `${meta.label} – Free Online Tools | InstantTool.in`;
    document.title = title;
    setMeta("description", meta.intro);
    setMeta("og:title", title, "property");
    setMeta("og:description", meta.intro, "property");
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = `${window.location.origin}/category/${key}`;
  }, [key, meta]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-tool py-10 md:py-14">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> ›{" "}
          <span className="text-foreground">{meta.label}</span>
        </nav>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">{meta.label}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">{meta.intro}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.slug} to={`/tool/${t.slug}`}
              className="group rounded-xl border border-border bg-card p-4 hover:border-primary hover:shadow-soft transition-all">
              <div className="font-semibold group-hover:text-primary">{t.name}</div>
              <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{t.short}</div>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-border bg-secondary p-6">
          <h2 className="text-lg font-bold">Explore other categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(META) as CategoryKey[]).filter((k) => k !== key).map((k) => (
              <Link key={k} to={`/category/${k}`} className="rounded-full bg-card px-3 py-1.5 text-sm hover:border-primary hover:shadow-soft border border-transparent">
                {META[k].label}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
