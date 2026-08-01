import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useTheme } from "@/hooks/use-theme";
import { TransformationSection } from "@/components/transformation-section";
import { HeroCarousel } from "@/components/hero-carousel";
import { Analytics } from "@/components/analytics";
import { LeadForm } from "@/components/lead-form";
import { ScrollProgress, ScrollReveal } from "@/components/scroll-reveal";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  BRAND,
  getInstagramUrl,
  getWhatsAppUrl,
  isConfigured,
  INSTAGRAM_URL,
  SEO,
  SITE_URL,
  WHATSAPP_NUMBER,
} from "@/config/site";
import { trackEvent } from "@/lib/analytics-events";

import heroBg from "@/assets/hero-bg.jpg";
import indHotel from "@/assets/ind-hotel.jpg";
import indArchitecture from "@/assets/ind-architecture.jpg";
import indEcommerce from "@/assets/ind-ecommerce.jpg";
import indDental from "@/assets/ind-dental.jpg";
import indRestaurant from "@/assets/ind-restaurant.jpg";
import indRealestate from "@/assets/ind-realestate.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SEO.title },
      { name: "description", content: SEO.description },
      { name: "keywords", content: SEO.keywords.join(", ") },
      { property: "og:title", content: SEO.title },
      { property: "og:description", content: SEO.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:locale", content: "es_ES" },
      { property: "og:site_name", content: "ASTRA" },
      { property: "og:image", content: heroBg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO.title },
      { name: "twitter:description", content: SEO.description },
      { name: "twitter:image", content: heroBg },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preload", as: "image", href: heroBg, fetchPriority: "high" } as never,
    ],
  }),
  component: AstraLanding,
});

/* ═══════════════════════════ DATA ═══════════════════════════ */

const METHOD = [
  { k: "01", t: "Descubrimos", d: "Entendemos tu negocio, problema y objetivo." },
  { k: "02", t: "Diseñamos", d: "Convertimos la necesidad en una estrategia y experiencia digital." },
  { k: "03", t: "Construimos", d: "Desarrollamos la solución con tecnología y diseño." },
  { k: "04", t: "Activamos", d: "Conectamos tu ecosistema digital y ponemos la estrategia en marcha." },
  { k: "05", t: "Optimizamos", d: "Medimos, aprendemos y mejoramos continuamente." },
] as const;

const SERVICES = [
  {
    t: "Sitios Web & Landing Pages",
    d: "Experiencias digitales modernas, estratégicas y orientadas a convertir visitantes en oportunidades.",
    tag: "01 — Web",
    href: "#web",
    intent: "web" as const,
  },
  {
    t: "Meta Ads",
    d: "Estrategias y campañas publicitarias en Meta conectadas con los objetivos comerciales de cada negocio.",
    tag: "02 — Ads",
    href: "#meta-ads",
    intent: "meta_ads" as const,
  },
  {
    t: "Aplicaciones SaaS",
    d: "Desarrollamos aplicaciones SaaS para digitalizar procesos, centralizar información, automatizar tareas o convertir una idea en una solución tecnológica.",
    tag: "03 — SaaS",
    href: "#saas",
    intent: "saas" as const,
  },
  {
    t: "Estrategia Digital",
    d: "Integramos tecnología, adquisición y presencia digital para construir ecosistemas orientados al crecimiento.",
    tag: "04 — Estrategia",
    href: "#ecosystem",
    intent: "digitalization" as const,
  },
] as const;

const PROBLEM_POINTS = [
  "Una web que no convierte no es suficiente.",
  "Hacer publicidad sin estrategia puede desperdiciar presupuesto.",
  "Los procesos manuales pueden frenar el crecimiento.",
  "Una buena idea necesita tecnología para convertirse en realidad.",
] as const;

const ECOSYSTEM = ["Estrategia", "Meta Ads", "Web", "SaaS"] as const;

const META_FLOW = [
  "Estrategia",
  "Audiencia",
  "Creatividad",
  "Meta Ads",
  "Landing / Web",
  "Contacto",
  "Oportunidad",
] as const;

const SAAS_EXAMPLES = [
  "Sistemas internos",
  "Dashboards",
  "Paneles administrativos",
  "Plataformas para clientes",
  "Sistemas de gestión",
  "MVPs",
  "Productos digitales",
] as const;

