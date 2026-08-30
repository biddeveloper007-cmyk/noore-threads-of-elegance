import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Package, Search, Truck, CheckCircle2, Clock } from "lucide-react";
import { formatPKR } from "@/lib/products";

export const Route = createFileRoute("/track-order")({
  component: TrackOrderPage,
});

type OrderStatus = {
  id: string;
  customerName: string;
  status: "Order Placed" | "In Production" | "Shipped" | "Delivered";
  date: string;
  courier: string;
  trackingNo: string;
  estDelivery: string;
  items: string[];
  total: number;
};

export function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<OrderStatus | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (orderNumber.trim()) {
      // Mock result lookup
      setResult({
        id: orderNumber.toUpperCase().startsWith("NOORE-")
          ? orderNumber.toUpperCase()
          : `NOORE-${orderNumber}`,
        customerName: "Ayesha Malik",
        status: "Shipped",
        date: "2026-08-28",
        courier: "TCS Express",
        trackingNo: "TCS-98421049",
        estDelivery: "2026-08-31",
        items: ["Embroidered Lawn Suit (Sage / M)", "Gold Thread Clutch"],
        total: 7500,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-14 space-y-10">
      <div className="text-center space-y-2">
        <span className="label-eyebrow text-accent">REAL-TIME UPDATES</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground uppercase">
          Track Your Order
        </h1>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Enter your NOORÉ order number (e.g. #NOORE-849201) and registered phone number to track your package.
        </p>
      </div>

      <form onSubmit={handleSearch} className="border border-border bg-[var(--ivory)] p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs label-eyebrow text-foreground mb-1">
              Order Reference *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. NOORE-849201"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none uppercase"
            />
          </div>
          <div>
            <label className="block text-xs label-eyebrow text-foreground mb-1">
              Phone / Email *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 03001234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-border bg-card px-3 py-2.5 text-xs focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase hover:bg-[var(--emerald-dark)]"
        >
          TRACK ORDER <Search size={14} />
        </button>
      </form>

      {searched && result && (
        <div className="border border-border bg-card p-6 space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4 border-b border-border pb-4">
            <div>
              <span className="label-eyebrow text-accent">STATUS DETAILS</span>
              <h3 className="font-serif text-2xl text-foreground font-bold">{result.id}</h3>
              <p className="text-xs text-muted-foreground">Order Date: {result.date}</p>
            </div>
            <span className="bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-semibold text-primary uppercase">
              {result.status}
            </span>
          </div>

          {/* Timeline tracker */}
          <div className="grid grid-cols-4 gap-2 text-center text-[0.65rem] uppercase tracking-wider">
            <div className="space-y-2">
              <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Order Placed</span>
            </div>
            <div className="space-y-2">
              <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Quality Check</span>
            </div>
            <div className="space-y-2">
              <Truck className="mx-auto h-5 w-5 text-accent animate-pulse" />
              <span className="font-semibold text-accent">Shipped</span>
            </div>
            <div className="space-y-2">
              <Clock className="mx-auto h-5 w-5 text-muted-foreground opacity-50" />
              <span className="text-muted-foreground">Delivered</span>
            </div>
          </div>

          <div className="border-t border-border pt-4 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Courier Service:</span>
              <span className="font-medium text-foreground">{result.courier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tracking Number:</span>
              <span className="font-mono text-primary font-bold">{result.trackingNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. Delivery Date:</span>
              <span className="font-medium text-foreground">{result.estDelivery}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-serif font-bold text-foreground">{formatPKR(result.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
