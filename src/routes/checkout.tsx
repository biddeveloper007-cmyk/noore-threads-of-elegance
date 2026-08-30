import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart";
import { FREE_DELIVERY_THRESHOLD, formatPKR } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Gujranwala",
  "Sialkot",
  "Hyderabad",
  "Abbottabad",
];

function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [placedOrder, setPlacedOrder] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Lahore",
    postalCode: "",
    paymentMethod: "cod",
    notes: "",
  });

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : 200;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `NOORE-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlacedOrder(orderId);
  };

  if (placedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center space-y-6">
        <CheckCircle2 className="mx-auto h-20 w-20 text-primary" />
        <span className="label-eyebrow text-accent">ORDER CONFIRMED</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground">
          Thank you for shopping with NOORÉ!
        </h1>
        <p className="text-sm text-muted-foreground">
          Your order <strong className="text-foreground">#{placedOrder}</strong> has been received and is currently being processed by our Lahore atelier.
        </p>

        <div className="border border-border bg-[var(--ivory)] p-6 text-left space-y-3 text-xs">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Deliver To:</span>
            <span className="font-semibold text-foreground">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Contact:</span>
            <span>{formData.phone} ({formData.email})</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Address:</span>
            <span>{formData.address}, {formData.city}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Payment Method:</span>
            <span className="uppercase font-semibold text-primary">{formData.paymentMethod}</span>
          </div>
          <div className="flex justify-between pt-2 text-sm font-bold">
            <span>Amount Due:</span>
            <span className="text-primary font-serif text-lg">{formatPKR(grandTotal)}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            to="/track-order"
            className="bg-primary px-6 py-3 text-xs tracking-widest text-primary-foreground uppercase hover:bg-[var(--emerald-dark)]"
          >
            Track Order Status
          </Link>
          <Link
            to="/"
            className="border border-border bg-card px-6 py-3 text-xs tracking-widest text-foreground uppercase hover:bg-secondary"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl">No items to checkout</h1>
        <p className="text-xs text-muted-foreground">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          search={{ category: "all" }}
          className="inline-block bg-primary px-6 py-3 text-xs tracking-widest text-primary-foreground uppercase"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12 space-y-8">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary uppercase tracking-widest"
      >
        <ArrowLeft size={14} /> Back to Cart
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
        {/* Shipping & Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl uppercase border-b border-border pb-3">
              1. Delivery Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs label-eyebrow text-foreground mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs label-eyebrow text-foreground mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs label-eyebrow text-foreground mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs label-eyebrow text-foreground mb-1">
                  Phone Number (e.g. 03001234567) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs label-eyebrow text-foreground mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                placeholder="House/Apartment #, Street, Sector/Area"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs label-eyebrow text-foreground mb-1">
                  City *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs label-eyebrow text-foreground mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl uppercase border-b border-border pb-3">
              2. Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between border border-border bg-card p-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="accent-primary"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase">Cash on Delivery (COD)</p>
                    <p className="text-[0.7rem] text-muted-foreground">Pay cash when courier delivers to your doorstep</p>
                  </div>
                </div>
                <Truck size={18} className="text-accent" />
              </label>

              <label className="flex items-center justify-between border border-border bg-card p-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="accent-primary"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase">Credit / Debit Card</p>
                    <p className="text-[0.7rem] text-muted-foreground">Visa, Mastercard — 100% Encrypted</p>
                  </div>
                </div>
                <ShieldCheck size={18} className="text-accent" />
              </label>

              <label className="flex items-center justify-between border border-border bg-card p-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="jazzcash"
                    checked={formData.paymentMethod === "jazzcash"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="accent-primary"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase">JazzCash / Easypaisa</p>
                    <p className="text-[0.7rem] text-muted-foreground">Mobile wallet instant checkout</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase hover:bg-[var(--emerald-dark)]"
          >
            PLACE ORDER NOW
          </button>
        </form>

        {/* Sidebar Summary */}
        <div className="border border-border bg-[var(--ivory)] p-6 space-y-6 self-start">
          <h3 className="font-serif text-xl uppercase border-b border-border pb-3">
            Your Order
          </h3>

          <div className="divide-y divide-border max-h-80 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="h-12 w-10 object-cover border" />
                  <div>
                    <p className="font-medium truncate max-w-[180px]">{item.name}</p>
                    <p className="text-[0.65rem] text-muted-foreground uppercase">
                      {item.size} / {item.color} x {item.qty}
                    </p>
                  </div>
                </div>
                <span className="font-semibold">{formatPKR(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{deliveryFee === 0 ? "FREE" : formatPKR(deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-sm font-bold">
              <span>Total</span>
              <span className="font-serif text-xl text-primary">{formatPKR(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
