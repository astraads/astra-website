/**
 * Client-side conversion helpers.
 * Public analytics IDs only — never send PII to third parties from here.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type TrackEvent =
  | "whatsapp_click"
  | "instagram_click"
  | "lead_form_submit"
  | "cta_click"
  | "service_select";

export function trackEvent(
  name: TrackEvent,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;

  const safe = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  );

  window.dataLayer?.push({ event: name, ...safe });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, safe);
  }

  if (typeof window.fbq === "function") {
    if (name === "lead_form_submit" || name === "whatsapp_click") {
      window.fbq("track", "Contact", { content_name: name, ...safe });
    } else {
      window.fbq("trackCustom", name, safe);
    }
  }
}
