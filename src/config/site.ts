/**
 * ASTRA — public site configuration.
 * Fill PENDING values before launch. Never put private secrets here.
 *
 * i18n: content lives under `defaultLocale`. Future locales (en, fr)
 * can mirror the same keys without changing component APIs.
 */

export const defaultLocale = "es" as const;
export type Locale = typeof defaultLocale | "en" | "fr";

/** Digits only, country code included. Example: "15551234567" */
export const WHATSAPP_NUMBER =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_WHATSAPP_NUMBER) ||
  "573006868841";

export const INSTAGRAM_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_INSTAGRAM_URL) ||
  "https://www.instagram.com/astra_ads_/";

export const META_PIXEL_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_META_PIXEL_ID) ||
  "PENDIENTE";

export const GOOGLE_ANALYTICS_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GOOGLE_ANALYTICS_ID) ||
  "PENDIENTE";

export const GOOGLE_TAG_MANAGER_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GOOGLE_TAG_MANAGER_ID) ||
  "PENDIENTE";

export const SITE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  "https://astra.studio";

export const WHATSAPP_MESSAGES = {
  general: "Hola ASTRA 👋 Quiero conocer cómo pueden ayudarme con mi negocio.",
  web: "Hola ASTRA 👋 Estoy interesado en crear un sitio web para mi negocio.",
  meta_ads: "Hola ASTRA 👋 Quiero conocer cómo pueden ayudarme con Meta Ads.",
  saas: "Hola ASTRA 👋 Quiero desarrollar una aplicación SaaS / solución digital para mi negocio.",
  digitalization: "Hola ASTRA 👋 Quiero hablar sobre cómo digitalizar mi negocio.",
  project: "Hola ASTRA 👋 Quiero hablar sobre mi proyecto.",
} as const;

export type WhatsAppIntent = keyof typeof WHATSAPP_MESSAGES;

export function isConfigured(value: string) {
  return Boolean(value) && value !== "PENDIENTE";
}

export function getWhatsAppUrl(intent: WhatsAppIntent = "general") {
  if (!isConfigured(WHATSAPP_NUMBER)) return "#cta";
  const text = WHATSAPP_MESSAGES[intent];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppUrlWithCustomMessage(message: string) {
  if (!isConfigured(WHATSAPP_NUMBER)) return "#cta";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getInstagramUrl() {
  if (!isConfigured(INSTAGRAM_URL)) return "#";
  return INSTAGRAM_URL;
}

export const SEO = {
  title: "ASTRA | Tecnología, Web, Meta Ads y SaaS para empresas",
  description:
    "Partner tecnológico global. Ayudamos a empresas y negocios de habla hispana a crecer y digitalizarse con sitios web, Meta Ads, estrategia digital y aplicaciones SaaS.",
  keywords: [
    "sitios web",
    "Meta Ads",
    "agencia digital global",
    "desarrollo SaaS",
    "aplicaciones SaaS para empresas",
    "landing pages",
    "marketing digital",
    "digitalización empresarial",
  ],
} as const;

export const BRAND = {
  name: "ASTRA",
  tagline: "Partner tecnológico y estratégico",
  microcopy: "WEB · META ADS · SAAS · ESTRATEGIA",
  market: "Global",
  language: "es",
} as const;

/** Public company identification for legal pages */
export const LEGAL = {
  brand: "ASTRA",
  country: "Colombia",
  nit: "1033815533-3",
  whatsappDisplay: "+57 300 686 8841",
  updatedAt: "31 de julio de 2026",
} as const;
