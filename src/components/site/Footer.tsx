const cols = [
  { title: "Quick Links", links: ["Home", "Trending Tools", "Popular Tools", "Blog"] },
  { title: "Categories", links: ["Finance", "Health", "Daily Utilities", "Math", "Utility"] },
  { title: "Company", links: ["About", "Contact", "Sitemap"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Disclaimer"] },
];

export const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container-tool py-14">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary font-extrabold">i</div>
            <span className="text-lg font-extrabold">InstantTool</span>
          </div>
          <p className="mt-3 text-sm text-background/70">
            Free, fast and accurate online calculators for every Indian.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-bold mb-3">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">{l}</a>
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
