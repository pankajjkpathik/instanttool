import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-instanttool.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Finance", href: "/category/finance" },
  { label: "Investment", href: "/category/investment" },
  { label: "Health", href: "/category/health" },
  { label: "Daily", href: "/category/daily" },
  { label: "Math", href: "/category/math" },
  { label: "Utility", href: "/category/utility" },
  { label: "Blog", href: "/blog" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "bg-card/90 backdrop-blur-md shadow-soft" : "bg-card"
      } border-b border-border`}
    >
      <div className="container-tool flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="InstantTool logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg"
          />
          <span className="text-lg font-extrabold tracking-tight">
            Instant<span className="text-primary">Tool</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#explore"
            aria-label="Search tools"
            className="grid h-10 w-10 place-items-center rounded-lg hover:bg-secondary transition-colors"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </a>
          <button
            aria-label="Menu"
            className="lg:hidden grid h-10 w-10 place-items-center rounded-lg hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-card">
          <div className="container-tool flex flex-col py-3">
            {navItems.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
