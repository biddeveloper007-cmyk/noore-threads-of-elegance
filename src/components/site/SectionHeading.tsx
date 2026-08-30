import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 gap-4 sm:mb-14",
        align === "center"
          ? "flex flex-col items-center text-center"
          : "grid grid-cols-[minmax(0,1fr)_auto] items-end",
        className,
      )}
    >
      <div className={cn("min-w-0", align === "center" && "flex flex-col items-center")}>
        <h2 className="font-serif text-3xl tracking-[0.12em] uppercase sm:text-[2.35rem]">
          {title}
        </h2>
        {align === "center" && (
          <div className="gold-rule mt-3 w-full">
            <svg viewBox="0 0 24 12" aria-hidden="true" className="h-3 w-6 text-accent">
              <path
                d="M12 11C12 6 15 2 22 1c0 5-4 9-10 10Z M12 11C12 7 9 4 2 3c0 4 4 7 10 8Z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
        {subtitle && (
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
