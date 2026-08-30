import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useCart();
  const wishedProducts = products.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-14 space-y-8">
      <div className="border-b border-border pb-6 text-center sm:text-left">
        <span className="label-eyebrow text-accent">SAVED FAVORITES</span>
        <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl uppercase">
          Your Wishlist
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {wishedProducts.length} {wishedProducts.length === 1 ? "item" : "items"} saved for later
        </p>
      </div>

      {wishedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground" strokeWidth={1} />
          <h2 className="font-serif text-2xl">Your wishlist is currently empty</h2>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Click the heart icon on any product to save your favorite luxury Pakistani fashion items here.
          </p>
          <Link
            to="/shop"
            search={{ category: "all" }}
            className="inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase hover:bg-[var(--emerald-dark)]"
          >
            EXPLORE COLLECTIONS <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {wishedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} showRating />
          ))}
        </div>
      )}
    </div>
  );
}
