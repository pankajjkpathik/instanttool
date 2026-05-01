import { Link } from "react-router-dom";
import { StaticPageLayout } from "@/components/site/StaticPageLayout";
import { blogPosts } from "@/data/blogPosts";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const Blog = () => (
  <StaticPageLayout
    title="Blog – InstantTool.in | Finance, Tax, Health & Utility Guides"
    description="In-depth guides on EMI, SIP, tax saving, BMI, calorie deficit, retirement and more — written for Indian readers, with linked calculators."
    canonical="/blog"
    h1="InstantTool Blog"
  >
    <p>
      In-depth, India-first guides on personal finance, investing, tax planning,
      health and everyday utilities — each linked to a free calculator so you
      can apply the lessons immediately.
    </p>

    <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
      {blogPosts.map((p) => (
        <Link
          key={p.slug}
          to={`/blog/${p.slug}`}
          className="group block rounded-xl border border-border bg-card p-5 hover:border-primary hover:shadow-soft transition-all"
        >
          <div className="text-xs text-muted-foreground">
            {p.category} · {fmt(p.date)} · {p.readMin} min read
          </div>
          <h3 className="mt-2 text-lg font-bold text-foreground group-hover:text-primary">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
        </Link>
      ))}
    </div>
  </StaticPageLayout>
);

export default Blog;
