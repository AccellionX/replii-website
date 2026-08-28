import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
};

export function Logo({
  className,
  markClassName,
  showWordmark = true,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt={showWordmark ? "" : "Replii"}
        width={32}
        height={32}
        className={cn("h-8 w-8 shrink-0 rounded-[9px]", markClassName)}
        priority
      />
      {showWordmark ? (
        <span className="font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-tight text-[var(--text-primary)]">
          Replii
        </span>
      ) : null}
    </span>
  );
}
