export const GA_MEASUREMENT_ID = "G-L3JWPV80TQ";

/**
 * Custom event tracking helper for Google Analytics (GA4)
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | null | undefined>
) {
  if (
    typeof window !== "undefined" &&
    typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function"
  ) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", action, params);
  }
}
