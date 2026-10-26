import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
export interface SeoTopic {
  id: string;
  title: string;
  slug: string;
  category: "ARCHITECTURE" | "CRO & CONVERSION" | "AI & AUTOMATION";
  targetKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  keyAngles: string[];
  ctaAngle: string;
}

const TOPIC_QUEUE_PATH = path.resolve(process.cwd(), "scripts/seo-topic-queue.json");
const SEO_TOPIC_QUEUE: SeoTopic[] = JSON.parse(fs.readFileSync(TOPIC_QUEUE_PATH, "utf-8"));

// 1. Zod Schema strictly matching BlogPost type
const BlogPostSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(10),
  excerpt: z.string().min(50),
  category: z.enum(["ARCHITECTURE", "CRO & CONVERSION", "AI & AUTOMATION"]),
  publishDate: z.string().min(6),
  readTime: z.string().min(4),
  author: z.object({
    name: z.string(),
    role: z.string(),
  }),
  featured: z.boolean().default(false),
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(50),
  keywords: z.array(z.string()).min(3),
  takeaways: z.array(z.string()).min(3),
  content: z.array(
    z.object({
      heading: z.string().min(5),
      paragraphs: z.array(z.string()).min(1),
      callout: z
        .object({
          quote: z.string(),
          source: z.string().optional(),
        })
        .optional(),
      bullets: z.array(z.string()).optional(),
    })
  ).min(3),
});

type BlogPost = z.infer<typeof BlogPostSchema>;

const BLOG_FILE_PATH = path.resolve(process.cwd(), "src/content/blog.ts");
const LLMS_FILE_PATH = path.resolve(process.cwd(), "public/llms.txt");

function getTodayFormatted(): string {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getExistingSlugs(): Set<string> {
  if (!fs.existsSync(BLOG_FILE_PATH)) return new Set();
  const fileContent = fs.readFileSync(BLOG_FILE_PATH, "utf-8");
  const slugMatches = fileContent.matchAll(/slug:\s*"([^"]+)"/g);
  const slugs = new Set<string>();
  for (const match of slugMatches) {
    if (match[1]) slugs.add(match[1]);
  }
  return slugs;
}

function selectNextTopic(existingSlugs: Set<string>, specifiedTopicId?: string): SeoTopic {
  if (specifiedTopicId) {
    const found = SEO_TOPIC_QUEUE.find((t) => t.id === specifiedTopicId || t.slug === specifiedTopicId);
    if (found) return found;
    console.warn(`[WARN] Specified topic "${specifiedTopicId}" not found in queue. Falling back to automatic selection.`);
  }

  const nextAvailable = SEO_TOPIC_QUEUE.find((t) => !existingSlugs.has(t.slug));
  if (nextAvailable) return nextAvailable;

  // Fallback: If all static queue topics have been published, pick the oldest or create a dynamic variation
  const fallback = SEO_TOPIC_QUEUE[0];
  const dateSuffix = new Date().toISOString().slice(0, 10);
  return {
    ...fallback,
    id: `${fallback.id}-${dateSuffix}`,
    slug: `${fallback.slug}-${dateSuffix}`,
    title: `${fallback.title} (Updated Edition)`,
  };
}

async function callAnthropicForPost(topic: SeoTopic, apiKey: string): Promise<BlogPost> {
  const today = getTodayFormatted();
  const model = process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-20241022";

  const systemPrompt = `You are Brent Mortimer, Founder & Technical Director at Streamline Digital Solutions (https://streamlinedigitalsolutions.com).
Streamline is a digital agency in Cape Town scaling DTC ecommerce brands worldwide through high-performance Shopify engineering, CRO frameworks, and autonomous AI workflows.

YOUR MISSION:
Write an authoritative, industry-grade technical SEO blog post for our Insights section.

EDITORIAL STANDARDS:
- Tone: Direct, engineering-led, analytical, and deeply practical. Zero corporate jargon or generic fluff.
- Back every claim with realistic performance metrics, Core Web Vitals figures, or conversion data.
- Structure:
  1. Compelling 7-8 word title targeted at: "${topic.targetKeyword}"
  2. 4 executive-level bullet takeaways for DTC founders & CTOs.
  3. 4-5 deep technical sections with real code patterns, architectural benchmarks, and counter-intuitive lessons.
  4. Contextual callout quotes emphasizing Streamline's technical standards.
  5. Actionable conversion-focused conclusions.

STRICT JSON OUTPUT REQUIREMENT:
Return ONLY a valid JSON object matching this schema (no backticks, no markdown fence, no preamble):
{
  "slug": "${topic.slug}",
  "title": "${topic.title}",
  "excerpt": "A 2-3 sentence teaser detailing what operators will learn and the revenue/speed impact.",
  "category": "${topic.category}",
  "publishDate": "${today}",
  "readTime": "6 min read",
  "author": {
    "name": "Brent",
    "role": "Founder & Technical Director"
  },
  "featured": false,
  "metaTitle": "Title under 60 chars | Streamline",
  "metaDescription": "Action-oriented meta description under 155 chars including primary keywords.",
  "keywords": ${JSON.stringify([topic.targetKeyword, ...topic.secondaryKeywords])},
  "takeaways": [
    "Key takeaway 1 with specific metric or architecture decision",
    "Key takeaway 2 with specific metric or architecture decision",
    "Key takeaway 3 with specific metric or architecture decision",
    "Key takeaway 4 with specific metric or architecture decision"
  ],
  "content": [
    {
      "heading": "1. Section Heading",
      "paragraphs": [
        "Paragraph 1...",
        "Paragraph 2..."
      ],
      "callout": {
        "quote": "Memorable technical quote",
        "source": "Streamline Technical Standards"
      },
      "bullets": [
        "Benchmark item 1",
        "Benchmark item 2",
        "Benchmark item 3"
      ]
    }
  ]
}`;

  const userMessage = `Write today's technical SEO article based on this topic specification:
Target Keyword: ${topic.targetKeyword}
Secondary Keywords: ${topic.secondaryKeywords.join(", ")}
Target Audience Intent: ${topic.intent}
Key Angles to Cover:
${topic.keyAngles.map((a) => `- ${a}`).join("\n")}
Contextual Conversion CTA: ${topic.ctaAngle}

Produce the full article in pure JSON now.`;

  console.log(`[INFO] Calling Anthropic API (${model}) for topic: "${topic.title}"...`);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      temperature: 0.65,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API responded with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.content?.[0]?.text;

  if (!rawText) {
    throw new Error("No text content received from Anthropic API.");
  }

  // Sanitize any accidental markdown formatting or surrounding whitespace
  const sanitized = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(sanitized);
  } catch (err) {
    console.error("[ERROR] Failed to parse JSON from Claude response:", rawText.slice(0, 300));
    throw err;
  }

  // Validate with Zod
  const validation = BlogPostSchema.safeParse(parsedJson);
  if (!validation.success) {
    console.error("[ERROR] Zod Schema Validation Failed:", JSON.stringify(validation.error.format(), null, 2));
    throw new Error("Generated post does not match BlogPost schema requirements.");
  }

  return validation.data;
}

