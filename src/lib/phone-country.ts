/** ISO country → international dialing code (digits only, no +). */
const DIAL_BY_COUNTRY: Record<string, string> = {
  CO: "57",
  MX: "52",
  US: "1",
  CA: "1",
  AR: "54",
  CL: "56",
  PE: "51",
  EC: "593",
  VE: "58",
  BR: "55",
  ES: "34",
  FR: "33",
  DE: "49",
  IT: "39",
  GB: "44",
  PT: "351",
  NL: "31",
  BE: "32",
  CH: "41",
  AT: "43",
  IE: "353",
  PL: "48",
  SE: "46",
  NO: "47",
  DK: "45",
  FI: "358",
  AU: "61",
  NZ: "64",
  JP: "81",
  KR: "82",
  CN: "86",
  IN: "91",
  AE: "971",
  SA: "966",
  IL: "972",
  TR: "90",
  ZA: "27",
  NG: "234",
  EG: "20",
  PA: "507",
  CR: "506",
  GT: "502",
  HN: "504",
  SV: "503",
  NI: "505",
  DO: "1809",
  PR: "1787",
  UY: "598",
  PY: "595",
  BO: "591",
  CU: "53",
  PH: "63",
  SG: "65",
  MY: "60",
  TH: "66",
  ID: "62",
  VN: "84",
  RU: "7",
  UA: "380",
  RO: "40",
  CZ: "420",
  HU: "36",
  GR: "30",
};

/** Timezone → ISO country (best-effort; enough for dial code). */
const TZ_TO_COUNTRY: Record<string, string> = {
  "America/Bogota": "CO",
  "America/Mexico_City": "MX",
  "America/Cancun": "MX",
  "America/Monterrey": "MX",
  "America/Tijuana": "MX",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "America/Lima": "PE",
  "America/Guayaquil": "EC",
  "America/Caracas": "VE",
  "America/Sao_Paulo": "BR",
  "America/Panama": "PA",
  "America/Costa_Rica": "CR",
  "America/Guatemala": "GT",
  "America/El_Salvador": "SV",
  "America/Tegucigalpa": "HN",
  "America/Managua": "NI",
  "America/Santo_Domingo": "DO",
  "America/Puerto_Rico": "PR",
  "America/Montevideo": "UY",
  "America/Asuncion": "PY",
  "America/La_Paz": "BO",
  "Europe/Madrid": "ES",
  "Atlantic/Canary": "ES",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Rome": "IT",
  "Europe/London": "GB",
  "Europe/Lisbon": "PT",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Zurich": "CH",
  "Europe/Vienna": "AT",
  "Europe/Dublin": "IE",
  "Europe/Warsaw": "PL",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK",
  "Europe/Helsinki": "FI",
  "Europe/Athens": "GR",
  "Europe/Bucharest": "RO",
  "Europe/Prague": "CZ",
  "Europe/Budapest": "HU",
  "Europe/Moscow": "RU",
  "Europe/Kyiv": "UA",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Pacific/Auckland": "NZ",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Shanghai": "CN",
  "Asia/Hong_Kong": "CN",
  "Asia/Kolkata": "IN",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Jerusalem": "IL",
  "Asia/Istanbul": "TR",
  "Asia/Singapore": "SG",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Bangkok": "TH",
  "Asia/Jakarta": "ID",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Manila": "PH",
  "Africa/Johannesburg": "ZA",
  "Africa/Lagos": "NG",
  "Africa/Cairo": "EG",
};

export type DialOption = {
  country: string;
  dial: string;
  label: string;
};

/** Compact list for the dial selector (LATAM + main markets first). */
export const DIAL_OPTIONS: DialOption[] = [
  { country: "CO", dial: "57", label: "Colombia +57" },
  { country: "MX", dial: "52", label: "México +52" },
  { country: "US", dial: "1", label: "EE. UU. +1" },
  { country: "CA", dial: "1", label: "Canadá +1" },
  { country: "ES", dial: "34", label: "España +34" },
  { country: "AR", dial: "54", label: "Argentina +54" },
  { country: "CL", dial: "56", label: "Chile +56" },
  { country: "PE", dial: "51", label: "Perú +51" },
  { country: "EC", dial: "593", label: "Ecuador +593" },
  { country: "VE", dial: "58", label: "Venezuela +58" },
  { country: "BR", dial: "55", label: "Brasil +55" },
  { country: "PA", dial: "507", label: "Panamá +507" },
  { country: "CR", dial: "506", label: "Costa Rica +506" },
  { country: "GT", dial: "502", label: "Guatemala +502" },
  { country: "DO", dial: "1809", label: "Rep. Dom. +1" },
  { country: "UY", dial: "598", label: "Uruguay +598" },
  { country: "PY", dial: "595", label: "Paraguay +595" },
  { country: "BO", dial: "591", label: "Bolivia +591" },
  { country: "FR", dial: "33", label: "Francia +33" },
  { country: "DE", dial: "49", label: "Alemania +49" },
  { country: "IT", dial: "39", label: "Italia +39" },
  { country: "GB", dial: "44", label: "Reino Unido +44" },
  { country: "PT", dial: "351", label: "Portugal +351" },
  { country: "NL", dial: "31", label: "Países Bajos +31" },
  { country: "BE", dial: "32", label: "Bélgica +32" },
  { country: "CH", dial: "41", label: "Suiza +41" },
  { country: "AU", dial: "61", label: "Australia +61" },
  { country: "AE", dial: "971", label: "EAU +971" },
  { country: "IN", dial: "91", label: "India +91" },
];

