import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      to="/"
      aria-label="NOORÉ home"
      className={cn("group inline-flex flex-col items-center text-center", className)}
    >
      <svg
        viewBox="0 0 48 18"
        aria-hidden="true"
        className={cn(
          "h-2.5 w-8 sm:h-3.5 sm:w-10 transition-opacity",
          tone === "light" ? "text-accent" : "text-accent",
        )}
      >
        <path
          d="M24 17C24 9 30 3 44 2c0 8-7 14-20 15Z M24 17C24 11 19 6 8 5c0 6 6 11 16 12Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
      <span
        className={cn(
          "font-serif text-lg sm:text-2xl leading-tight tracking-[0.18em] lg:text-[1.75rem]",
          tone === "light" ? "text-primary-foreground" : "text-primary",
        )}
      >
        NOORÉ
      </span>
      <span
        className={cn(
          "text-[0.42rem] sm:text-[0.5rem] tracking-[0.24em] sm:tracking-[0.28em] uppercase",
          tone === "light" ? "text-primary-foreground/70" : "text-muted-foreground",
        )}
      >
        Elegance in Every Thread
      </span>
    </Link>
  );
}
