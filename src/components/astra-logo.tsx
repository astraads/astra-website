import logoAstra from "@/assets/logo-astra.png";
import { cn } from "@/lib/utils";

type AstraLogoProps = {
  className?: string;
  /** Show wordmark next to the mark */
  withWordmark?: boolean;
  /** Force light-on-dark mark treatment */
  inverted?: boolean;
};

export function AstraLogo({ className, withWordmark = true, inverted = false }: AstraLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={logoAstra}
        alt="ASTRA"
        width={28}
        height={28}
        className={cn(
          "h-7 w-7 object-contain",
          inverted && "brightness-0 invert",
        )}
        decoding="async"
      />
      {withWordmark && (
        <span className="font-display text-xl font-bold tracking-tight">
          ASTRA<span className="text-[color:var(--color-accent)]">™</span>
        </span>
      )}
    </span>
  );
}
