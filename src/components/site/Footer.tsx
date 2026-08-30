import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";

const shop = [
  { label: "New Arrivals", category: "new" },
  { label: "Ready to Wear", category: "ready-to-wear" },
  { label: "Unstitched", category: "unstitched" },
  { label: "Collections", category: "all" },
  { label: "Accessories", category: "accessories" },
  { label: "Sale", category: "sale" },
];

const payments = ["Visa", "Mastercard", "Cash on Delivery", "JazzCash", "Easypaisa"];

export function Footer() {
  return (
    <footer className="bg-[var(--emerald-dark)] text-primary-foreground">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex justify-start">
              <Logo tone="light" className="items-start" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Contemporary Pakistani fashion, crafted with care in Lahore and
              delivered nationwide.
            </p>
          </div>

          <div>
            <h3 className="label-eyebrow text-accent">Shop</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
              {shop.map((item) => (
                <li key={item.label}>
                  <Link
                    to="/shop"
                    search={{ category: item.category }}
                    className="transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-eyebrow text-accent">Help</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
              <li>
                <Link to="/contact" className="transition-colors hover:text-accent">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="transition-colors hover:text-accent">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/faqs" hash="shipping" className="transition-colors hover:text-accent">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link to="/faqs" hash="returns" className="transition-colors hover:text-accent">
                  Returns &amp; Exchange
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="transition-colors hover:text-accent">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="label-eyebrow text-accent">About</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
              <li>
                <Link to="/about" className="transition-colors hover:text-accent">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about" hash="careers" className="transition-colors hover:text-accent">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/about" hash="privacy" className="transition-colors hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about" hash="terms" className="transition-colors hover:text-accent">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="label-eyebrow text-accent">Customer Care</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
              <li className="flex items-center gap-2.5">
                <MessageCircle size={15} className="shrink-0 text-accent" />
                <a href="https://wa.me/923001234567" className="hover:text-accent">
                  WhatsApp +92 300 1234567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-accent" />
                <a href="mailto:care@noore.pk" className="hover:text-accent">
                  care@noore.pk
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-accent" />
                <a href="tel:+92423456789" className="hover:text-accent">
                  +92 42 345 6789
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <p>© 2026 NOORÉ. All Rights Reserved.</p>
          <ul className="flex flex-wrap gap-2">
            {payments.map((p) => (
              <li
                key={p}
                className="border border-primary-foreground/20 px-2.5 py-1 text-[0.6rem] tracking-[0.12em] uppercase"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
