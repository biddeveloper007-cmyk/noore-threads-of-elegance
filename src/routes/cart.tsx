import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight, Truck, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { FREE_DELIVERY_THRESHOLD, formatPKR } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, removeItem, updateQty } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : 200;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);
  const freeDeliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "NOORE10" || promoCode.trim().toUpperCase() === "FIRST10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setPromoApplied(true);
    } else if (promoCode.trim()) {
      alert("Invalid code. Try 'NOORE10' for 10% off!");
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-24 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" strokeWidth={1} />
          <h1 className="font-serif text-3xl">Your Shopping Bag is Empty</h1>
          <p className="text-sm text-muted-foreground">
            Explore our summer, festive and ready-to-wear collections to curate your wardrobe.
          </p>
          <Link
            to="/shop"
            search={{ category: "all" }}
            className="inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--emerald-dark)]"
          >
            EXPLORE COLLECTIONS <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-14 space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl uppercase">
          Your Shopping Bag
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"} in your bag
        </p>
      </div>

      {/* Free Delivery Bar */}
      <div className="border border-border bg-[var(--ivory)] p-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 font-medium">
            <Truck size={16} className="text-accent" />
            {subtotal >= FREE_DELIVERY_THRESHOLD
              ? "Congratulations! Free Delivery Unlocked"
              : `Add ${formatPKR(FREE_DELIVERY_THRESHOLD - subtotal)} more for FREE Delivery`}
          </span>
          <span className="font-bold">{Math.round(freeDeliveryProgress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-border">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${freeDeliveryProgress}%` }}
          />
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Item List */}
        <div className="divide-y divide-border border-t border-b border-border">
          {items.map((item) => (
            <div key={item.id} className="py-6 flex gap-4 sm:gap-6">
              <Link to="/product/$slug" params={{ slug: item.slug }}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-24 object-cover border border-border"
                />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link
                      to="/product/$slug"
                      params={{ slug: item.slug }}
                      className="font-serif text-lg text-foreground hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                      Color: {item.color} | Size: {item.size}
                    </p>
                  </div>
                  <span className="font-serif text-base font-semibold">
                    {formatPKR(item.price * item.qty)}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-border bg-card">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="grid h-8 w-8 place-items-center hover:bg-secondary"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="grid h-8 w-8 place-items-center hover:bg-secondary"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="border border-border bg-[var(--ivory)] p-6 space-y-6 self-start">
          <h2 className="font-serif text-xl uppercase border-b border-border pb-4">
            Order Summary
          </h2>

          {/* Promo Form */}
          <form onSubmit={applyPromo} className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo Code (NOORE10)"
              disabled={promoApplied}
              className="flex-1 border border-border bg-card px-3 py-2 text-xs uppercase focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={promoApplied}
              className="bg-primary px-4 py-2 text-xs tracking-wider text-primary-foreground uppercase disabled:bg-muted"
            >
              {promoApplied ? <Check size={14} /> : "Apply"}
            </button>
          </form>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">{formatPKR(subtotal)}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-primary font-medium">
                <span>Promo Discount (10%)</span>
                <span>-{formatPKR(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Shipping</span>
              <span>{deliveryFee === 0 ? "FREE" : formatPKR(deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-4 text-sm font-bold text-foreground">
              <span>Grand Total</span>
              <span className="font-serif text-xl text-primary">{formatPKR(grandTotal)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block w-full bg-primary py-4 text-center text-xs tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--emerald-dark)]"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
}
