# Streamline Digital Solutions — Official Website

> **The Ecommerce Growth Engine.**  
> Built in Cape Town, scaling online stores worldwide. We build, market and automate ecommerce brands with senior strategy and AI-accelerated delivery.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org) with React 19 & Turbopack
- **Language:** TypeScript (strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with bespoke design tokens and CSS custom variables
- **Motion & Smooth Scroll:** [GSAP](https://greensock.com) & ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) smooth scrolling
- **Canvas Visuals:** HTML5 2D Canvas dot-matrix particle field and animated ASCII data ticker
- **Database & Auth:** [Supabase](https://supabase.com) (PostgreSQL tables: `leads`, `subscribers` with RLS)
- **Email Delivery:** [Resend API](https://resend.com)
- **Validation:** [Zod](https://zod.dev) schema validation
- **Deployment:** [Vercel](https://vercel.com)

---

## 🎨 Brand Design Tokens

| Token | Hex / Value | Usage |
|---|---|---|
| **Accent** | `#01CED1` | Streamline Teal (fills, active badges, text on dark) |
| **Accent-Ink** | `#00737A` | Deep Teal (accent text on light paper backgrounds for WCAG AA compliance) |
| **Accent Hover** | `#00B5B8` | Interactive hover states |
| **Ink** | `#0B0F10` | Deep rich black / dark background |
| **Paper** | `#EFF2F2` | Clean neutral light surface |
| **Card** | `#F8FAFA` | Elevated card background |
| **Display / Body** | `General Sans` | Fontshare typography self-hosted |
| **Labels / Monospace** | `JetBrains Mono` | Uppercase eyebrow labels, metrics, code stamps |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20.9.0 or higher
- npm 9+ or pnpm 8+

### 2. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

Populate the variables:
```ini
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx

# Public config
NEXT_PUBLIC_CONTACT_EMAIL=brent@streamlinedigitalsolutions.com
NEXT_PUBLIC_CONTACT_PHONE="+27 67 549 9364"
NEXT_PUBLIC_BOOKING_URL=https://calendly.com/streamline-digital
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Database Migration
Run the SQL script located in `supabase/schema.sql` inside your Supabase project's SQL editor to provision the `leads` and `subscribers` tables with Row Level Security enabled.

### 4. Running Locally
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Production Build & Validation

```bash
npm run build
```
Generates an optimized static and SSR bundle with zero TypeScript warnings or errors.

---

## 🚢 Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the project into your Vercel Dashboard.
3. Configure the environment variables matching `.env.example`.
4. Deploy with standard Next.js defaults.

---

---

## 🤖 Automated Daily SEO Blog Engine

The site includes an autonomous daily SEO content generation and publishing pipeline powered by Anthropic Claude:

- **Schedule**: Automatically runs every morning at 06:00 UTC via GitHub Actions (`.github/workflows/daily-seo-blog.yml`).
- **Topic Queue**: Selects the next unwritten commercial SEO topic from `scripts/seo-topic-queue.ts`.
- **Validation**: Enforces strict Zod schema compliance for rich technical structures (benchmarks, takeaways, callouts, and conversion CTAs).
- **Auto-Publish**: Automatically commits new articles to `src/content/blog.ts`, updates `public/llms.txt`, and pushes to `main` for instant Cloudflare deployment.

### Setup Instructions
1. In your GitHub repository, navigate to **Settings** → **Secrets and variables** → **Actions**.
2. Click **New repository secret**.
3. Name: `ANTHROPIC_API_KEY`
4. Value: Your Anthropic API key (`sk-ant-...`).
5. (Optional) Run manually anytime by clicking **Actions** → **Daily Automated SEO Blog Publisher** → **Run workflow**.

### Running Locally
```bash
# Preview generation without committing
ANTHROPIC_API_KEY="sk-ant-..." npm run blog:dry-run

# Generate and publish today's post locally
ANTHROPIC_API_KEY="sk-ant-..." npm run blog:generate
```

---

## ⌨️ Easter Eggs & Controls
- Press **Cmd + G** (or **Ctrl + G**) anywhere on the site to toggle the agency 12-column alignment grid.

