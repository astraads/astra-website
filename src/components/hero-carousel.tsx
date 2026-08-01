import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";

import { PORTFOLIO_MOCKUPS } from "@/components/portfolio-mockups";
import { BRAND, getWhatsAppUrl, isConfigured, WHATSAPP_NUMBER } from "@/config/site";

const PORTFOLIO = [
  {
    industry: "Salud",
    title: "Premium Medical Clinic",
    description: "Marca médica premium con fotografía clínica, flujo de reservas y tipografía refinada.",
    accent: "#0F766E",
  },
  {
    industry: "Legal",
    title: "Luxury Law Firm",
    description: "Identidad corporativa para firma legal: paleta oscura, fotografía editorial y tipografía elegante.",
    accent: "#C4A962",
  },
  {
    industry: "Construcción",
    title: "Real Estate Developer",
    description: "Plataforma para desarrolladores con residencias de alto nivel, búsqueda y métricas de inversión.",
    accent: "#0369A1",
  },
  {
    industry: "Dental",
    title: "Modern Dental Clinic",
    description: "Experiencia dental de alto nivel con imagen auténtica, interiores calmados y UI orientada a conversión.",
    accent: "#14B8A6",
  },
  {
    industry: "Hospitalidad",
    title: "Boutique Hotel",
    description: "Sitio inmersivo de hospitalidad con fotografía de habitaciones, reserva directa y presentación cinematográfica.",
    accent: "#D4AF37",
  },
  {
    industry: "Restaurante",
    title: "Fine Dining Restaurant",
    description: "Marca gastronómica con fotografía profesional de platos y tipografía cálida y elegante.",
    accent: "#D4A574",
  },
  {
    industry: "Negocios",
    title: "Corporate Consulting",
    description: "Plataforma B2B premium con fotografía ejecutiva, métricas de desempeño y layouts limpios.",
    accent: "#2563EB",
  },
] as const;
const TOTAL = PORTFOLIO.length;
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function getOffset(index: number, active: number) {
  let diff = index - active;
  if (diff > TOTAL / 2) diff -= TOTAL;
  if (diff < -TOTAL / 2) diff += TOTAL;
  return diff;
}

