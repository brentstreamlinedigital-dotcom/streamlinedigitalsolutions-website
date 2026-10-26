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
          return { success: true };
        }
      } catch {
        // Fall through to error
      }
    }

    // If Supabase is unconfigured, return actionable message
    return {
      success: false,
      error: "Subscription service is currently undergoing setup. Please email us directly.",
    };
  } catch {
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}
