import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { getWhatsAppUrl, LEGAL } from "@/config/site";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3 border-b border-border pb-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent)]">ASTRA · Legal</p>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          <p className="text-sm text-muted-foreground">Última actualización: {LEGAL.updatedAt}</p>
        </header>

        <div className="legal-prose space-y-5 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>

        <footer className="flex flex-wrap items-center gap-4 border-t border-border pt-8 text-sm">
          <Link to="/" className="text-[color:var(--color-accent)] hover:underline">
            ← Volver al inicio
          </Link>
          <span className="text-muted-foreground/40">·</span>
          <a
            href={getWhatsAppUrl("general")}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            WhatsApp: {LEGAL.whatsappDisplay}
          </a>
        </footer>
      </article>
    </main>
  );
}

export function LegalNav() {
  const items = [
    { to: "/terminos", label: "Términos" },
    { to: "/privacidad", label: "Privacidad" },
    { to: "/tratamiento-datos", label: "Datos personales" },
    { to: "/cookies", label: "Cookies" },
  ] as const;

  return (
    <nav className="flex flex-wrap gap-3 text-xs text-muted-foreground">
      {items.map((item) => (
        <Link key={item.to} to={item.to} className="hover:text-foreground">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