function getCardTransform(offset: number, reducedMotion: boolean): CSSProperties {
  if (reducedMotion) {
    return {
      transform: "translate(-50%, -50%)",
      opacity: offset === 0 ? 1 : 0,
      zIndex: offset === 0 ? 20 : 0,
      pointerEvents: offset === 0 ? "auto" : "none",
      transition: `opacity 0.4s ${EASE}`,
    };
  }

  const abs = Math.abs(offset);
  if (abs > 3) {
    return {
      transform: `translate(-50%, -50%) translateX(${offset * 340}px) translateZ(-600px) rotateY(${offset * -52}deg) scale(0.35)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
      transition: `transform 0.95s ${EASE}, opacity 0.6s ease`,
    };
  }

  const rotateY = offset * -52;
  const translateX = offset * 280;
  const translateZ = offset === 0 ? 180 : -90 - abs * 45;
  const scale = offset === 0 ? 1 : 0.86 - abs * 0.04;
  const opacity = offset === 0 ? 1 : Math.max(0.2, 0.65 - abs * 0.14);

  return {
    transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: 20 - abs,
    pointerEvents: offset === 0 ? "auto" : "none",
    transition: `transform 0.95s ${EASE}, opacity 0.65s ease, filter 0.65s ease`,
    filter: offset === 0 ? "brightness(1)" : `brightness(${0.55 - abs * 0.08})`,
  };
}

function WhatsAppIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function HeroCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const wheelAcc = useRef(0);
  const [slide, setSlide] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [parallax, setParallax] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 40 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const dragStart = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setSlide((index + TOTAL) % TOTAL);
    setTilt({ x: 0, y: 0 });
  }, []);

  const goPrev = useCallback(() => goTo(slide - 1), [goTo, slide]);
  const goNext = useCallback(() => goTo(slide + 1), [goTo, slide]);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const sync = () => {
      setReducedMotion(mqMotion.matches);
      setIsMobile(mqMobile.matches);
    };
    sync();
    mqMotion.addEventListener("change", sync);
    mqMobile.addEventListener("change", sync);
    return () => {
      mqMotion.removeEventListener("change", sync);
      mqMobile.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(() => goTo(slide + 1), isMobile ? 5000 : 6000);
    return () => clearInterval(id);
  }, [goTo, slide, reducedMotion, paused, isMobile]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = 1 - Math.min(1, Math.max(0, rect.top / (window.innerHeight * 0.85)));
        setParallax(progress);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion || isMobile) return;

    const onWheel = (e: WheelEvent) => {
      if (!el.contains(e.target as Node)) return;
      wheelAcc.current += e.deltaY;
      if (Math.abs(wheelAcc.current) < 70) return;
      if (wheelAcc.current > 0) goNext();
      else goPrev();
      wheelAcc.current = 0;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev, reducedMotion, isMobile]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) < 45) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  const onCardMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x, y });
    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const onCardMouseLeave = () => {
    setGlare({ x: 50, y: 40 });
    setTilt({ x: 0, y: 0 });
  };

  const active = PORTFOLIO[slide];
  const accent = active.accent;
  const whatsappUrl = getWhatsAppUrl("project");
  const whatsappReady = isConfigured(WHATSAPP_NUMBER);
  const maxOffset = isMobile ? 1 : 3;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="premium-coverflow relative flex min-h-screen flex-col overflow-hidden bg-[#030303]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient background — CSS drift on inner orbs so lights move on mobile too */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-[20%] top-[10%] h-[42vh] w-[42vh] md:h-[60vh] md:w-[60vh]"
          style={{ transform: `translateY(${parallax * -30}px)` }}
        >
          <div
            className="premium-ambient-orb h-full w-full rounded-full blur-[40px] transition-[background] duration-[1400ms] md:blur-[120px]"
            style={{ background: accent, opacity: isMobile ? 0.32 : 0.18 }}
          />
        </div>
        <div
          className="absolute -right-[15%] bottom-[20%] h-[36vh] w-[36vh] md:h-[50vh] md:w-[50vh]"
          style={{ transform: `translateY(${parallax * 20}px)` }}
        >
          <div
            className="premium-ambient-orb premium-ambient-orb--b h-full w-full rounded-full blur-[36px] transition-[background] duration-[1400ms] md:blur-[100px]"
            style={{ background: "#6C63FF", opacity: isMobile ? 0.26 : 0.12 }}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
        <div className="premium-particles absolute inset-0 opacity-40" />
      </div>

      {/* Section intro — brand + value proposition */}
      <div className="relative z-[2] mx-auto w-full max-w-4xl shrink-0 px-6 pt-[5.75rem] pb-4 text-center md:pt-[6.5rem] md:pb-6">
        <p className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          ASTRA<span className="text-[#6C63FF]">™</span>
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/45 md:tracking-[0.4em]">
          {BRAND.microcopy}
        </p>
        <h1 className="mt-5 font-display text-2xl font-bold leading-tight text-white md:text-4xl md:leading-[1.15]">
          Tecnología y estrategia para hacer crecer tu negocio.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          Creamos sitios web, campañas en Meta Ads y aplicaciones SaaS para empresas que quieren crecer, vender y digitalizarse.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target={whatsappReady ? "_blank" : undefined}
            rel={whatsappReady ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,211,102,0.35)] transition-all hover:scale-[1.02] hover:bg-[#1ebe5d]"
            data-analytics="cta-hero-primary"
          >
            <WhatsAppIcon />
            Hablemos de tu proyecto
          </a>
          <a
            href="#ecosystem"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
            data-analytics="cta-hero-secondary"
          >
            Descubre lo que hacemos
          </a>
        </div>
      </div>

      {/* Coverflow stage */}
      <div
        className="relative z-[1] flex flex-1 flex-col"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => { dragStart.current = null; }}
      >
        <div className="premium-coverflow-stage mx-auto w-full max-w-[1200px] px-4 select-none">
          <div className="premium-coverflow-track relative mx-auto w-[min(82vw,400px)] aspect-[3/4] md:w-[440px]">
            {PORTFOLIO.map((item, i) => {
              const offset = getOffset(i, slide);
              if (Math.abs(offset) > maxOffset) return null;
              const isActive = offset === 0;
              const style = getCardTransform(offset, reducedMotion);
              const Mockup = PORTFOLIO_MOCKUPS[item.title];
              const tiltStyle: CSSProperties =
                isActive && !reducedMotion && !isMobile
                  ? {
                      transform: `rotateX(${tilt.y * -6}deg) rotateY(${tilt.x * 6}deg)`,
                    }
                  : {};

              return (
                <article
                  key={item.title}
                  className="premium-coverflow-card absolute left-1/2 top-1/2 h-full w-full max-w-none"
                  style={style}
                  aria-hidden={!isActive}
                  aria-label={isActive ? `${item.title} — ${item.industry}` : undefined}
                >
                  <div
                    className="premium-coverflow-card-inner relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl"
                    style={tiltStyle}
                    onMouseMove={isActive ? onCardMouseMove : undefined}
                    onMouseLeave={isActive ? onCardMouseLeave : undefined}
                  >
                    {/* Dynamic shadow */}
                    <div
                      className="premium-coverflow-shadow absolute -inset-4 -z-10 rounded-[2rem] blur-2xl transition-opacity duration-700"
                      style={{ background: item.accent, opacity: isActive ? 0.35 : 0.08 }}
                    />

                    <Mockup className="absolute inset-0" />

                    {/* Subtle depth — mockup stays fully visible */}
                    <div
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                        isActive ? "bg-black/5" : "bg-black/30"
                      }`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

                    {/* Cursor glare */}
                    {isActive && (
                      <div
                        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18) 0%, transparent 55%)`,
                        }}
                      />
                    )}

                    {/* Glass edge */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15 md:rounded-3xl" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Project info — fixed slot below card, crossfade on change */}
        <div className="relative z-[2] mx-auto mt-14 w-full max-w-xl px-6 md:mt-16">
          <div className="relative min-h-[13.5rem] md:min-h-[12.5rem]">
            {PORTFOLIO.map((item, i) => (
              <div
                key={item.title}
                className={`absolute inset-x-0 top-0 text-center transition-all duration-500 ease-out ${
                  i === slide
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0"
                }`}
                aria-hidden={i !== slide}
              >
                <span className="inline-block rounded-full border border-white/15 bg-[#030303]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/75 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md">
                  {item.industry}
                </span>
                <h2 className="mt-5 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                  {item.title}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">{item.description}</p>
                <p
                  className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: item.accent }}
                >
                  <span className="h-px w-6 opacity-60" style={{ backgroundColor: item.accent }} />
                  Diseñado por ASTRA
                  <span className="h-px w-6 opacity-60" style={{ backgroundColor: item.accent }} />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel controls */}
        <div className="relative z-[2] mx-auto mt-8 w-full max-w-2xl px-6 md:mt-10">
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <button
              type="button"
              onClick={goPrev}
              className="group inline-flex min-w-[5.5rem] items-center justify-start gap-2 text-sm text-white/50 transition-colors hover:text-white"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Anterior
            </button>
            <span className="min-w-[4rem] text-center text-xs tabular-nums text-white/35">
              {String(slide + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="group inline-flex min-w-[5.5rem] items-center justify-end gap-2 text-sm text-white/50 transition-colors hover:text-white"
              aria-label="Proyecto siguiente"
            >
              Siguiente
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {PORTFOLIO.map((p, i) => (
              <button
                key={p.title}
                type="button"
                aria-label={`Ver ${p.title}`}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === slide ? "w-8 bg-[#6C63FF]" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center pb-8 md:mt-10 md:pb-10">
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              Explorar portafolio
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Closing band */}
      <div className="relative z-[2] border-t border-white/[0.06] bg-black/50 backdrop-blur-2xl">
        <div className="mx-auto max-w-4xl px-6 py-10 text-center md:py-12">
          <p className="font-display text-lg font-semibold leading-snug text-white md:text-2xl">
            Experiencias digitales que ayudan a crecer — construidas por{" "}
            <span className="text-gradient-cinematic">ASTRA™</span>
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/35">
            {BRAND.microcopy}
          </p>
        </div>
      </div>
    </section>
  );
}