/** Portfolio industries — visual only, no invented metrics or client claims */
const WORK = [
  { name: "Hospitalidad", tag: "Hoteles & turismo", img: indHotel },
  { name: "Arquitectura", tag: "Estudios & diseño", img: indArchitecture },
  { name: "E-commerce", tag: "Marcas digitales", img: indEcommerce },
  { name: "Salud", tag: "Clínicas & wellness", img: indDental },
  { name: "Gastronomía", tag: "Restaurantes", img: indRestaurant },
  { name: "Bienes raíces", tag: "Inmobiliarias", img: indRealestate },
] as const;

const FAQ = [
  {
    q: "¿Qué hace exactamente ASTRA?",
    a: "Ayudamos a empresas y negocios a crecer y digitalizarse con sitios web, Meta Ads, aplicaciones SaaS y estrategia digital — como un solo equipo conectado a tus objetivos.",
  },
  {
    q: "¿Trabajan solo en un país?",
    a: "No. ASTRA trabaja con empresas, negocios y emprendedores de cualquier parte del mundo que se comuniquen en español. La propuesta es global.",
  },
  {
    q: "¿Puedo contratar solo un servicio?",
    a: "Sí. Puedes empezar con web, Meta Ads o SaaS. También diseñamos ecosistemas completos cuando tiene sentido para tu negocio.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Depende del alcance. Una landing puede avanzar en días; un sitio corporativo o un SaaS requiere más tiempo. Lo definimos juntos en la primera conversación.",
  },
  {
    q: "¿El presupuesto de anuncios está incluido?",
    a: "No. Nuestro trabajo cubre estrategia, creatividades, gestión y optimización. El gasto publicitario en Meta lo defines tú según tus objetivos.",
  },
  {
    q: "¿Cómo empezamos?",
    a: "Escríbenos por WhatsApp o completa el formulario. Conversamos sobre tu idea, negocio o desafío y te proponemos el siguiente paso.",
  },
] as const;

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */

