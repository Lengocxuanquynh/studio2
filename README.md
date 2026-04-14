
## Ivy Bridal - Next.js SEO Platform

This project has been migrated to **Next.js App Router** with a hybrid rendering strategy:

- **SSR**: admin dashboard and private/authenticated modules.
- **SSG/ISR**: post details, category pages, and SEO landing routes.
- **Cloudinary**: signed upload flow for media assets.
- **Neon + Prisma**: PostgreSQL data layer with production-ready schema.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Start dev server:

```bash
npm run dev
```

## Key Routes

- `/` and `/admin`: admin experience
- `/auth/[id]`, `/gallery/[id]`: user protected gallery flow
- `/posts`, `/posts/[slug]`, `/category/[slug]`, `/search`: SEO content surfaces
- `/admin/posts`, `/admin/media`, `/admin/users`, `/admin/seo`: admin modules

## Technical SEO

- Dynamic metadata per page via App Router metadata API
- `sitemap.xml` generated from `src/app/sitemap.ts`
- `robots.txt` generated from `src/app/robots.ts`
- Article JSON-LD in post detail pages
  