import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { FREE_DELIVERY_THRESHOLD, formatPKR } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, removeItem, updateQty } = useCart();
  const unlocked = subtotal >= FREE_DELIVERY_THRESHOLD;
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div
      className={cn("fixed inset-0 z-[60]", isOpen ? "" : "pointer-events-none")}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={cn(
          "absolute inset-0 bg-foreground/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-[var(--ivory)] transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-serif text-xl tracking-[0.14em] uppercase">
            Shopping Bag
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="grid h-9 w-9 place-items-center"
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-border bg-secondary/60 px-5 py-3">
          <p className="flex items-center gap-2 text-[0.7rem] tracking-wide">
            <Truck size={14} className="shrink-0 text-accent" />
            {unlocked ? (
              <span className="font-medium text-primary">Free delivery unlocked!</span>
            ) : (
              <span className="text-muted-foreground">
                Add {formatPKR(FREE_DELIVERY_THRESHOLD - subtotal)} more for free
                delivery
              </span>
            )}
          </p>
          <div className="mt-2 h-0.5 w-full bg-border">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag size={36} className="text-muted-foreground" strokeWidth={1} />
            <p className="font-serif text-2xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">
              Explore the new season and find something you love.
            </p>
            <Link
              to="/shop"
              search={{ category: "all" }}
              onClick={closeCart}
              className="mt-2 bg-primary px-6 py-3 text-[0.7rem] tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--emerald-dark)]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={80}
                  height={100}
                  className="h-24 w-20 shrink-0 object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                    <Link
                      to="/product/$slug"
                      params={{ slug: item.slug }}
                      onClick={closeCart}
                      className="truncate text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="mt-1 text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                    {item.color} · Size {item.size}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="grid h-8 w-8 place-items-center hover:bg-secondary"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs">{item.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="grid h-8 w-8 place-items-center hover:bg-secondary"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-semibold">
                      {formatPKR(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-[0.7rem] tracking-[0.18em] uppercase">Subtotal</span>
              <span className="font-serif text-2xl">{formatPKR(subtotal)}</span>
            </div>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">
              Taxes and delivery calculated at checkout.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link
                to="/cart"
                onClick={closeCart}
                className="border border-primary px-4 py-3 text-center text-[0.7rem] tracking-[0.2em] text-primary uppercase transition-colors hover:bg-secondary"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="bg-primary px-4 py-3 text-center text-[0.7rem] tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--emerald-dark)]"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
