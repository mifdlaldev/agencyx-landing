import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const posts = [
  {
    title: "The Anatomy of a High-Converting Landing Page",
    excerpt: "Breaking down the key elements that separate good landing pages from great ones.",
    date: "May 20, 2026",
    readTime: "6 min",
    category: "Conversion",
  },
  {
    title: "Why Speed Matters More Than Design",
    excerpt: "How page load time impacts conversion rates and what you can do about it.",
    date: "May 15, 2026",
    readTime: "4 min",
    category: "Performance",
  },
  {
    title: "Design Systems for Startups",
    excerpt: "Building scalable design systems that grow with your product.",
    date: "May 10, 2026",
    readTime: "8 min",
    category: "Design",
  },
] as const;

export function Blog() {
  return (
    <section id="blog" className="border-y border-[var(--border-subtle)] py-20 sm:py-28">
      <div className="section-shell">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow">Insights</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              From the blog
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <a
              href="#blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition hover:gap-3"
            >
              View all articles
              <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.title} delay={index * 0.1}>
              <article className="glass-card group h-full rounded-2xl p-6 transition-all duration-300 hover:border-[var(--border-glow)]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold leading-snug tracking-tight group-hover:text-[var(--accent)] transition">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
