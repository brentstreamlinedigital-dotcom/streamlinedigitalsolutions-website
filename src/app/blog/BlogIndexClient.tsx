"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";
import Button from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/constants";

interface BlogIndexClientProps {
  initialPosts: BlogPost[];
}

const CATEGORIES = ["ALL", "ARCHITECTURE", "CRO & CONVERSION", "AI & AUTOMATION"] as const;

export default function BlogIndexClient({ initialPosts }: BlogIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredPosts =
    selectedCategory === "ALL"
      ? initialPosts
      : initialPosts.filter((post) => post.category === selectedCategory);

  const featuredPost = initialPosts.find((p) => p.featured) || initialPosts[0];
  const gridPosts =
    selectedCategory === "ALL"
      ? initialPosts.filter((p) => p.slug !== featuredPost.slug)
      : filteredPosts;

  return (
    <>
      {/* ============================================================
          HERO & FEATURED ARTICLE (Dark Theme)
          ============================================================ */}
      <section data-theme="dark" className="bg-ink text-paper pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid-container">
          {/* Eyebrow & Headline */}
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase block mb-4">
              ENGINEERING &amp; GROWTH INSIGHTS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.08]">
              Unfiltered playbooks for scaling stores.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-paper/70 leading-relaxed font-light">
              Architectural teardowns, conversion engineering frameworks, and autonomous AI workflows. Written by operators, verified by client outcomes.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-16 border-b border-paper/10 pb-6">
            <span className="font-mono text-xs text-paper/40 mr-2 uppercase tracking-wider">
              TOPIC:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === "ALL"
                  ? initialPosts.length
                  : initialPosts.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-sans font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-accent text-ink border-accent shadow-sm"
                      : "border-paper/15 text-paper/60 hover:border-accent/50 hover:text-paper bg-paper/[0.02]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Featured Spotlight Card (shown on ALL view) */}
          {selectedCategory === "ALL" && featuredPost && (
            <div className="mb-8">
              <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase block mb-3">
                FEATURED ARTICLE
              </span>
              <div className="p-8 md:p-12 rounded-2xl bg-paper/[0.03] border border-paper/15 hover:border-accent/40 transition-all duration-300 group">
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/30 font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-paper/50">{featuredPost.publishDate}</span>
                  <span className="text-paper/30">•</span>
                  <span className="text-paper/50">{featuredPost.readTime}</span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="block group">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-paper group-hover:text-accent transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-paper/70 text-base md:text-lg leading-relaxed max-w-4xl mb-8">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-paper/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-xs font-semibold text-accent">
                      B
                    </div>
                    <div>
                      <p className="text-xs font-medium text-paper">{featuredPost.author.name}</p>
                      <p className="text-[11px] text-paper/50 font-mono">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 font-sans font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-lg bg-accent text-ink hover:bg-accent-hover transition-colors"
                  >
                    <span>Read playbook</span>
                    <span className="text-sm">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          ARTICLE GRID (Light Theme)
          ============================================================ */}
      <section data-theme="light" className="bg-paper text-ink py-20 md:py-28 border-t border-ink/10">
        <div className="grid-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs text-accent-ink font-semibold tracking-wider uppercase block mb-1">
                ALL PUBLICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">
                {selectedCategory === "ALL" ? "More deep dives." : `${selectedCategory} articles.`}
              </h2>
            </div>
            <p className="text-grey-500 text-sm font-mono">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {gridPosts.map((post) => (
              <article
                key={post.slug}
                className="p-8 rounded-2xl bg-card border border-ink/10 hover:border-accent/60 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-ink/5 text-accent-ink font-semibold border border-ink/10">
                      {post.category}
                    </span>
                    <span className="text-grey-500">{post.publishDate}</span>
                    <span className="text-grey-300">•</span>
                    <span className="text-grey-500">{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-ink group-hover:text-accent-ink transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-grey-700 text-sm md:text-base leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Target keyword pills */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {post.keywords.slice(0, 3).map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-paper border border-ink/10 text-grey-500"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-ink/10 mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-ink/10 flex items-center justify-center font-mono text-xs font-medium text-ink">
                      B
                    </div>
                    <span className="text-xs text-grey-700 font-medium">{post.author.name}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs tracking-wider uppercase text-ink group-hover:text-accent-ink transition-colors"
                  >
                    <span>Read article</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-grey-500 text-lg">No articles found in this category.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className="mt-4 font-sans font-semibold text-xs tracking-wider uppercase text-accent-ink underline hover:text-accent cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          BOTTOM HIGH-CONVERTING CTA (Dark Theme)
          ============================================================ */}
      <section data-theme="dark" className="bg-ink text-paper py-24 md:py-32 border-t border-paper/10 text-center">
        <div className="grid-container max-w-3xl mx-auto">
          <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase block mb-3">
            TAKE ACTION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            Ready to implement these growth frameworks in your store?
          </h2>
          <p className="mt-6 text-paper/70 text-base md:text-lg leading-relaxed font-light">
            Book a 15-minute growth diagnostic. We review your store speed, funnel friction, and automation opportunities, then map out a clear roadmap.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Button href={BOOKING_URL} label="BOOK A 15-MIN GROWTH CALL" />
            <Link
              href="/work"
              className="px-6 py-3.5 rounded-lg border border-paper/20 hover:border-accent text-xs font-sans font-semibold tracking-wider uppercase text-paper/80 hover:text-accent transition-colors"
            >
              Explore Client Results
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
