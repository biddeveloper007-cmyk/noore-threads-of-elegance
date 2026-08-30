import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { User, Package, Heart, LogOut } from "lucide-react";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-14 space-y-8">
      <div className="border-b border-border pb-6">
        <span className="label-eyebrow text-accent">MY NOORÉ</span>
        <h1 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl uppercase">
          My Account
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Manage your personal details, order history and saved preferences.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="border border-border bg-[var(--ivory)] p-4 space-y-2 self-start">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-left transition-colors ${
              activeTab === "profile" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary"
            }`}
          >
            <User size={14} /> Profile Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-left transition-colors ${
              activeTab === "orders" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary"
            }`}
          >
            <Package size={14} /> Order History
          </button>
        </aside>

        <div className="border border-border bg-card p-6 space-y-6">
          {activeTab === "profile" ? (
            <div className="space-y-4 max-w-md">
              <h2 className="font-serif text-2xl uppercase border-b border-border pb-3">Personal Details</h2>
              <div>
                <label className="block text-xs label-eyebrow mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Ayesha Malik"
                  className="w-full border border-border px-3 py-2 text-xs bg-background"
                />
              </div>
              <div>
                <label className="block text-xs label-eyebrow mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="ayesha.malik@example.com"
                  className="w-full border border-border px-3 py-2 text-xs bg-background"
                />
              </div>
              <div>
                <label className="block text-xs label-eyebrow mb-1">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+92 300 1234567"
                  className="w-full border border-border px-3 py-2 text-xs bg-background"
                />
              </div>
              <button
                type="button"
                className="bg-primary px-6 py-2.5 text-xs text-primary-foreground uppercase tracking-widest"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl uppercase border-b border-border pb-3">Recent Orders</h2>
              <div className="border border-border p-4 flex justify-between items-center text-xs">
                <div>
                  <p className="font-semibold text-primary">#NOORE-849201</p>
                  <p className="text-muted-foreground text-[0.7rem]">Date: 2026-08-28 • 2 Items</p>
                </div>
                <span className="bg-accent/20 text-accent-foreground px-2.5 py-1 font-semibold text-[0.65rem] uppercase">
                  Shipped
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
