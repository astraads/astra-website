import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export type LeadPayload = {
  name: string;
  business: string;
  whatsapp: string;
  service: string;
  message: string;
};

/**
 * Persists a lead in Supabase when configured.
 * Failures are non-blocking so WhatsApp conversion still works.
 */
export async function saveLead(payload: LeadPayload): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!isSupabaseConfigured) {
    return { ok: true, skipped: true };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { ok: true, skipped: true };
  }

  const { error } = await supabase.from("leads").insert({
    name: payload.name,
    business: payload.business,
    whatsapp: payload.whatsapp,
    service: payload.service,
    message: payload.message || null,
    source: "website",
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 300) : null,
  });

  if (error) {
    console.error("[ASTRA] lead save failed:", error.message);
    return { ok: false };
  }

  return { ok: true };
}
