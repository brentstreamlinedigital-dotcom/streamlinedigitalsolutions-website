"use server";

import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid work email is required"),
  storeUrl: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  services: z.array(z.string()).default([]),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().min(1, "Please tell us about your goals"),
  honeypot: z.string().max(0, "Bot detected"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactLead(formData: FormData) {
  try {
    const rawData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      storeUrl: formData.get("storeUrl") || "",
      company: formData.get("company") || "",
      services: formData.getAll("services") as string[],
      budget: formData.get("budget") || "",
      message: formData.get("message"),
      honeypot: formData.get("honeypot") || "",
    };

    const parsed = contactSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0];
        if (field) fieldErrors[String(field)] = err.message;
      });
      return { success: false, errors: fieldErrors };
    }

    const { firstName, lastName, email, storeUrl, company, services, budget, message } = parsed.data;

    let delivered = false;
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@streamlinedigitalsolutions.com";

    // 1. Store lead in Supabase if configured
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey && supabaseUrl !== "your_supabase_project_url") {
      try {
        const sbRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            store_url: storeUrl,
            company,
            services,
            budget,
            message,
          }),
        });

        if (sbRes.ok) {
          delivered = true;
        }
      } catch {
        // Log silently
      }
    }

    // 2. Send email via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey && resendApiKey !== "your_resend_api_key") {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Streamline Leads <leads@streamlinedigitalsolutions.com>",
            to: [contactEmail],
            subject: `New Growth Lead: ${firstName} ${lastName} (${company || "Individual"})`,
            text: `
Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company || "N/A"}
Store URL: ${storeUrl || "N/A"}
Budget: ${budget || "N/A"}
Services: ${services.join(", ") || "None specified"}

Message:
${message}
            `.trim(),
          }),
        });

        if (emailRes.ok) {
          delivered = true;
        }
      } catch {
        // Log silently
      }
    }

    if (delivered) {
      return { success: true };
    }

    // If neither backend service is configured or operational, do not pretend it succeeded
    return {
      success: false,
      message: `Direct messaging service is momentarily unconfigured or unavailable. Please email us directly at ${contactEmail}.`,
    };
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again or email us directly.",
    };
  }
}
