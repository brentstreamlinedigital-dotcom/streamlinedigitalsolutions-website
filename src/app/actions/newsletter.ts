"use server";

import { z } from "zod";

const newsletterSchema = z.object({
  name: z.string().optional().or(z.literal("")),
  email: z.string().email("Valid email required"),
});

export async function subscribeNewsletter(name: string, email: string) {
  try {
    const parsed = newsletterSchema.safeParse({ name, email });
    if (!parsed.success) {
      return { success: false, error: "Please enter a valid email address." };
    }

    let delivered = false;

    // 1. Store in Supabase if configured
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey && supabaseUrl !== "your_supabase_project_url") {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/subscribers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "resolution=merge-duplicates",
          },
          body: JSON.stringify({
            name: parsed.data.name || null,
            email: parsed.data.email,
          }),
        });

        if (res.ok) {
          delivered = true;
        }
      } catch {
        // Fall through
      }
    }

    // 2. Send email notification via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "brent@streamlinedigitalsolutions.com";

    if (resendApiKey && resendApiKey !== "your_resend_api_key") {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Streamline Newsletter <newsletter@streamlinedigitalsolutions.com>",
            to: [contactEmail],
            subject: `New Newsletter Subscriber: ${parsed.data.name || "Subscriber"} (${parsed.data.email})`,
            text: `A new user joined the newsletter list:\n\nName: ${parsed.data.name || "N/A"}\nEmail: ${parsed.data.email}\nDate: ${new Date().toISOString()}`,
          }),
        });

        if (emailRes.ok) {
          delivered = true;
        }
      } catch {
        // Fall through
      }
    }

    if (delivered) {
      return { success: true };
    }

    // If neither backend is configured, return actionable error
    return {
      success: false,
      error: `Subscription service is currently undergoing setup. Please email us directly at ${contactEmail}.`,
    };
  } catch {
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}
