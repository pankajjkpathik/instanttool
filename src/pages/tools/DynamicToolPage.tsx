import { useParams, Navigate, Link } from "react-router-dom";
import { ToolPageLayout } from "@/components/site/ToolPageLayout";
import { allTools, getTool } from "@/data/toolsData";

const DynamicToolPage = () => {
  const { slug = "" } = useParams();
  const tool = getTool(slug);
  if (!tool) return <Navigate to="/404" replace />;

  const Calc = tool.Calculator;
  const related = tool.related
    .map((s) => allTools.find((t) => t.slug === s))
    .filter(Boolean)
    .slice(0, 6)
    .map((t) => ({ label: t!.name, href: `/tool/${t!.slug}` }));

  return (
    <ToolPageLayout
      title={`${tool.name} Online – Free & Instant Calculator | InstantTool.in`}
      description={`Use our free ${tool.name.toLowerCase()} to calculate results instantly. Fast, accurate and easy to use — built for Indian users.`}
      canonical={`/tool/${tool.slug}`}
      breadcrumbCategory={{ label: tool.categoryLabel, href: "/#categories" }}
      h1={`${tool.name} – Calculate Instantly Online`}
      intro={<p>{tool.short}</p>}
      calculator={<Calc {...(tool.calculatorProps || {})} />}
      whatIs={{ heading: `What is ${tool.name}?`, body: <p>{tool.whatIs}</p> }}
      formula={tool.formula ? { heading: "Formula", expression: tool.formula.expression, legend: tool.formula.legend } : undefined}
      example={{ body: <p>{tool.example}</p> }}
      benefits={{ heading: `Benefits of using the ${tool.name}`, items: tool.benefits }}
      howToUse={{ heading: `How to Use the ${tool.name}`, steps: tool.howTo }}
      tips={{ heading: "Tips & Best Practices", items: tool.tips }}
      faqs={tool.faqs}
      related={related.length ? related : [{ label: "Browse all tools", href: "/#explore" }]}
      cta={
        <>
          <h3 className="text-xl sm:text-2xl font-bold">Start using the {tool.name} now</h3>
          <p className="mt-2 opacity-90">Make smarter decisions instantly with our free, mobile-friendly tool.</p>
          <Link to="/#explore" className="mt-4 inline-block rounded-lg bg-card text-foreground px-5 py-2.5 text-sm font-semibold">Browse all tools</Link>
        </>
      }
      extraSeoParagraph={<p>{tool.extra}</p>}
    />
  );
};

export default DynamicToolPage;
