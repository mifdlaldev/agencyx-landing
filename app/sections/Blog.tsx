"use client";

import { ArrowRight, Calendar, Clock } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";

const posts = [
  {
    title: "How we ship landing pages in 48 hours",
    excerpt:
      "A breakdown of our rapid launch workflow: from positioning brief to responsive page with Framer Motion and Prisma.",
    date: "May 20, 2026",
    readTime: "5 min read",
    tag: "Engineering",
  },
  {
    title: "Pricing experiments that actually convert",
    excerpt:
      "Lessons from running monthly vs yearly billing toggles, anchoring strategies, and enterprise custom-tier negotiations.",
    date: "May 15, 2026",
    readTime: "7 min read",
    tag: "Growth",
  },
  {
    title: "Dark mode design without the mess",
    excerpt:
      "How we keep Tailwind CSS variables clean, accessible, and consistent across both light and dark themes.",
    date: "May 10, 2026",
    readTime: "4 min read",
    tag: "Design",
  },
] as const;

export function Blog() {
  return (
    <section id="blog" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow">Blog</p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.06em] sm:text-5xl">
              Notes from the launch floor
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Dummy blog posts to demonstrate a content section with cards, tags, and metadata.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <a
              href="#blog"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/55 px-5 py-3 text-sm font-bold text-muted transition hover:border-brand hover:text-ink dark:bg-white/[0.06]"
            >
              View all posts
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.title} delay={index * 0.08}>
              <Card interactive className="flex h-full flex-col">
                <div className="mb-5 flex items-center gap-3 text-sm text-muted">
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-brand-ink dark:text-brand">
                    {post.tag}
                  </span>
                </div>
                <h3 className="text-xl font-black tracking-[-0.03em] leading-snug">{post.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-muted">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar aria-hidden="true" size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock aria-hidden="true" size={14} />
                    {post.readTime}
                  </span>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
