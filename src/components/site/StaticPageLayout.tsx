import { ReactNode, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

interface Props {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  children: ReactNode;
}

export const StaticPageLayout = ({ title, description, canonical, h1, children }: Props) => {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${window.location.origin}${canonical}`;
  }, [title, description, canonical]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-tool py-10 md:py-14 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{h1}</h1>
        <article className="mt-6 space-y-5 text-muted-foreground leading-relaxed [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_strong]:text-foreground">
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
};