function AstraLanding() {
  return (
    <main className="relative overflow-x-clip bg-background text-foreground">
      <Analytics />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <HeroCarousel />
      <Marquee />
      <Problem />
      <Ecosystem />
      <Services />
      <WebSection />
      <MetaAdsSection />
      <SaasSection />
      <Method />
      <TransformationSection />
      <Work />
      <ContactSection />
      <Faq />
      <FinalCta />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

/* ─────────── Cursor ─────────── */
function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0,
      ry = 0,
      tx = 0,
      ty = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
    };
    let raf = 0;
    const loop = () => {
      rx += (tx - rx) * 0.15;
      ry += (ty - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div
        ref={ring}
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border md:block"
      />
      <div
        ref={dot}
        className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 rounded-full md:block"
      />
    </>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glass-strong flex h-10 w-10 items-center justify-center rounded-full hover-surface transition-colors"
      aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      title={isLight ? "Modo oscuro" : "Modo claro"}
    >
      {isLight ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}

function Header() {
  const [y, setY] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => {
      const c = window.scrollY;
      setVisible(c < 80 || c < lastY);
      setLastY(c);
      setY(c);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [lastY]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#ecosystem", label: "Ecosistema" },
    { href: "#services", label: "Servicios" },
    { href: "#method", label: "Método" },
    { href: "#work", label: "Trabajo" },
    { href: "#faq", label: "FAQ" },
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${visible || open ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-4 transition-all ${y > 40 || open ? "glass-strong mt-3 rounded-full" : "text-white"}`}
      >
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          ASTRA<span className="text-[#6C63FF]">™</span>
        </a>
        <nav
          className={`hidden items-center gap-7 text-sm md:flex ${y > 40 ? "text-muted-foreground" : "text-white/70"}`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-foreground ${y <= 40 ? "hover:text-white" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href="#cta"
            onClick={() => {
              setOpen(false);
              trackEvent("cta_click", { location: "header" });
            }}
            className="glass-strong hidden min-h-10 items-center rounded-full px-5 py-2 text-sm font-medium hover-surface transition-colors sm:inline-flex"
            data-analytics="cta-header"
          >
            Hablemos →
          </a>
          <button
            type="button"
            className="glass-strong inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="mx-4 mt-2 rounded-3xl border border-border bg-background/95 p-6 shadow-xl backdrop-blur-md md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-[color:var(--surface-hover-subtle)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#cta"
              className="btn-cta mt-3 rounded-full px-5 py-3 text-center text-sm font-semibold"
              onClick={() => {
                setOpen(false);
                trackEvent("cta_click", { location: "mobile-nav" });
              }}
            >
              Hablemos de tu proyecto
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Marquee() {
  const items = [
    "Sitios Web",
    "Landing Pages",
    "Meta Ads",
    "Aplicaciones SaaS",
    "Estrategia Digital",
    "CRO",
    "Automatización",
    "Productos digitales",
  ];
  return (
    <section className="relative overflow-hidden border-y border-border py-8">
      <div className="animate-marquee flex gap-16 whitespace-nowrap">
        {[...items, ...items, ...items].map((n, i) => (
          <span key={i} className="font-display text-lg font-medium text-muted-foreground/70">
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <ScrollReveal className="mx-auto max-w-5xl" variant="blur">
        <div className="mb-6 text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent)]">01 — El problema</div>
        <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
          Tu negocio no necesita simplemente estar en Internet.
          <br />
          <span className="text-gradient-muted">Necesita que Internet trabaje a favor de tu negocio.</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal className="mx-auto mt-16 grid max-w-5xl gap-3 sm:grid-cols-2" variant="up" delay={120} stagger>
        {PROBLEM_POINTS.map((point) => (
          <div key={point} data-reveal-child className="surface-panel rounded-2xl p-6">
            <p className="text-base leading-relaxed text-muted-foreground">{point}</p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="relative border-t border-border px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal variant="up">
          <div className="mb-6 text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent)]">02 — Ecosistema</div>
          <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
            Un solo equipo para <span className="text-gradient">construir, atraer y escalar.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            No vendemos herramientas aisladas. Diseñamos soluciones conectadas con los objetivos reales de cada negocio.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-16" variant="scale" delay={100}>
          <div className="surface-panel rounded-3xl p-8 md:p-12">
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2">
              {ECOSYSTEM.map((step, i) => (
                <div key={step} className="flex w-full items-center gap-3 md:w-auto md:gap-2">
                  <div className="min-w-0 flex-1 rounded-xl border border-border bg-background/50 px-5 py-4 text-center md:min-w-[140px] md:flex-none">
                    <div className="text-[10px] uppercase tracking-widest text-[color:var(--label-subtle)]">
                      Pilar {i + 1}
                    </div>
                    <div className="mt-1 font-display font-semibold tracking-tight">{step}</div>
                  </div>
                  {i < ECOSYSTEM.length - 1 && (
                    <div className="hidden text-lg text-[color:var(--color-accent)]/70 md:block" aria-hidden="true">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Estrategia + Meta Ads + Web + SaaS funcionan como un ecosistema: dirección, adquisición, presencia y producto
              alineados al crecimiento.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Services() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section id="services" className="relative border-t border-border py-32">
      <ScrollReveal className="mx-auto mb-12 max-w-7xl px-6" variant="up">
        <div className="mb-6 text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent)]">03 — Servicios</div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Lo que tu negocio necesita
            <br />
            <span className="text-gradient-muted">para crecer de verdad.</span>
          </h2>
          <p className="shrink-0 text-sm text-muted-foreground">Desliza o usa las flechas →</p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-7xl px-6" variant="scale" delay={80}>
        <Carousel setApi={setApi} opts={{ align: "start", loop: true, dragFree: false }} className="w-full">
          <div className="relative px-12 sm:px-14">
            <CarouselPrevious
              variant="outline"
              className="glass-strong hover-surface absolute left-0 top-1/2 h-11 w-11 -translate-y-1/2 border-border disabled:opacity-30"
            />
            <CarouselContent className="-ml-4">
              {SERVICES.map((s) => (
                <CarouselItem key={s.t} className="basis-full pl-4 md:basis-1/2 xl:basis-1/3">
                  <article className="group relative h-full overflow-hidden rounded-3xl surface-panel p-8 transition-colors hover:bg-[color:var(--surface-hover-subtle)]">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[color:var(--color-accent)]/8 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                    <div className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-accent)]">{s.tag}</div>
                    <h3 className="mt-8 font-display text-3xl font-bold tracking-tight">{s.t}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{s.d}</p>
                    <a
                      href={s.href}
                      className="mt-10 flex items-center justify-between border-t border-border pt-6 text-sm"
                    >
                      <span className="text-muted-foreground">Ver más</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext
              variant="outline"
              className="glass-strong hover-surface absolute right-0 top-1/2 h-11 w-11 -translate-y-1/2 border-border disabled:opacity-30"
            />
          </div>

          <div className="mt-8 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2" role="tablist" aria-label="Servicios">
              {SERVICES.map((s, i) => (
                <button
                  key={s.t}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Ir a ${s.t}`}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current
                      ? "w-8 bg-[color:var(--color-accent)]"
                      : "w-1.5 bg-[color:var(--track-inactive)] hover:bg-[color:var(--track-muted)]"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs tabular-nums text-muted-foreground">
              {String(current + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
            </p>
          </div>
        </Carousel>
      </ScrollReveal>
    </section>
  );
}

function WebSection() {
  return (
    <section id="web" className="relative border-t border-border px-6 py-28 md:py-36">
      <ScrollReveal className="mx-auto max-w-5xl" variant="left">
        <div className="mb-6 text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent)]">04 — Web</div>
        <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
          Tu sitio web debería hacer más que verse bien.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Debe comunicar tu valor, generar confianza y facilitar el siguiente paso.
        </p>
        <a
          href={getWhatsAppUrl("web")}
          target={isConfigured(WHATSAPP_NUMBER) ? "_blank" : undefined}
          rel={isConfigured(WHATSAPP_NUMBER) ? "noreferrer" : undefined}
          className="btn-cta mt-10 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
          data-analytics="cta-web"
        >
          Quiero crear mi sitio
        </a>
      </ScrollReveal>
    </section>
  );
}

function MetaAdsSection() {
  return (
    <section id="meta-ads" className="relative border-t border-border px-6 py-28 md:py-36">
      <ScrollReveal className="mx-auto max-w-6xl" variant="right">
        <div className="mb-6 text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent)]">05 — Meta Ads</div>
        <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
          Haz que tu negocio llegue a las personas correctas.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Creamos estrategias en Meta Ads conectadas con tu sitio web, landing page y objetivos comerciales.
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-3">
          {META_FLOW.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="surface-panel rounded-md px-3.5 py-2 text-sm font-medium tracking-tight">{step}</div>
              {i < META_FLOW.length - 1 && (
                <span className="text-[color:var(--color-accent)]/60" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <a
          href={getWhatsAppUrl("meta_ads")}
          target={isConfigured(WHATSAPP_NUMBER) ? "_blank" : undefined}
          rel={isConfigured(WHATSAPP_NUMBER) ? "noreferrer" : undefined}
          className="btn-cta mt-12 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
          data-analytics="cta-meta-ads"
        >
          Quiero impulsar mi negocio
        </a>
      </ScrollReveal>
    </section>
  );
}

function SaasSection() {
  return (
    <section id="saas" className="relative border-t border-border px-6 py-28 md:py-36">
      <ScrollReveal className="mx-auto max-w-6xl" variant="up">
        <div className="mb-6 text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
          06 — Aplicaciones SaaS
        </div>
        <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
          ¿Tu negocio necesita algo más que una página web?
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          También desarrollamos aplicaciones SaaS para empresas y negocios que necesitan digitalizar procesos,
          centralizar información, automatizar tareas o convertir una idea en una solución tecnológica.
        </p>

        <div className="mt-12 flex flex-wrap gap-2.5">
          {SAAS_EXAMPLES.map((ex) => (
            <span key={ex} className="surface-panel rounded-md px-3.5 py-2 text-sm text-muted-foreground">
              {ex}
            </span>
          ))}
        </div>

        <a
          href={getWhatsAppUrl("saas")}
          target={isConfigured(WHATSAPP_NUMBER) ? "_blank" : undefined}
          rel={isConfigured(WHATSAPP_NUMBER) ? "noreferrer" : undefined}
          className="btn-cta mt-12 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
          data-analytics="cta-saas"
        >
          Quiero desarrollar mi solución
        </a>
      </ScrollReveal>
    </section>
  );
}

function Method() {
  return (
    <section id="method" className="relative border-t border-border px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end" variant="blur">
          <div>
            <div className="mb-6 text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
              07 — Método ASTRA
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Una idea. Una estrategia.
              <br />
              <span className="text-gradient-muted">Una solución.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Un proceso claro para pasar de la conversación a un ecosistema digital en marcha.
          </p>
        </ScrollReveal>

        <ScrollReveal className="grid gap-4 md:grid-cols-5" variant="up" delay={100} stagger>
          {METHOD.map((m) => (
            <div
              key={m.k}
              data-reveal-child
              className="group surface-panel rounded-2xl p-6 transition-all duration-700 hover:-translate-y-0.5 hover:bg-[color:var(--surface-hover-subtle)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xs text-[color:var(--label-subtle)]">{m.k}</span>
                <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)] opacity-60 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{m.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="relative border-t border-border px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal variant="blur">
          <div className="mb-6 text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent)]">08 — Trabajo</div>
          <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Experiencias pensadas
            <br />
            <span className="text-gradient-muted">para industrias reales.</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Exploramos sectores donde la presencia digital y la conversión marcan la diferencia. El portafolio interactivo
            del hero muestra el nivel de detalle con el que diseñamos.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3" variant="up" delay={80} stagger>
          {WORK.map((c) => (
            <article
              key={c.name}
              data-reveal-child
              className="group relative overflow-hidden rounded-3xl surface-panel transition-transform hover:-translate-y-0.5"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={`Experiencia digital para ${c.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
              </div>
              <div className="media-scrim absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-xs uppercase tracking-[0.25em] text-white/60">{c.tag}</div>
                <div className="mt-1 font-display text-2xl font-bold">{c.name}</div>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative border-t border-border px-6 py-32">
      <ScrollReveal className="mx-auto max-w-4xl" variant="up">
        <div className="mb-6 text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent)]">09 — Conversemos</div>
        <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
          Cuéntanos qué estás construyendo
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Completa el formulario o escríbenos directo. Sin fricción: solo lo necesario para empezar la conversación.
        </p>
        <div className="mt-12">
          <LeadForm />
        </div>
      </ScrollReveal>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative border-t border-border px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal variant="left">
          <div className="mb-6 text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent)]">10 — FAQ</div>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Preguntas,
            <br />
            <span className="text-gradient-muted">respuestas claras.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-16 divide-y divide-border border-y border-border" variant="up" delay={100}>
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-semibold md:text-xl">{f.q}</span>
                  <span
                    className={`text-2xl text-[color:var(--color-accent)] transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}

function FinalCta() {
  const waReady = isConfigured(WHATSAPP_NUMBER);
  const igReady = isConfigured(INSTAGRAM_URL);

  return (
    <section id="cta" className="relative overflow-hidden border-t border-border px-6 py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-accent)]/20 blur-[48px] md:h-[70vh] md:w-[70vh] md:bg-[color:var(--color-accent)]/12 md:blur-[140px]" />
      </div>

      <ScrollReveal className="mx-auto max-w-4xl text-center" variant="scale">
        <h2 className="font-display text-5xl font-bold leading-[0.95] md:text-7xl">
          ¿Qué estás
          <br />
          <span className="text-gradient">construyendo?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Cuéntanos tu idea, negocio o desafío. Descubramos juntos qué podemos crear para llevarlo al siguiente nivel.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={getWhatsAppUrl("general")}
            target={waReady ? "_blank" : undefined}
            rel={waReady ? "noreferrer" : undefined}
            onClick={() => trackEvent("whatsapp_click", { location: "final-cta", intent: "general" })}
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,211,102,0.4)] transition-all hover:scale-[1.02] hover:bg-[#1ebe5d]"
            data-analytics="cta-final-whatsapp"
          >
            <WhatsAppIcon />
            Hablemos por WhatsApp
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full btn-cta px-8 py-4 text-sm font-semibold transition-transform hover:scale-[1.02]"
            data-analytics="cta-final-form"
          >
            Completar formulario
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {igReady ? (
          <a
            href={getInstagramUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Conoce más de ASTRA en Instagram →
          </a>
        ) : (
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">{BRAND.microcopy}</p>
        )}
      </ScrollReveal>
    </section>
  );
}

function WhatsAppIcon({ className = "h-5 w-5 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Footer() {
  const igReady = isConfigured(INSTAGRAM_URL);
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold tracking-tight">
            ASTRA<span className="text-[#6C63FF]">™</span>
          </span>
          <span className="text-xs text-muted-foreground">Partner tecnológico global</span>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
          <a href="#services" className="hover:text-foreground">
            Servicios
          </a>
          <a href="#cta" className="hover:text-foreground">
            Contacto
          </a>
          {igReady && (
            <a
              href={getInstagramUrl()}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
              onClick={() => trackEvent("instagram_click", { location: "footer" })}
            >
              Instagram
            </a>
          )}
          <a href="/privacidad" className="hover:text-foreground">
            Privacidad
          </a>
          <a href="/terminos" className="hover:text-foreground">
            Términos
          </a>
          <a href="/tratamiento-datos" className="hover:text-foreground">
            Datos
          </a>
          <a href="/cookies" className="hover:text-foreground">
            Cookies
          </a>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ASTRA. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
