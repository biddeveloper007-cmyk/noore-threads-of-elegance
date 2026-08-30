import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPKR, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  showRating = false,
  className,
}: {
  product: Product;
  showRating?: boolean;
  className?: string;
}) {
  const { addItem, wishlist, toggleWishlist } = useCart();
  const wished = wishlist.includes(product.slug);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-border bg-card",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="block"
          aria-label={product.name}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={1000}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="label-eyebrow bg-primary px-2.5 py-1 text-primary-foreground">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="label-eyebrow bg-accent px-2.5 py-1 text-accent-foreground">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="label-eyebrow bg-foreground/80 px-2.5 py-1 text-primary-foreground">
              Sold out
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-foreground transition-all duration-200 hover:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-90"
        >
          <Heart
            size={16}
            className={cn(
              "transition-colors",
              wished && "fill-primary text-primary",
            )}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3 text-center sm:p-4">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="text-[0.8rem] font-medium tracking-wide transition-colors hover:text-primary sm:text-sm"
        >
          {product.name}
        </Link>

        {showRating && (
          <div className="mt-1.5 flex items-center justify-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={cn(
                  i < Math.round(product.rating) ? "fill-accent" : "opacity-30",
                )}
              />
            ))}
            <span className="ml-1 text-[0.65rem] text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        )}

        <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2">
          <span className="text-sm font-semibold tracking-wide">
            {formatPKR(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPKR(product.oldPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => addItem(product)}
          className="mt-3 flex w-full items-center justify-center gap-2 bg-primary px-3 py-2.5 text-[0.7rem] tracking-[0.18em] text-primary-foreground uppercase transition-colors duration-200 hover:bg-[var(--emerald-dark)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          {product.inStock ? "Add to Cart" : "Sold Out"}
          {product.inStock && <ShoppingBag size={13} />}
        </button>
      </div>
    </article>
  );
}
