import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "type-eyebrow mb-3",
            inverse && "text-[var(--accent-mint)]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "type-section",
          inverse && "text-[var(--text-inverse)]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "type-body-muted prose-width mt-4",
            align === "center" && "mx-auto",
            inverse && "text-[var(--text-inverse)]/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
