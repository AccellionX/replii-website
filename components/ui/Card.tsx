import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  padded?: boolean;
  interactive?: boolean;
};

export function Card({
  children,
  className,
  as: Tag = "div",
  padded = true,
  interactive = false,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]",
        padded && "p-6 sm:p-7",
        interactive &&
          "transition-[border-color,box-shadow] duration-200 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
