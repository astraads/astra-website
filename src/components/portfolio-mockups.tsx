import type { CSSProperties, ReactNode } from "react";

import consultingPhoto from "@/assets/portfolio/consulting.jpg";
import dentalPhoto from "@/assets/portfolio/dental.jpg";
import hotelPhoto from "@/assets/portfolio/hotel.jpg";
import legalPhoto from "@/assets/portfolio/legal.jpg";
import medicalPhoto from "@/assets/portfolio/medical.jpg";
import realestatePhoto from "@/assets/portfolio/realestate.jpg";
import restaurantPhoto from "@/assets/portfolio/restaurant.jpg";

type MockupProps = {
  className?: string;
};

function BrowserChrome({
  domain,
  theme = "dark",
}: {
  domain: string;
  theme?: "dark" | "light";
}) {
  const bar = theme === "dark" ? "bg-[#1a1a1a]" : "bg-[#f5f5f7]";
  const url = theme === "dark" ? "bg-white/[0.06] text-white/35" : "bg-black/[0.04] text-black/35";

  return (
    <div className={`flex shrink-0 items-center gap-1.5 border-b border-black/5 px-3 py-2 ${bar}`}>
      <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
      <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
      <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      <div className={`ml-1 flex h-5 flex-1 items-center truncate rounded-md px-2 text-[9px] tracking-wide ${url}`}>
        {domain}
      </div>
    </div>
  );
}

