import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import { trackEvent } from "@/lib/analytics-events";
import { saveLead } from "@/lib/leads";
import {
  buildE164,
  detectDialCode,
  ensureDialOption,
  guessDialCodeSync,
  isPlausibleLocalPhone,
  normalizeLocalNumber,
  optionValue,
  parseOptionValue,
} from "@/lib/phone-country";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getWhatsAppUrlWithCustomMessage, isConfigured, WHATSAPP_NUMBER } from "@/config/site";

const SERVICES = [
  { value: "web", label: "Sitios Web & Landing Pages" },
  { value: "meta_ads", label: "Meta Ads" },
  { value: "saas", label: "Aplicaciones SaaS" },
  { value: "strategy", label: "Estrategia Digital" },
  { value: "other", label: "Otro / aún no lo sé" },
] as const;

const MAX = {
  name: 80,
  business: 120,
  whatsappLocal: 15,
  message: 500,
} as const;

type FormState = {
  name: string;
  business: string;
  whatsappLocal: string;
  service: string;
  message: string;
  /** Honeypot — must stay empty */
  company_url: string;
};

const INITIAL: FormState = {
  name: "",
  business: "",
  whatsappLocal: "",
  service: "web",
  message: "",
  company_url: "",
};

function sanitize(value: string, max: number) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

export function LeadForm() {
  const guessed = guessDialCodeSync();
  const [dialCountry, setDialCountry] = useState(guessed.country);
  const [dialCode, setDialCode] = useState(guessed.dial);
  const [dialOptions, setDialOptions] = useState(() => ensureDialOption(guessed.country, guessed.dial));
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const lastSubmit = useRef(0);
  const userChangedDial = useRef(false);

  useEffect(() => {
    let cancelled = false;
    detectDialCode().then((detected) => {
      if (cancelled || userChangedDial.current) return;
      setDialCountry(detected.country);
      setDialCode(detected.dial);
      setDialOptions(ensureDialOption(detected.country, detected.dial));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.company_url.trim()) {
      setSent(true);
      return;
    }

    const now = Date.now();
    if (now - lastSubmit.current < 2500) {
      setError("Espera un momento antes de volver a enviar.");
      return;
    }

    const name = sanitize(form.name, MAX.name);
    const business = sanitize(form.business, MAX.business);
    const local = normalizeLocalNumber(form.whatsappLocal, dialCode);
    const message = sanitize(form.message, MAX.message);
    const whatsapp = buildE164(dialCode, local);

    if (!name || !business || !local) {
      setError("Completa los campos obligatorios.");
      return;
    }

    if (!isPlausibleLocalPhone(local, dialCode)) {
      setError("Revisa tu número de WhatsApp.");
      return;
    }

    lastSubmit.current = now;
    setSubmitting(true);

    const serviceLabel = SERVICES.find((s) => s.value === form.service)?.label ?? form.service;
    const body = [
      "Hola ASTRA 👋 Quiero hablar sobre mi proyecto.",
      "",
      `Nombre: ${name}`,
      `Empresa o negocio: ${business}`,
      `WhatsApp: ${whatsapp}`,
      `Servicio de interés: ${serviceLabel}`,
      message ? `Mensaje: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    trackEvent("lead_form_submit", { service: form.service });
    trackEvent("service_select", { service: form.service });

    await saveLead({
      name,
      business,
      whatsapp,
      service: form.service,
      message,
    });

    const url = getWhatsAppUrlWithCustomMessage(body);
    setSent(true);
    setSubmitting(false);

    if (isConfigured(WHATSAPP_NUMBER) && url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.hash = "cta";
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative surface-panel space-y-5 rounded-3xl p-8 md:p-10"
      data-analytics="lead-form"
      noValidate
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="company_url"
            value={form.company_url}
            onChange={(e) => setForm((f) => ({ ...f, company_url: e.target.value }))}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" required>
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={MAX.name}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus-visible:border-[color:var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30"
            placeholder="Tu nombre"
          />
        </Field>
        <Field label="Empresa o negocio" required>
          <input
            required
            name="business"
            maxLength={MAX.business}
            value={form.business}
            onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
            className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus-visible:border-[color:var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30"
            placeholder="Nombre de tu negocio"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="WhatsApp" required>
          <div className="flex gap-2">
            <select
              name="country_code"
              aria-label="Indicativo de país"
              value={optionValue({ country: dialCountry, dial: dialCode, label: "" })}
              onChange={(e) => {
                userChangedDial.current = true;
                const next = parseOptionValue(e.target.value);
                setDialCountry(next.country);
                setDialCode(next.dial);
              }}
              className="w-[7.5rem] shrink-0 rounded-xl border border-border bg-background/40 px-2 py-3 text-sm outline-none focus-visible:border-[color:var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30 sm:w-[8.5rem]"
            >
              {dialOptions.map((opt) => (
                <option key={`${opt.country}-${opt.dial}-${opt.label}`} value={optionValue(opt)}>
                  +{opt.dial}
                </option>
              ))}
            </select>
            <input
              required
              name="whatsapp"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={MAX.whatsappLocal}
              value={form.whatsappLocal}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  whatsappLocal: normalizeLocalNumber(e.target.value, dialCode),
                }))
              }
              className="min-w-0 flex-1 rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus-visible:border-[color:var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30"
              placeholder="300 123 4567"
            />
          </div>
          <span className="mt-1.5 block text-[11px] text-muted-foreground">
            Detectamos tu país ({dialOptions.find((o) => o.country === dialCountry)?.label ?? `+${dialCode}`}).
            Solo escribe tu número — puedes cambiar el indicativo si hace falta.
          </span>
        </Field>
        <Field label="Servicio de interés" required>
          <select
            name="service"
            value={form.service}
            onChange={(e) => {
              setForm((f) => ({ ...f, service: e.target.value }));
              trackEvent("service_select", { service: e.target.value });
            }}
            className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus-visible:border-[color:var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30"
          >
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Mensaje">
        <textarea
          name="message"
          rows={3}
          maxLength={MAX.message}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus-visible:border-[color:var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30"
          placeholder="Cuéntanos brevemente tu idea o desafío"
        />
      </Field>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Al enviar, se abrirá WhatsApp con tu mensaje
        {isSupabaseConfigured
          ? " y registraremos tu solicitud en nuestro CRM interno (Supabase) para darte seguimiento"
          : ""}
        . Consulta nuestra{" "}
        <a href="/privacidad" className="underline underline-offset-2 hover:text-foreground">
          política de privacidad
        </a>
        .
      </p>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full min-h-11 rounded-full btn-cta py-3.5 text-sm font-semibold transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto sm:px-10"
        data-analytics="lead-form-submit"
      >
        {submitting ? "Enviando…" : "Enviar y hablar por WhatsApp"}
      </button>

      {sent && !error && (
        <p className="text-sm text-muted-foreground" role="status">
          {isConfigured(WHATSAPP_NUMBER)
            ? "Te abrimos WhatsApp con tu mensaje listo. Si no se abrió, revisa el bloqueador de ventanas."
            : "Configura VITE_WHATSAPP_NUMBER para activar el envío."}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="relative block space-y-2">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
