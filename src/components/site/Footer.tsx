import { Link } from "react-router-dom";
import logo from "@/assets/logo-instanttool.png";

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "All Tools", href: "/#explore" },
      { label: "Personal Finance Planner", href: "/InstantTool-Personal-Finance-Planner.xlsx" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Personal Finance", href: "/category/finance" },
      { label: "Investment & Savings", href: "/category/investment" },
      { label: "Health & Fitness", href: "/category/health" },
      { label: "Daily Utilities", href: "/category/daily" },
      { label: "Math Calculators", href: "/category/math" },
      { label: "Utility & Converters", href: "/category/utility" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container-tool py-14">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <img src={logo} alt="InstantTool" width={36} height={36} className="h-9 w-9 rounded-lg" loading="lazy" />
            <span className="text-lg font-extrabold">InstantTool</span>
          </div>
          <p className="mt-3 text-sm text-background/70">
            Free, fast and accurate online calculators for every Indian household.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-bold mb-3">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") && !l.href.includes(".xlsx") && !l.href.includes("#") ? (
                    <Link to={l.href} className="text-sm text-background/70 hover:text-background transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="text-sm text-background/70 hover:text-background transition-colors">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 border-t border-background/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-background/60">
        <div>© {new Date().getFullYear()} InstantTool.in — All rights reserved.</div>
        <div>Made with ❤️ in India</div>
      </div>
    </div>
  </footer>
);
