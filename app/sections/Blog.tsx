import { ArrowUpRight, CalendarDays } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const posts = [
  {
    title: "What Exa teaches about technical landing pages",
    excerpt: "Use clean hierarchy, technical motifs, and product-like demos to make a marketing page feel like infrastructure.",
    date: "May 25, 2026",
    tag: "Design notes",
  },
  {
    title: "Bento grids for explaining complex services",
    excerpt: "How to turn a broad agency offer into visible systems that clients can understand quickly.",
    date: "May 22, 2026",
    tag: "UX strategy",
  },
  {
    title: "Why forms are portfolio features",
    excerpt: "A beautiful waitlist is stronger when it has validation, API boundaries, database persistence, and tests.",
    date: "May 18, 2026",
    tag: "Engineering",
  },
] as const;

export function Blog() {
  return (
    <section id="blog" className="section-y bg-white/55">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn className="max-w-3xl">
            <p className="pill w-fit border-primary/15 bg-primary/5 text-primary">Resources</p>
            <h2 className="heading-lg mt-5">Notes from the AI launch floor.</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <a href="#blog" className="button-secondary">
              View all writing
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.title} delay={index * 0.06}>
              <article className="bento-card group h-full">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-primary">{post.tag}</span>
                  <ArrowUpRight aria-hidden="true" size={18} className="text-muted-foreground transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                </div>
                <h3 className="mt-8 text-2xl font-extrabold leading-tight tracking-[-0.05em]">{post.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{post.excerpt}</p>
                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <CalendarDays aria-hidden="true" size={16} />
                  {post.date}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
