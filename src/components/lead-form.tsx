import { useRef, useState, type FormEvent, type ReactNode } from "react";

import { trackEvent } from "@/lib/analytics-events";
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
  whatsapp: 32,
  message: 500,
} as const;

type FormState = {
  name: string;
  business: string;
  whatsapp: string;
  service: string;
  message: string;
  /** Honeypot — must stay empty */
  company_url: string;
};

const INITIAL: FormState = {
  name: "",
  business: "",
  whatsapp: "",
  service: "web",
  message: "",
  company_url: "",
};

function sanitize(value: string, max: number) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

function isPlausiblePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function LeadForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastSubmit = useRef(0);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Anti-spam: honeypot filled → fake success, no open
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
    const whatsapp = sanitize(form.whatsapp, MAX.whatsapp);
    const message = sanitize(form.message, MAX.message);

    if (!name || !business || !whatsapp) {
      setError("Completa los campos obligatorios.");
      return;
    }

    if (!isPlausiblePhone(whatsapp)) {
      setError("Revisa el número de WhatsApp (incluye código de país).");
      return;
    }

    lastSubmit.current = now;

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

    const url = getWhatsAppUrlWithCustomMessage(body);
    setSent(true);

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
      {/* Honeypot — hidden from users */}
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
          <input
            required
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            maxLength={MAX.whatsapp}
            value={form.whatsapp}
            onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
            className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus-visible:border-[color:var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30"
            placeholder="+1 555 000 0000"
          />
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
        Al enviar, se abrirá WhatsApp con tu mensaje. No almacenamos estos datos en un servidor propio: se
        transmiten a través de WhatsApp. Consulta nuestra{" "}
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
        className="w-full min-h-11 rounded-full btn-cta py-3.5 text-sm font-semibold transition-transform hover:scale-[1.01] sm:w-auto sm:px-10"
        data-analytics="lead-form-submit"
      >
        Enviar y hablar por WhatsApp
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
