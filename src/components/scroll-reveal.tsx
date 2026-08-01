import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "blur" | "scale" | "left" | "right";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  /** Stagger children that have data-reveal-child */
  stagger?: boolean;
  as?: "div" | "section" | "article" | "header";
};

/**
 * Premium scroll reveal — fires once when the block enters the viewport.
 * Mobile uses stronger travel + later trigger so motion reads as clearly as desktop.
 */
export function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  stagger = false,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    // Mobile: wait until more of the block is on screen so the entrance is obvious.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= (mobile ? 0.18 : 0.1)) {
          setVisible(true);
          io.disconnect();
        }
      },
      {
        threshold: mobile ? [0.18, 0.28, 0.4] : [0.1, 0.2],
        rootMargin: mobile ? "0px 0px -18% 0px" : "0px 0px -8% 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`astra-reveal astra-reveal--${variant} ${visible ? "is-visible" : ""} ${stagger ? "astra-reveal--stagger" : ""} ${className}`.trim()}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      data-revealed={visible ? "true" : undefined}
    >
      {children}
    </Tag>
  );
}

/** Thin accent progress bar that tracks page scroll — desktop + mobile. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-transparent md:h-[2px]"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[color:var(--color-accent)] shadow-[0_0_14px_color-mix(in_srgb,var(--color-accent)_75%,transparent)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