function prependPostToFile(newPost: BlogPost) {
  const currentContent = fs.readFileSync(BLOG_FILE_PATH, "utf-8");

  // Locate the export const blogPosts: BlogPost[] = [
  const targetPrefix = "export const blogPosts: BlogPost[] = [";
  const targetIndex = currentContent.indexOf(targetPrefix);

  if (targetIndex === -1) {
    throw new Error(`Could not locate "${targetPrefix}" in ${BLOG_FILE_PATH}`);
  }

  const insertPosition = targetIndex + targetPrefix.length;
  const postFormatted = `\n  ${JSON.stringify(newPost, null, 2).replace(/\n/g, "\n  ")},`;

  const updatedContent =
    currentContent.slice(0, insertPosition) +
    postFormatted +
    currentContent.slice(insertPosition);

  fs.writeFileSync(BLOG_FILE_PATH, updatedContent, "utf-8");
  console.log(`[SUCCESS] New post "${newPost.title}" successfully prepended to ${BLOG_FILE_PATH}`);
}

function updateLlmsManifest(newPost: BlogPost) {
  if (!fs.existsSync(LLMS_FILE_PATH)) return;
  const currentLlms = fs.readFileSync(LLMS_FILE_PATH, "utf-8");

  const newEntry = `- [${newPost.title}](https://streamlinedigitalsolutions.com/blog/${newPost.slug}): ${newPost.excerpt}\n`;

  // Insert under "## Technical Insights & Architecture Guides" if present
  const sectionHeader = "## Technical Insights & Architecture Guides\n";
  if (currentLlms.includes(sectionHeader)) {
    const updated = currentLlms.replace(sectionHeader, `${sectionHeader}${newEntry}`);
    fs.writeFileSync(LLMS_FILE_PATH, updated, "utf-8");
    console.log(`[SUCCESS] Appended new post to ${LLMS_FILE_PATH} for AI search indexation.`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const topicIdArgIndex = args.indexOf("--topic");
  const specifiedTopicId = topicIdArgIndex !== -1 ? args[topicIdArgIndex + 1] : undefined;

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error(`[ERROR] ANTHROPIC_API_KEY environment variable is required.`);
    console.log(`Usage: ANTHROPIC_API_KEY="sk-ant-..." node --experimental-strip-types scripts/generate-daily-post.ts [--dry-run] [--topic <id>]`);
    process.exit(1);
  }

  const existingSlugs = getExistingSlugs();
  console.log(`[INFO] Found ${existingSlugs.size} existing blog posts in codebase.`);

  const topic = selectNextTopic(existingSlugs, specifiedTopicId);
  console.log(`[INFO] Selected next SEO topic: [${topic.category}] "${topic.title}" (slug: ${topic.slug})`);

  try {
    const newPost = await callAnthropicForPost(topic, apiKey);
    console.log(`[INFO] Article generated successfully. Read time: ${newPost.readTime}. Word count approx: ${JSON.stringify(newPost).length / 5} words.`);

    if (isDryRun) {
      console.log(`[DRY RUN] Skipping file write. Post preview:`);
      console.log(JSON.stringify(newPost, null, 2));
      return;
    }

    prependPostToFile(newPost);
    updateLlmsManifest(newPost);
    console.log(`[DONE] Daily SEO blog post published successfully: /blog/${newPost.slug}`);
  } catch (err) {
    console.error(`[FATAL] Blog generation failed:`, err);
    process.exit(1);
  }
}

main();
