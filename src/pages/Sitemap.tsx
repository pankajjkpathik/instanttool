import { Link } from "react-router-dom";
import { StaticPageLayout } from "@/components/site/StaticPageLayout";
import { allTools } from "@/data/toolsData";

const groups = [
  { id: "finance", label: "Personal Finance" },
  { id: "investment", label: "Investment & Savings" },
  { id: "health", label: "Health & Fitness" },
  { id: "daily", label: "Daily Utilities" },
  { id: "math", label: "Math Calculators" },
  { id: "utility", label: "Utility & Converters" },
];

const staticLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/blog", label: "Blog" },
];

const Sitemap = () => (
  <StaticPageLayout
    title="Sitemap – InstantTool.in"
    description="Complete sitemap of InstantTool.in covering all 60+ free online calculators and informational pages."
    canonical="/sitemap"
    h1="Sitemap"
  >
    <p>
      A complete index of every page on InstantTool.in — designed to make it
      easy for both visitors and search engines to discover our 60+ free
      calculators and informational resources.
    </p>

    <h2>Main Pages</h2>
    <ul>
      {staticLinks.map((l) => (
        <li key={l.href}><Link to={l.href}>{l.label}</Link></li>
      ))}
    </ul>

    {groups.map((g) => {
      const items = allTools.filter((t) => t.category === g.id);
      if (!items.length) return null;
      return (
        <div key={g.id}>
          <h2>{g.label}</h2>
          <ul>
            {items.map((t) => (
              <li key={t.slug}><Link to={`/tool/${t.slug}`}>{t.name}</Link></li>
            ))}
          </ul>
        </div>
      );
    })}
  </StaticPageLayout>
);

export default Sitemap;
