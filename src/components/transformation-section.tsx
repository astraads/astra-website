import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const INSIGHT_CARDS = [
  {
    label: "Tiempo",
    title: "El mercado no espera",
    desc: "Cada día sin estrategia es tráfico y oportunidades que captura tu competencia.",
  },
  {
    label: "Esfuerzo",
    title: "Más horas no bastan",
    desc: "Trabajar más no convierte si tu presencia digital no guía al cliente hasta la acción.",
  },
  {
    label: "Conversión",
    title: "Visitantes → Clientes",
    desc: "Un sistema digital diseñado para transformar interés en reservas, leads y ventas.",
  },
] as const;

function InsightBorderCard({
  active,
  delay,
  children,
}: {
  active: boolean;
  delay: number;
  children: ReactNode;
}) {
  return (
    <div
      className="insight-border-card relative overflow-hidden rounded-2xl p-px"
      data-active={active ? "true" : undefined}
      style={{ "--border-delay": `${delay}s` } as CSSProperties}
    >
      {/* Real node (not ::before) — Safari mobile often freezes pseudo-element orbit animations */}
      <div className="insight-border-card__beam pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
        <div className="insight-border-card__spin" />
        <div className="insight-border-card__shimmer" />
      </div>
      <div className="cz-glass insight-border-card__inner relative z-[1] rounded-[calc(1rem-1px)] px-6 py-7 text-center md:px-7 md:py-8">
        {children}
      </div>
    </div>
  );
}

function useInView<T extends HTMLElement>(threshold = 0.08) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= (mobile ? 0.16 : threshold)) {
          setInView(true);
          io.disconnect();
        }
      },
      {
        threshold: mobile ? [0.16, 0.28, 0.4] : [threshold, 0.2],
        rootMargin: mobile ? "0px 0px -16% 0px" : "0px 0px -5% 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const factor = mobile ? speed * 1.35 : speed;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        if (rect.bottom < 0 || rect.top > viewH) return;
        const progress = (viewH - rect.top) / (viewH + rect.height);
        el.style.transform = `translate3d(0, ${(progress - 0.5) * factor * 100}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}

export function TransformationSection() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>(0.12);
  const parallaxRef = useParallax(0.45);

  return (
    <div className="cinematic-zone-outer">
      <section
        ref={sectionRef}
        id="transformation"
        aria-labelledby="transformation-heading"
        className="cinematic-zone relative overflow-hidden"
      >
        <div ref={parallaxRef} className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden="true">
          <div className="absolute inset-0 cz-scrim-base" />
          <div className="absolute inset-0 cz-scrim-gradient" />
          <div className="absolute inset-0 cz-scrim-radial" />
          <div
            className="absolute -left-[10%] top-[15%] h-[32vh] w-[32vh] rounded-full opacity-35 blur-[40px] md:h-[40vh] md:w-[40vh] md:opacity-20 md:blur-[100px]"
            style={{ background: "var(--cz-accent)" }}
          />
          <div
            className="absolute -right-[8%] bottom-[10%] h-[28vh] w-[28vh] rounded-full opacity-[0.2] blur-[36px] md:h-[35vh] md:w-[35vh] md:opacity-10 md:blur-[90px]"
            style={{ background: "#ffffff" }}
          />
        </div>

        <div className="relative z-[1] mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-center px-6 py-28 md:py-36">
          <div
            className={`mx-auto max-w-4xl text-center transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-[0.96] opacity-0 md:translate-y-10 md:scale-100"
            }`}
          >
            <h2
              id="transformation-heading"
              className="font-display text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
            >
              Cada día que esperas, otro negocio está captando a tus clientes.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base cz-muted leading-relaxed md:text-lg md:leading-relaxed">
              No necesitas trabajar más. Necesitas una estrategia digital diseñada para convertir
              visitantes en clientes.
            </p>
          </div>

          <div
            className={`mx-auto mt-14 grid w-full max-w-5xl grid-cols-1 gap-4 transition-[opacity,transform] duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:grid-cols-3 md:mt-16 md:gap-6 ${
              inView
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-10 scale-[0.97] opacity-0 md:translate-y-8 md:scale-100"
            }`}
          >
            {INSIGHT_CARDS.map((card, i) => (
              <div
                key={card.label}
                className="transition-all duration-700"
                style={{ transitionDelay: inView ? `${300 + i * 120}ms` : "0ms" }}
              >
                <InsightBorderCard active={inView} delay={i * 1.35}>
                  <div className="text-[10px] uppercase tracking-[0.28em] cz-label">{card.label}</div>
                  <div className="mt-3 font-display text-lg font-semibold md:text-xl">{card.title}</div>
                  <p className="mt-3 text-sm cz-muted leading-relaxed">{card.desc}</p>
                </InsightBorderCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .insight-border-card__inner {
          background: var(--cz-glass-bg);
        }

        .insight-border-card__spin {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 180%;
          height: 180%;
          margin-left: -90%;
          margin-top: -90%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 250deg,
            var(--cz-accent) 290deg,
            rgba(255, 255, 255, 0.95) 312deg,
            var(--cz-accent) 335deg,
            transparent 360deg
          );
          opacity: 0;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          /* Do NOT use animation-play-state — Safari iOS often never resumes it */
        }

        .insight-border-card__shimmer {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          background: radial-gradient(
            ellipse 55% 40% at 20% 30%,
            color-mix(in srgb, var(--cz-accent) 55%, transparent),
            transparent 70%
          );
          transform: translate3d(-30%, 0, 0);
          will-change: transform, opacity;
          pointer-events: none;
        }

        .insight-border-card[data-active="true"] .insight-border-card__spin {
          opacity: 1;
          animation: insight-border-orbit 3.6s linear infinite;
          animation-delay: var(--border-delay, 0s);
        }

        .insight-border-card[data-active="true"] .insight-border-card__shimmer {
          opacity: 0.85;
          animation: insight-shimmer-sweep 4.2s ease-in-out infinite;
          animation-delay: var(--border-delay, 0s);
        }

        .insight-border-card[data-active="true"] {
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--cz-accent) 28%, transparent),
            0 12px 40px -16px color-mix(in srgb, var(--cz-accent) 40%, transparent);
        }

        @keyframes insight-border-orbit {
          from {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          to {
            transform: translate3d(0, 0, 0) rotate(360deg);
          }
        }

        @keyframes insight-shimmer-sweep {
          0%,
          100% {
            transform: translate3d(-35%, 8%, 0) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translate3d(35%, -6%, 0) scale(1.15);
            opacity: 0.9;
          }
        }

        /* Mobile: faster, more obvious motion (phones throttle heavy conic spins) */
        @media (max-width: 767px) {
          .insight-border-card[data-active="true"] .insight-border-card__spin {
            width: 220%;
            height: 220%;
            margin-left: -110%;
            margin-top: -110%;
            animation-duration: 2.4s;
          }

          .insight-border-card[data-active="true"] .insight-border-card__shimmer {
            animation-duration: 2.8s;
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .insight-border-card[data-active="true"] .insight-border-card__spin {
            animation: none !important;
            opacity: 0.55;
            transform: rotate(40deg);
          }

          .insight-border-card[data-active="true"] .insight-border-card__shimmer {
            animation: none !important;
            opacity: 0.4;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
