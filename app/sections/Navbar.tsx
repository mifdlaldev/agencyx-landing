"use client";

import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Platform" },
  { href: "#stats", label: "Proof" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Customers" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary"
        className={cn(
          "section-shell flex h-16 items-center justify-between rounded-full border px-4 transition duration-300 sm:px-5",
          scrolled
            ? "border-border bg-white/88 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-white/60 backdrop-blur-md",
        )}
      >
        <a href="#top" onClick={closeMenu} className="flex items-center gap-2.5 font-extrabold tracking-[-0.03em]">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-sm text-white shadow-soft">
            AX
          </span>
          <span className="hidden sm:inline">AgencyX</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a href="#waitlist" className="pill border-primary/15 bg-primary/5 text-primary">
            <Sparkles aria-hidden="true" size={14} />
            AI-ready
          </a>
          <a href="#contact" className={buttonStyles({ variant: "primary", size: "sm" })}>
            Book a build
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
        </button>
      </nav>

      {menuOpen ? (
        <div className="section-shell pt-2 md:hidden">
          <div className="rounded-[1.75rem] border border-border bg-white/95 p-2 shadow-soft backdrop-blur-xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-2xl px-4 py-3 text-sm font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className={buttonStyles({ variant: "primary", className: "mt-2 w-full" })}
            >
              Book a build
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
