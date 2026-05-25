"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonStyles } from "@/components/ui/Button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#waitlist", label: "Join waitlist" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
] as const;

const storageKey = "agencyx-theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(storageKey, theme);
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/82 backdrop-blur-xl">
      <nav aria-label="Primary" className="section-shell flex h-20 items-center justify-between gap-6">
        <a href="#top" className="group flex items-center gap-3 font-bold" onClick={closeMenu}>
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-sm text-canvas shadow-glow dark:bg-brand dark:text-brand-ink">
            AX
          </span>
          <span className="text-lg tracking-[-0.03em]">AgencyX</span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-muted transition hover:bg-white/60 hover:text-ink dark:hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/55 text-ink transition hover:border-brand hover:bg-brand-soft dark:bg-white/[0.06]"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            disabled={!mounted}
          >
            {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
          </button>
          <a href="#waitlist" className={buttonStyles({ variant: "secondary" })}>
            Start now
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/55 text-ink dark:bg-white/[0.06]"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            disabled={!mounted}
          >
            {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/55 text-ink dark:bg-white/[0.06]"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            disabled={!mounted}
          >
            {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="section-shell pb-5 md:hidden">
          <div className="glass-panel flex flex-col gap-2 rounded-3xl p-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3 text-sm font-bold text-ink transition hover:bg-brand-soft"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
