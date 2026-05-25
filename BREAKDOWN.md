# Proyek #1: Modern SaaS/Agency Landing Page

> **Urutan:** #1 — Paling cepat, bisa deploy ke Vercel hari ini
> **Estimasi:** 1-2 minggu
> **Tujuan:** Menunjukkan modern frontend stack (Next.js 14, TypeScript, Framer Motion)

---

## Tech Stack

| Layer | Tech | Badge |
|---|---|---|
| Framework | Next.js 14 (App Router) | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) |
| Language | TypeScript | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) |
| Styling | Tailwind CSS | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white) |
| Animation | Framer Motion | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) |
| Icons | Lucide React | — |
| Database | Prisma + Vercel Postgres | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) |
| Deploy | Vercel | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |

---

## Fitur List

### Must-Have (MVP — minggu 1)
- [ ] Hero section dengan typing animation / text reveal
- [ ] 3-4 feature cards dengan icon + deskripsi
- [ ] Pricing table (3 tier: Free / Pro / Enterprise)
- [ ] Toggle monthly / yearly pricing
- [ ] Waitlist form (nama + email) → simpan ke database
- [ ] Navigation bar dengan smooth scroll ke section
- [ ] Footer dengan links + social
- [ ] Dark mode / light mode toggle
- [ ] Fully responsive (mobile + tablet + desktop)

### Nice-to-Have (minggu 2)
- [ ] Testimonials carousel
- [ ] FAQ accordion
- [ ] Scroll-triggered animations (Framer Motion whileInView)
- [ ] Counter animation (jumlah user, proyek, dll)
- [ ] Contact form dengan validation (Zod)
- [ ] Blog section (3 dummy posts)

---

## Task Breakdown

### Phase 1: Setup & Scaffold (Hari 1)
- [ ] `npx create-next-app@latest` dengan TypeScript + Tailwind + App Router
- [ ] Install dependencies: `framer-motion`, `lucide-react`, `prisma`, `@prisma/client`
- [ ] Setup folder structure (lihat di bawah)
- [ ] Setup Tailwind config (warna custom, dark mode)
- [ ] Setup Prisma schema (model Waitlist)
- [ ] Push ke GitHub repo (repo publik)
- [ ] Deploy skeleton ke Vercel (biar ada URL live)

### Phase 2: Core Sections (Hari 2-4)
- [ ] Navbar component (responsive + dark mode toggle)
- [ ] Hero section (headline + subheadline + CTA button + animation)
- [ ] Features section (3-4 cards dengan icon)
- [ ] Pricing section (3 cards + toggle monthly/yearly)
- [ ] Waitlist form (UI + Prisma integration + API route)
- [ ] Footer component

### Phase 3: Polish & Animation (Hari 5-7)
- [ ] Framer Motion: fade-in on scroll untuk setiap section
- [ ] Hero text reveal animation
- [ ] Pricing card hover effect
- [ ] Dark mode toggle persist (localStorage)
- [ ] Mobile responsive fix
- [ ] Performance check (Lighthouse > 90)

### Phase 4: README & Showcase (Hari 8-10)
- [ ] Screenshot desktop + mobile
- [ ] Tulis README profesional (template di bawah)
- [ ] Record GIF demo (optional)
- [ ] Update Vercel deployment
- [ ] Pin repo di profil GitHub
- [ ] Share di LinkedIn

---

## Folder Structure

```
01-nextjs-landing-page/
├── app/
│   ├── layout.tsx          ← Root layout dengan dark mode provider
│   ├── page.tsx             ← Landing page (gabung semua section)
│   ├── globals.css          ← Tailwind directives + custom styles
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts     ← API endpoint POST waitlist
│   └── sections/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── Pricing.tsx
│       ├── Waitlist.tsx
│       ├── Testimonials.tsx  ← optional
│       └── Footer.tsx
├── components/
│   ├── ui/                  ← reusable components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Toggle.tsx       ← dark mode / pricing toggle
│   └── motion/              ← Framer Motion wrappers
│       └── FadeIn.tsx
├── lib/
│   ├── prisma.ts            ← Prisma client singleton
│   └── utils.ts             ← helper functions
├── prisma/
│   └── schema.prisma        ← Waitlist model
├── public/
│   └── images/              ← screenshot, logo dummy
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md                ← WAJIB lengkap
```

---

## Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Waitlist {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  plan      String   // "free" | "pro" | "enterprise"
  createdAt DateTime @default(now())
}
```

---

## GitHub README Template

```markdown
# AgencyX — Modern SaaS Landing Page

A modern, animated landing page built with Next.js 14, TypeScript, and Framer Motion. 
Features dark mode, pricing toggle, and waitlist form with database persistence.

![screenshot](public/images/screenshot.png)

## Live Demo
[agencyx-demo.vercel.app](https://agencyx-demo.vercel.app)

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Prisma + PostgreSQL
- Vercel

## Features
- Responsive hero with text reveal animation
- Feature cards with icons
- Pricing table (monthly/yearly toggle)
- Waitlist form (name, email, plan selection)
- Dark / light mode toggle
- Scroll-triggered animations
- Fully responsive

## Run Locally
```bash
git clone https://github.com/mifdlaldev/agencyx-landing.git
cd agencyx-landing
npm install
npx prisma generate
npm run dev
```

## Environment Variables
```
DATABASE_URL="postgresql://..."
```
```

---

## GitHub Profile Impact

| Signal ke HR | Signal ke Client |
|---|---|
| "Paham Next.js App Router" | "Bisa bikin landing page modern" |
| "Bisa TypeScript" | "Bisa animasi smooth" |
| "Bisa deploy ke Vercel" | "Bisa dark mode" |
| "Bisa Prisma + database" | "Bisa form + database" |

---

## Catatan

- **Nama repo:** `agencyx-landing` atau `nextjs-saas-landing`
- **Branding:** AgencyX (fiktif), jangan pakai nama client nyata
- **Data:** Semua dummy — testimonial, nama user, harga, semua fiktif
- **Commit message:** Gunakan conventional commit (`feat:`, `fix:`, `style:`, `docs:`)
- **Target commits:** 10-15 commits

---

*Dibuat: 2026-05-24*
*Target selesai: 2 minggu*
