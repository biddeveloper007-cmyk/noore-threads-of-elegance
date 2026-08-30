import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  category?: string;
  children?: { label: string; category: string }[];
};

const NAV: NavItem[] = [
  { label: "NEW ARRIVALS", category: "new" },
  {
    label: "CLOTHING",
    category: "all",
    children: [
      { label: "Ready to Wear", category: "ready-to-wear" },
      { label: "Unstitched", category: "unstitched" },
      { label: "Embroidered", category: "fancy" },
    ],
  },
  { label: "UNSTITCHED", category: "unstitched" },
  {
    label: "COLLECTIONS",
    category: "all",
    children: [
      { label: "Summer", category: "ready-to-wear" },
      { label: "Festive", category: "fancy" },
      { label: "Luxury", category: "pret" },
      { label: "Eid Collection", category: "fancy" },
    ],
  },
  { label: "ACCESSORIES", category: "accessories" },
  { label: "SALE", category: "sale" },
];

export function Header() {
  const { count, openCart, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[var(--emerald-dark)] text-primary-foreground">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-6 px-4 py-2 text-[0.65rem] tracking-[0.16em] uppercase sm:justify-between sm:px-8">
          <span className="hidden sm:block" />
          <p className="text-center">Free delivery on orders above PKR 3,000</p>
          <nav className="hidden items-center gap-6 sm:flex">
            <Link to="/contact" className="transition-opacity hover:opacity-70">
              Help &amp; Support
            </Link>
            <Link to="/track-order" className="transition-opacity hover:opacity-70">
              Track Order
            </Link>
          </nav>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-border bg-[var(--ivory)] transition-all duration-300",
          scrolled && "shadow-[0_1px_0_0_var(--border)]",
        )}
      >
        <div
          className={cn(
            "mx-auto grid max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 transition-all duration-300 sm:px-8",
            scrolled ? "py-2" : "py-3.5",
          )}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="-ml-1 grid h-9 w-9 place-items-center lg:hidden"
            >
              <Menu size={20} />
            </button>
            <Logo />
          </div>

          <nav className="hidden items-center justify-center gap-7 lg:flex">
            {NAV.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  to="/shop"
                  search={{ category: item.category ?? "all" }}
                  className="flex items-center gap-1 py-3 text-[0.7rem] tracking-[0.16em] whitespace-nowrap uppercase transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                  {item.children && <ChevronDown size={12} />}
                </Link>
                {item.children && (
                  <div className="invisible absolute top-full left-1/2 w-52 -translate-x-1/2 translate-y-1 border border-border bg-card py-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to="/shop"
                        search={{ category: child.category }}
                        className="block px-4 py-2 text-xs tracking-wide transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <Link
              to="/shop"
              search={{ category: "all" }}
              aria-label="Search products"
              className="grid h-9 w-9 place-items-center transition-colors hover:text-primary"
            >
              <Search size={18} />
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden h-9 w-9 place-items-center transition-colors hover:text-primary sm:grid"
            >
              <User size={18} />
            </Link>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden h-9 w-9 place-items-center transition-colors hover:text-primary sm:grid"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.6rem] text-accent-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping bag, ${count} items`}
              className="relative grid h-9 w-9 place-items-center transition-colors hover:text-primary"
            >
              <ShoppingBag size={18} />
              <span className="absolute top-0.5 right-0 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.6rem] text-primary-foreground">
                {count}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-foreground/40 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-[var(--ivory)] transition-transform duration-300 ease-out",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-4">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-border/60">
                <div className="flex items-center justify-between">
                  <Link
                    to="/shop"
                    search={{ category: item.category ?? "all" }}
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 py-3.5 text-xs tracking-[0.16em] uppercase"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label}`}
                      aria-expanded={openGroup === item.label}
                      onClick={() =>
                        setOpenGroup(openGroup === item.label ? null : item.label)
                      }
                      className="grid h-9 w-9 place-items-center"
                    >
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          openGroup === item.label && "rotate-180",
                        )}
                      />
                    </button>
                  )}
                </div>
                {item.children && openGroup === item.label && (
                  <div className="pb-3 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to="/shop"
                        search={{ category: child.category }}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 text-xs text-muted-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-6 flex flex-col gap-3 text-xs tracking-[0.16em] uppercase">
              <Link to="/account" onClick={() => setMenuOpen(false)}>
                Account
              </Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                Wishlist
              </Link>
              <Link to="/track-order" onClick={() => setMenuOpen(false)}>
                Track Order
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Help &amp; Support
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
