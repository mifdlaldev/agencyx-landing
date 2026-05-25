"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Services" },
  { href: "#stats", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]"
          : "bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="section-shell flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-sm font-black text-[var(--bg-primary)]">
            A
          </span>
          <span className="text-lg font-bold tracking-tight">AgencyX</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="glow-button rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            Start a project
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="section-shell pb-5 md:hidden">
          <div className="glass-card flex flex-col gap-1 rounded-2xl p-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="glow-button mt-2 rounded-xl px-4 py-3 text-center text-sm font-semibold"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