const DEFAULT_COUNTRY = "CO";
const DEFAULT_DIAL = "57";

function dialForCountry(country: string | undefined | null): string | null {
  if (!country) return null;
  const code = country.trim().toUpperCase();
  return DIAL_BY_COUNTRY[code] ?? null;
}

function fromTimezone(): { country: string; dial: string } | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = TZ_TO_COUNTRY[tz];
    const dial = dialForCountry(country);
    if (country && dial) return { country, dial };
  } catch {
    /* ignore */
  }
  return null;
}

function fromLocale(): { country: string; dial: string } | null {
  try {
    const lang = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage;
    if (!lang) return null;
    const parts = lang.replace("_", "-").split("-");
    const region = parts.length > 1 ? parts[parts.length - 1] : "";
    if (region.length === 2) {
      const dial = dialForCountry(region);
      if (dial) return { country: region.toUpperCase(), dial };
    }
  } catch {
    /* ignore */
  }
  return null;
}

async function fromIp(): Promise<{ country: string; dial: string } | null> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch("https://ipwho.is/", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      success?: boolean;
      country_code?: string;
      calling_code?: string;
    };
    if (data.success === false) return null;
    const country = (data.country_code || "").toUpperCase();
    const dial = (data.calling_code || "").replace(/\D/g, "") || dialForCountry(country);
    if (country && dial) return { country, dial };
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
  return null;
}

export type DetectedDial = {
  country: string;
  dial: string;
  source: "ip" | "timezone" | "locale" | "default";
};

/** Instant guess (timezone/locale) so the UI can paint immediately. */
export function guessDialCodeSync(): DetectedDial {
  const tz = fromTimezone();
  if (tz) return { ...tz, source: "timezone" };
  const locale = fromLocale();
  if (locale) return { ...locale, source: "locale" };
  return { country: DEFAULT_COUNTRY, dial: DEFAULT_DIAL, source: "default" };
}

/** Refine with IP geo when available; falls back to sync guess. */
export async function detectDialCode(): Promise<DetectedDial> {
  const sync = guessDialCodeSync();
  const ip = await fromIp();
  if (ip) return { ...ip, source: "ip" };
  return sync;
}

/** Keep only local digits; strip leading 0 and accidental country code. */
export function normalizeLocalNumber(raw: string, dial: string): string {
  let digits = raw.replace(/\D/g, "").slice(0, 15);
  if (dial && digits.startsWith(dial) && digits.length > dial.length + 6) {
    digits = digits.slice(dial.length);
  }
  // National trunk prefix (e.g. 0…)
  if (digits.startsWith("0") && digits.length > 8) {
    digits = digits.replace(/^0+/, "");
  }
  return digits;
}

export function buildE164(dial: string, local: string): string {
  const d = dial.replace(/\D/g, "");
  const n = normalizeLocalNumber(local, d);
  return `+${d}${n}`;
}

export function isPlausibleLocalPhone(local: string, dial: string): boolean {
  const full = buildE164(dial, local).replace(/\D/g, "");
  return full.length >= 8 && full.length <= 15;
}

export function optionValue(opt: DialOption): string {
  return `${opt.country}:${opt.dial}`;
}

export function parseOptionValue(value: string): { country: string; dial: string } {
  const [country, dial] = value.split(":");
  if (country && dial) return { country, dial };
  return { country: DEFAULT_COUNTRY, dial: DEFAULT_DIAL };
}

/** Ensure detected country exists in the select list. */
export function ensureDialOption(country: string, dial: string): DialOption[] {
  if (DIAL_OPTIONS.some((o) => o.country === country && o.dial === dial)) {
    return DIAL_OPTIONS;
  }
  const name = country;
  return [{ country, dial, label: `${name} +${dial}` }, ...DIAL_OPTIONS];
}
