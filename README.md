# AgencyX — AI SaaS Launch Studio Landing Page

A polished AI/SaaS agency landing page built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Prisma, and PostgreSQL. The visual direction blends Exa-inspired technical clarity, Runlayer-style dark control-plane sections, and Langbase-style bento product storytelling. AgencyX is a fictional brand used for portfolio demonstration only.

## Live Demo

Not deployed yet. Add the Vercel URL here after importing the project and configuring `DATABASE_URL`.

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Prisma Client
- PostgreSQL / Vercel Postgres
- Zod validation
- Playwright
- Vercel-ready configuration

## Features

- Exa-inspired light technical SaaS hero with AI command-center visual
- Plus Jakarta Sans typography for readable, bold interface text
- Smooth-scroll navigation with responsive mobile menu
- Langbase-style bento feature cards
- Runlayer-inspired dark trust/control-plane narrative section
- Pricing table with monthly/yearly billing toggle
- Testimonials carousel with accessible controls
- FAQ accordion with accessible expanded state
- Waitlist form with client-side validation and Prisma-backed persistence
- Contact form with Zod validation and API route
- Dummy resource/blog cards
- Reduced-motion-safe scroll reveal animations
- Fully responsive mobile, tablet, and desktop layout

## Run Locally

```bash
npm install
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env` from `.env.example` and provide a PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
```

The waitlist API returns validation errors without a database connection. Successful persistence requires a valid `DATABASE_URL`.

## Prisma Commands

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
```

For Vercel Postgres, set the production `DATABASE_URL` in the Vercel project settings before deploying.

## Scripts

```bash
npm run dev          # Start local development server
npm run lint         # Run Next.js ESLint checks
npm run typecheck    # Run TypeScript without emitting files
npm run build        # Create production build
npm run start        # Start production server
npm run test:e2e     # Run Playwright end-to-end tests
```

## Deployment Notes

1. Create or connect a PostgreSQL database.
2. Set `DATABASE_URL` locally and in Vercel environment variables.
3. Run `npx prisma migrate dev --name init` locally or apply migrations through your deployment workflow.
4. Run `npm run build` before deployment.
5. Import the repository into Vercel and deploy.

No real client names, customer data, screenshots, or live URLs are included in this repository.
