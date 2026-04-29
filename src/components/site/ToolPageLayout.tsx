import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AdSlot } from "@/components/site/AdSlot";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, ArrowRight } from "lucide-react";

export interface FAQItem { q: string; a: string }
export interface RelatedTool { label: string; href: string }

export interface ToolPageProps {
  title: string;            // Meta title
  description: string;      // Meta description
  canonical?: string;       // path like /emi-calculator
  h1: string;
  intro: ReactNode;
  calculator: ReactNode;    // The interactive tool UI
  whatIs: { heading: string; body: ReactNode };
  formula?: { heading?: string; expression: string; legend: { sym: string; meaning: string }[] };
  example?: { heading?: string; body: ReactNode };
  benefits: { heading?: string; items: string[] };
  useCases?: { heading: string; items: string[] };
  howToUse?: { heading?: string; steps: string[] };
  tips?: { heading: string; items: string[] };
  faqs: FAQItem[];
  related: RelatedTool[];
  cta?: ReactNode;
  extraSeoParagraph?: ReactNode;
  breadcrumbCategory?: { label: string; href: string };
}

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const ToolPageLayout = (props: ToolPageProps) => {
  const {
    title, description, canonical, h1, intro, calculator,
    whatIs, formula, example, benefits, useCases, howToUse, tips,
    faqs, related, cta, extraSeoParagraph, breadcrumbCategory,
  } = props;

  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    if (canonical) {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = `${window.location.origin}${canonical}`;
    }

    // FAQ JSON-LD
    const ldId = "tool-faq-jsonld";
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();
    if (faqs?.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = ldId;
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
      document.head.appendChild(script);
    }

    return () => { document.getElementById(ldId)?.remove(); };
  }, [title, description, canonical, faqs]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumbs */}
        <div className="container-tool pt-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            {breadcrumbCategory && (
              <>
                <Link to={breadcrumbCategory.href} className="hover:text-primary">{breadcrumbCategory.label}</Link>
                <ChevronRight className="h-3 w-3" />
              </>
            )}
            <span className="text-foreground font-medium">{h1}</span>
          </nav>
        </div>

        {/* Hero / H1 + intro */}
        <section className="container-tool pt-6 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">{h1}</h1>
          <div className="mt-4 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {intro}
          </div>
        </section>

        {/* Calculator */}
        <section className="container-tool">
          <div className="rounded-2xl border border-border bg-card shadow-card p-5 sm:p-8">
            {calculator}
          </div>
        </section>

        <AdSlot label="Ad · After Tool" />

        {/* What is */}
        <section className="container-tool py-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{whatIs.heading}</h2>
          <div className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">{whatIs.body}</div>
        </section>

        {/* Formula */}
        {formula && (
          <section className="container-tool py-6">
            <h2 className="text-2xl sm:text-3xl font-bold">{formula.heading ?? "Formula"}</h2>
            <div className="mt-4 rounded-xl bg-secondary p-5 font-mono text-sm sm:text-base">
              {formula.expression}
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {formula.legend.map((l) => (
                <li key={l.sym}><span className="font-semibold text-foreground">{l.sym}</span> = {l.meaning}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Example */}
        {example && (
          <section className="container-tool py-6">
            <h2 className="text-2xl sm:text-3xl font-bold">{example.heading ?? "Example Calculation"}</h2>
            <div className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">{example.body}</div>
          </section>
        )}

        {/* Benefits */}
        <section className="container-tool py-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{benefits.heading ?? "Benefits"}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {benefits.items.map((b) => (
              <li key={b} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <span className="text-accent">✓</span><span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Use cases */}
        {useCases && (
          <section className="container-tool py-6">
            <h2 className="text-2xl sm:text-3xl font-bold">{useCases.heading}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {useCases.items.map((u) => (
                <span key={u} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm">{u}</span>
              ))}
            </div>
          </section>
        )}

        {/* How to use */}
        {howToUse && (
          <section className="container-tool py-6">
            <h2 className="text-2xl sm:text-3xl font-bold">{howToUse.heading ?? "How to Use"}</h2>
            <ol className="mt-4 space-y-2 text-sm sm:text-base">
              {howToUse.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <AdSlot label="Ad · Mid Content" />

        {/* Tips */}
        {tips && (
          <section className="container-tool py-6">
            <h2 className="text-2xl sm:text-3xl font-bold">{tips.heading}</h2>
            <ul className="mt-4 space-y-2 text-sm sm:text-base text-muted-foreground list-disc pl-5">
              {tips.items.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </section>
        )}

        {/* FAQ */}
        <section className="container-tool py-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="mt-4">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Related Tools */}
        <section className="container-tool py-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Related Tools</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.href} to={r.href}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:border-primary hover:shadow-soft transition-all">
                <span className="font-medium">{r.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        {cta && (
          <section className="container-tool py-8">
            <div className="rounded-2xl gradient-primary p-6 sm:p-8 text-primary-foreground text-center shadow-glow">
              {cta}
            </div>
          </section>
        )}

        {/* Extra SEO paragraph */}
        {extraSeoParagraph && (
          <section className="container-tool py-8">
            <div className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              {extraSeoParagraph}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};
