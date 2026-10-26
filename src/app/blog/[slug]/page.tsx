import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/content/blog";
import Button from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Streamline Digital Solutions",
    };
  }

  const siteUrl = "https://streamlinedigitalsolutions.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.metaTitle}`,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: postUrl,
      type: "article",
      publishedTime: new Date(post.publishDate).toISOString(),
      authors: [post.author.name],
      tags: post.keywords,
      siteName: "Streamline Digital Solutions",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
    return null;
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Schema.org Structured Data: BlogPosting & BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://streamlinedigitalsolutions.com/blog/${post.slug}#article`,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://streamlinedigitalsolutions.com/#website",
          name: "Streamline Digital Solutions",
          url: "https://streamlinedigitalsolutions.com",
        },
        headline: post.title,
        description: post.metaDescription,
        datePublished: new Date(post.publishDate).toISOString(),
        dateModified: new Date(post.publishDate).toISOString(),
        mainEntityOfPage: `https://streamlinedigitalsolutions.com/blog/${post.slug}`,
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          "@type": "Organization",
          name: "Streamline Digital Solutions",
          url: "https://streamlinedigitalsolutions.com",
          logo: {
            "@type": "ImageObject",
            url: "https://streamlinedigitalsolutions.com/logo.svg",
          },
        },
        keywords: post.keywords.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://streamlinedigitalsolutions.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://streamlinedigitalsolutions.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://streamlinedigitalsolutions.com/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Schema.org Injected */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============================================================
          ARTICLE HERO HEADER (Dark Theme)
          ============================================================ */}
      <section data-theme="dark" className="bg-ink text-paper pt-32 pb-16 md:pt-40 md:pb-24 border-b border-paper/10">
        <div className="grid-container max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-mono text-paper/50 mb-8">
            <Link href="/" className="hover:text-accent transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-accent transition-colors">
              BLOG
            </Link>
            <span>/</span>
            <span className="text-accent truncate max-w-[200px] sm:max-w-none">
              {post.category}
            </span>
          </nav>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/30 font-semibold tracking-wider">
              {post.category}
            </span>
            <span className="text-paper/60">{post.publishDate}</span>
            <span className="text-paper/30">•</span>
            <span className="text-paper/60">{post.readTime}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12] mb-6">
            {post.title}
          </h1>

          {/* Lead excerpt */}
          <p className="text-lg sm:text-xl text-paper/70 leading-relaxed font-light mb-8">
            {post.excerpt}
          </p>

          {/* Target keywords badge strip */}
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-paper/10">
            <span className="font-mono text-xs text-paper/40 mr-1">TOPICS:</span>
            {post.keywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded text-xs font-mono bg-paper/[0.04] border border-paper/10 text-paper/70"
              >
                #{kw}
              </span>
            ))}
          </div>

          {/* Author info */}
          <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-paper/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-sm font-semibold text-accent">
                B
              </div>
              <div>
                <p className="text-sm font-medium text-paper">{post.author.name}</p>
                <p className="text-xs text-paper/50 font-mono">{post.author.role}</p>
              </div>
            </div>

            <Link
              href="/blog"
              className="text-xs font-sans font-semibold tracking-wider uppercase text-paper/60 hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <span>&larr;</span>
              <span>All Articles</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          ARTICLE BODY & TAKEAWAYS (Light Theme)
          ============================================================ */}
      <section data-theme="light" className="bg-paper text-ink py-16 md:py-24">
        <div className="grid-container max-w-4xl mx-auto">
          {/* Executive Summary / Key Takeaways Box */}
          <div className="p-8 sm:p-10 rounded-2xl bg-card border-2 border-accent/30 shadow-sm mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <h2 className="font-mono text-xs text-accent-ink font-semibold tracking-wider uppercase">
                EXECUTIVE SUMMARY & KEY TAKEAWAYS
              </h2>
            </div>
            <ul className="space-y-3">
              {post.takeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold text-accent-ink mt-1 flex-shrink-0">
                    [0{i + 1}]
                  </span>
                  <p className="text-sm sm:text-base text-grey-700 leading-relaxed font-medium">
                    {takeaway}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <article className="space-y-14">
            {post.content.map((sec, idx) => (
              <section key={idx} className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-ink border-b border-ink/10 pb-3">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base sm:text-lg text-grey-700 leading-relaxed font-normal"
                  >
                    {p}
                  </p>
                ))}

                {/* Callout Quote */}
                {sec.callout && (
                  <div className="my-8 p-6 sm:p-8 rounded-xl bg-ink/5 border-l-4 border-accent">
                    <blockquote className="text-lg sm:text-xl font-medium text-ink italic leading-relaxed">
                      &ldquo;{sec.callout.quote}&rdquo;
                    </blockquote>
                    {sec.callout.source && (
                      <p className="mt-3 text-xs font-mono text-accent-ink font-semibold tracking-wider uppercase">
                        — {sec.callout.source}
                      </p>
                    )}
                  </div>
                )}

                {/* Bullets */}
                {sec.bullets && (
                  <ul className="my-6 space-y-3 bg-card p-6 rounded-xl border border-ink/5">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-grey-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="font-medium">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          {/* Author Signature & Handoff Card */}
          <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-base font-semibold">
                B
              </div>
              <div>
                <p className="font-medium text-ink">{post.author.name}</p>
                <p className="text-xs text-grey-500 font-mono">
                  {post.author.role} at Streamline Digital Solutions
                </p>
              </div>
            </div>

            <Link
              href={BOOKING_URL}
              className="inline-flex items-center gap-2 font-sans font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-lg bg-ink text-paper hover:bg-accent-ink transition-colors"
            >
              <span>Discuss Your Architecture</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          RELATED PLAYBOOKS (Light Theme Secondary)
          ============================================================ */}
      <section data-theme="light" className="bg-card text-ink py-16 md:py-24 border-t border-ink/10">
        <div className="grid-container max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="font-mono text-xs text-accent-ink font-semibold tracking-wider uppercase block mb-1">
                RECOMMENDED READING
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
                Related technical playbooks.
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-sans font-semibold text-xs tracking-wider uppercase text-grey-500 hover:text-ink transition-colors"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((r) => (
              <article
                key={r.slug}
                className="p-6 rounded-xl bg-paper border border-ink/10 hover:border-accent transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-grey-500 mb-2">
                    <span className="text-accent-ink font-semibold">{r.category}</span>
                    <span>•</span>
                    <span>{r.readTime}</span>
                  </div>
                  <Link href={`/blog/${r.slug}`}>
                    <h3 className="text-lg font-medium tracking-tight group-hover:text-accent-ink transition-colors leading-snug mb-2">
                      {r.title}
                    </h3>
                  </Link>
                  <p className="text-grey-700 text-xs line-clamp-2 leading-relaxed">
                    {r.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-ink/5">
                  <Link
                    href={`/blog/${r.slug}`}
                    className="font-sans font-semibold text-xs tracking-wider uppercase text-accent-ink group-hover:text-accent transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read playbook</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          BOTTOM HIGH-CONVERTING CTA (Dark Theme)
          ============================================================ */}
      <section data-theme="dark" className="bg-ink text-paper py-24 md:py-32 border-t border-paper/10 text-center">
        <div className="grid-container max-w-3xl mx-auto">
          <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase block mb-3">
            ACCELERATE YOUR GROWTH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            Ready to scale your store with verified systems?
          </h2>
          <p className="mt-6 text-paper/70 text-base md:text-lg leading-relaxed font-light">
            Book a 15-minute diagnostic call. We review your current funnel, diagnose growth bottlenecks, and map out a clear roadmap.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Button href={BOOKING_URL} label="BOOK A 15-MIN GROWTH CALL" />
            <Link
              href="/services"
              className="px-6 py-3.5 rounded-lg border border-paper/20 hover:border-accent text-xs font-sans font-semibold tracking-wider uppercase text-paper/80 hover:text-accent transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