function MockupShell({
  domain,
  theme = "dark",
  className = "",
  style,
  children,
}: {
  domain: string;
  theme?: "dark" | "light";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden bg-[#050505] text-left ${className}`}
      style={style}
    >
      <BrowserChrome domain={domain} theme={theme} />
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-10 bg-gradient-to-t to-transparent ${
          theme === "light" ? "from-white/40" : "from-black/30"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}

function HeroImage({
  src,
  alt,
  overlay = "from-black/70 via-black/20 to-transparent",
}: {
  src: string;
  alt: string;
  overlay?: string;
}) {
  return (
    <div className="absolute inset-0">
      <img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} />
      <div className={`absolute inset-0 bg-gradient-to-t ${overlay}`} />
    </div>
  );
}

export function MedicalClinicMockup({ className }: MockupProps) {
  return (
    <MockupShell domain="meridianhealth.com" theme="light" className={className}>
      <div className="flex h-full flex-col bg-[#fafafa]">
        <header className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-[#0f766e]" />
            <span className="text-[10px] font-semibold tracking-[0.12em] text-[#134e4a]">MERIDIAN</span>
          </div>
          <nav className="hidden gap-3 text-[8px] uppercase tracking-[0.18em] text-[#64748b] sm:flex">
            <span>Specialties</span>
            <span>Physicians</span>
            <span>Locations</span>
          </nav>
          <span className="rounded-full bg-[#0f766e] px-2.5 py-1 text-[8px] font-medium text-white">
            Book visit
          </span>
        </header>

        <div className="relative flex-1">
          <HeroImage
            src={medicalPhoto}
            alt="Premium medical clinic interior"
            overlay="from-[#fafafa] via-[#fafafa]/10 to-transparent"
          />
          <div className="relative flex h-full flex-col justify-end p-4">
            <span className="text-[8px] uppercase tracking-[0.28em] text-[#0f766e]">Private practice</span>
            <h3 className="mt-2 max-w-[14rem] text-[15px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0f172a]">
              Specialist care in a calm, modern environment
            </h3>
            <p className="mt-2 max-w-[12rem] text-[9px] leading-relaxed text-[#64748b]">
              Same-week appointments · Insurance accepted · Telehealth available
            </p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-full bg-[#0f766e] px-3 py-1.5 text-[8px] font-medium text-white">
                Schedule online
              </span>
              <span className="rounded-full border border-[#cbd5e1] px-3 py-1.5 text-[8px] text-[#475569]">
                Meet our team
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-[#e2e8f0] bg-white px-3 py-2.5">
          {["Board certified", "15+ years", "4.9 rating"].map((item) => (
            <div key={item} className="text-center">
              <div className="text-[8px] font-medium text-[#0f172a]">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

export function LuxuryLawFirmMockup({ className }: MockupProps) {
  return (
    <MockupShell domain="blackwellpartners.com" className={className}>
      <div className="relative flex h-full flex-col bg-[#0b1220]">
        <header className="relative z-[1] flex items-center justify-between px-4 py-3">
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#c4a962]">Blackwell & Partners</span>
          <nav className="hidden gap-3 text-[8px] uppercase tracking-[0.16em] text-white/45 sm:flex">
            <span>Practice</span>
            <span>Attorneys</span>
            <span>Insights</span>
          </nav>
        </header>

        <div className="relative flex-1">
          <HeroImage src={legalPhoto} alt="Law firm office" overlay="from-[#0b1220] via-[#0b1220]/55 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-4">
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#c4a962]">Corporate law</span>
            <h3 className="mt-2 max-w-[14rem] text-[15px] font-semibold leading-[1.15] text-white">
              Counsel for matters that define your business
            </h3>
            <p className="mt-2 max-w-[12rem] text-[9px] leading-relaxed text-white/55">
              M&A · Litigation · Governance · Cross-border advisory
            </p>
            <span className="mt-3 inline-flex w-fit border border-[#c4a962]/40 px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-[#c4a962]">
              Request consultation
            </span>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function RealEstateDeveloperMockup({ className }: MockupProps) {
  return (
    <MockupShell domain="aureliadevelopments.com" theme="light" className={className}>
      <div className="flex h-full flex-col bg-white">
        <header className="flex items-center justify-between px-4 py-3">
          <span className="text-[10px] font-semibold tracking-[0.08em] text-[#0f172a]">AURELIA</span>
          <span className="text-[8px] uppercase tracking-[0.18em] text-[#64748b]">Projects</span>
        </header>

        <div className="relative flex-1">
          <HeroImage
            src={realestatePhoto}
            alt="Luxury architecture development"
            overlay="from-white via-transparent to-transparent"
          />
          <div className="relative p-4">
            <span className="text-[8px] uppercase tracking-[0.24em] text-[#0369a1]">New development</span>
            <h3 className="mt-2 max-w-[14rem] text-[15px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0f172a]">
              Residences shaped by architecture and light
            </h3>
            <div className="mt-3 flex rounded-xl border border-[#e2e8f0] bg-white/95 p-2 shadow-sm backdrop-blur-sm">
              <div className="flex-1 border-r border-[#e2e8f0] px-2">
                <div className="text-[7px] uppercase tracking-[0.14em] text-[#94a3b8]">Location</div>
                <div className="text-[8px] font-medium text-[#0f172a]">Paris 16e</div>
              </div>
              <div className="flex-1 px-2">
                <div className="text-[7px] uppercase tracking-[0.14em] text-[#94a3b8]">From</div>
                <div className="text-[8px] font-medium text-[#0f172a]">€1.2M</div>
              </div>
              <span className="self-center rounded-lg bg-[#0f172a] px-2 py-1 text-[7px] text-white">View</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-[#e2e8f0] p-3">
          <div className="rounded-lg bg-[#f8fafc] p-2">
            <div className="text-[7px] uppercase tracking-[0.12em] text-[#64748b]">Delivered</div>
            <div className="text-[11px] font-semibold text-[#0f172a]">24 towers</div>
          </div>
          <div className="rounded-lg bg-[#f8fafc] p-2">
            <div className="text-[7px] uppercase tracking-[0.12em] text-[#64748b]">Pipeline</div>
            <div className="text-[11px] font-semibold text-[#0f172a]">€480M</div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function ModernDentalClinicMockup({ className }: MockupProps) {
  return (
    <MockupShell domain="studiosmiles.fr" theme="light" className={className}>
      <div className="flex h-full flex-col bg-[#f8fffe]">
        <header className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-[#14b8a6]" />
            <span className="text-[10px] font-semibold text-[#115e59]">Studio Smiles</span>
          </div>
          <span className="rounded-full bg-[#ccfbf1] px-2 py-1 text-[8px] font-medium text-[#0f766e]">
            New patients
          </span>
        </header>

        <div className="relative flex-1">
          <HeroImage
            src={dentalPhoto}
            alt="Modern dental clinic"
            overlay="from-[#f8fffe] via-transparent to-transparent"
          />
          <div className="relative flex h-full flex-col justify-end p-4 pb-6">
            <span className="text-[8px] uppercase tracking-[0.24em] text-[#14b8a6]">Cosmetic & general</span>
            <h3 className="mt-2 max-w-[14rem] text-[15px] font-semibold leading-[1.15] text-[#134e4a]">
              Precision dentistry in a serene, technology-led space
            </h3>
            <div className="mt-3 flex max-w-[13rem] flex-wrap gap-1">
              {["Digital scans", "Same-day care"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/90 px-2 py-0.5 text-[7px] text-[#475569] shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function BoutiqueHotelMockup({ className }: MockupProps) {
  return (
    <MockupShell domain="thecalderhouse.com" className={className}>
      <div className="relative flex h-full flex-col bg-[#111]">
        <header className="relative z-[1] flex items-center justify-between px-4 py-3">
          <span className="text-[9px] uppercase tracking-[0.32em] text-white/80">The Calder House</span>
          <span className="text-[8px] uppercase tracking-[0.18em] text-white/40">Suites</span>
        </header>

        <div className="relative flex-1">
          <HeroImage src={hotelPhoto} alt="Boutique luxury hotel" />
          <div className="relative flex h-full flex-col justify-between p-4">
            <div className="ml-auto rounded-full border border-white/15 bg-black/30 px-2 py-1 text-[7px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
              Saint-Germain
            </div>
            <div className="pb-5">
              <span className="text-[8px] uppercase tracking-[0.28em] text-[#d4af37]">Boutique hotel</span>
              <h3 className="mt-2 max-w-[14rem] text-[15px] font-semibold leading-[1.15] text-white">
                An intimate address for discerning travelers
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1.5 text-[8px] font-medium text-[#111]">
                  Check availability
                </span>
                <span className="text-[8px] text-white/50">From €420 / night</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function FineDiningRestaurantMockup({ className }: MockupProps) {
  return (
    <MockupShell domain="maisonlaurent.paris" className={className}>
      <div className="relative flex h-full flex-col bg-[#1a1410]">
        <header className="relative z-[1] flex items-center justify-between px-4 py-3">
          <span className="font-serif text-[11px] italic text-[#f5ebe0]">Maison Laurent</span>
          <span className="text-[8px] uppercase tracking-[0.18em] text-[#f5ebe0]/45">Menu</span>
        </header>

        <div className="relative flex-1">
          <HeroImage
            src={restaurantPhoto}
            alt="Fine dining restaurant"
            overlay="from-[#1a1410] via-[#1a1410]/35 to-transparent"
          />
          <div className="relative flex h-full flex-col justify-end p-4 pb-6">
            <span className="text-[8px] uppercase tracking-[0.28em] text-[#d4a574]">Tasting menu</span>
            <h3 className="mt-2 max-w-[14rem] font-serif text-[15px] leading-[1.15] text-[#f5ebe0]">
              Seasonal cuisine in a candlelit salon
            </h3>
            <p className="mt-2 text-[9px] text-[#f5ebe0]/55">7 courses · Wine pairing · Private dining</p>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function CorporateConsultingMockup({ className }: MockupProps) {
  return (
    <MockupShell domain="northgateadvisory.com" theme="light" className={className}>
      <div className="flex h-full flex-col bg-[#f4f6f8]">
        <header className="flex items-center justify-between px-4 py-3">
          <span className="text-[10px] font-semibold tracking-[0.06em] text-[#111827]">NORTHGATE</span>
          <nav className="hidden gap-3 text-[8px] uppercase tracking-[0.16em] text-[#6b7280] sm:flex">
            <span>Services</span>
            <span>Cases</span>
          </nav>
        </header>

        <div className="relative flex-1 px-4 pb-6">
          <div className="relative h-[42%] overflow-hidden rounded-xl">
            <img src={consultingPhoto} alt="Corporate consulting team" className="h-full w-full object-cover" draggable={false} />
          </div>
          <div className="mt-3">
            <span className="text-[8px] uppercase tracking-[0.22em] text-[#2563eb]">Growth advisory</span>
            <h3 className="mt-1.5 text-[14px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#111827]">
              Strategy, operations and measurable outcomes
            </h3>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Revenue", value: "+38%" },
              { label: "Efficiency", value: "×2.1" },
              { label: "Markets", value: "12" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white p-2 shadow-sm">
                <div className="text-[7px] uppercase tracking-[0.1em] text-[#9ca3af]">{stat.label}</div>
                <div className="text-[11px] font-semibold text-[#111827]">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export const PORTFOLIO_MOCKUPS = {
  "Premium Medical Clinic": MedicalClinicMockup,
  "Luxury Law Firm": LuxuryLawFirmMockup,
  "Real Estate Developer": RealEstateDeveloperMockup,
  "Modern Dental Clinic": ModernDentalClinicMockup,
  "Boutique Hotel": BoutiqueHotelMockup,
  "Fine Dining Restaurant": FineDiningRestaurantMockup,
  "Corporate Consulting": CorporateConsultingMockup,
} as const;
