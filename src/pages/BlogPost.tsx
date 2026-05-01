import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { blogPosts, getPost } from "@/data/blogPosts";
import { allTools } from "@/data/toolsData";

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute("content", content);
};

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const BlogPostPage = () => {
  const { slug = "" } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | InstantTool Blog`;
    setMeta("description", post.description);
    setMeta("og:title", post.title, "property");
    setMeta("og:description", post.description, "property");
    setMeta("article:published_time", post.date, "property");
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = `${window.location.origin}/blog/${post.slug}`;

    const ldId = "blog-jsonld";
    document.getElementById(ldId)?.remove();
    const s = document.createElement("script");
    s.type = "application/ld+json"; s.id = ldId;
    s.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "BlogPosting",
      headline: post.title, description: post.description,
      datePublished: post.date, dateModified: post.date,
      author: { "@type": "Organization", name: "InstantTool.in" },
      mainEntityOfPage: `${window.location.origin}/blog/${post.slug}`,
    });
    document.head.appendChild(s);
    return () => { document.getElementById(ldId)?.remove(); };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = post.related.map((s) => allTools.find((t) => t.slug === s)).filter(Boolean).slice(0, 4);
  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-tool py-10 md:py-14 max-w-3xl">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> ›{" "}
          <Link to="/blog" className="hover:text-primary">Blog</Link> ›{" "}
          <span className="text-foreground">{post.category}</span>
        </nav>
        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">{post.title}</h1>
        <div className="mt-3 text-sm text-muted-foreground">
          {post.category} · {fmt(post.date)} · {post.readMin} min read
        </div>

        <article
          className="mt-8 space-y-5 text-muted-foreground leading-relaxed [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_p]:text-base [&_strong]:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {!!related.length && (
          <section className="mt-10 rounded-2xl border border-border bg-secondary p-6">
            <h3 className="text-lg font-bold text-foreground">Related Tools</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {related.map((t) => (
                <Link key={t!.slug} to={`/tool/${t!.slug}`} className="rounded-lg bg-card p-3 hover:border-primary hover:shadow-soft border border-transparent transition-all">
                  <div className="font-semibold text-foreground">{t!.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{t!.short}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h3 className="text-lg font-bold text-foreground">More from the blog</h3>
          <div className="mt-3 grid gap-3">
            {more.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="block rounded-lg border border-border bg-card p-4 hover:border-primary hover:shadow-soft transition-all">
                <div className="text-xs text-muted-foreground">{p.category} · {fmt(p.date)}</div>
                <div className="mt-1 font-semibold text-foreground">{p.title}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
