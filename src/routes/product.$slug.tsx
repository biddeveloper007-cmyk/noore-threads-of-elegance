import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { useCart } from "@/lib/cart";
import { getProduct, products, formatPKR } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const product = getProduct(slug);
  const { addItem, wishlist, toggleWishlist } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-24 text-center">
        <h1 className="font-serif text-3xl">Product Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested fashion piece could not be found.
        </p>
        <Link
          to="/shop"
          search={{ category: "all" }}
          className="mt-6 inline-block bg-primary px-6 py-3 text-xs tracking-widest text-primary-foreground uppercase"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || "Default",
  );
  const [qty, setQty] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("desc");

  const wished = wishlist.includes(product.slug);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem(product, { size: selectedSize, color: selectedColor, qty });
  };

  const handleBuyNow = () => {
    addItem(product, { size: selectedSize, color: selectedColor, qty });
    navigate({ to: "/checkout" });
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-14 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" search={{ category: product.categorySlug }} className="hover:text-primary">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Display: Left Gallery + Right Details */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 label-eyebrow bg-primary px-3 py-1 text-primary-foreground">
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="absolute top-4 right-4 label-eyebrow bg-accent px-3 py-1 text-accent-foreground">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "aspect-[4/5] w-20 shrink-0 border transition-all overflow-hidden",
                    selectedImage === img
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-border opacity-70 hover:opacity-100",
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details */}
        <div className="space-y-6">
          <div>
            <span className="label-eyebrow text-accent">{product.category}</span>
            <h1 className="mt-1 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={cn(
                      i < Math.round(product.rating) ? "fill-accent" : "opacity-30",
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {formatPKR(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPKR(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground border-t border-border pt-4">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="label-eyebrow text-foreground">Color:</span>
              <span className="font-semibold text-primary">{selectedColor}</span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  className={cn(
                    "flex items-center gap-2 border px-3 py-1.5 text-xs transition-colors",
                    selectedColor === c.name
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border bg-card text-foreground hover:border-primary/40",
                  )}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-border"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="label-eyebrow text-foreground">Size:</span>
              <span className="font-semibold text-primary">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={cn(
                    "grid h-10 min-w-10 place-items-center border px-3 text-xs tracking-wider uppercase transition-colors",
                    selectedSize === sz
                      ? "border-primary bg-primary text-primary-foreground font-semibold"
                      : "border-border bg-card text-foreground hover:border-primary",
                  )}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Wishlist */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-border bg-card">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-11 w-11 place-items-center hover:bg-secondary"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center font-serif text-base">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="grid h-11 w-11 place-items-center hover:bg-secondary"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "grid h-11 w-11 place-items-center border transition-colors",
                wished
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary",
              )}
            >
              <Heart size={18} className={cn(wished && "fill-primary")} />
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="grid gap-3 sm:grid-cols-2 pt-2">
            <button
              type="button"
              disabled={!product.inStock}
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-primary py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--emerald-dark)] disabled:cursor-not-allowed disabled:bg-muted"
            >
              {product.inStock ? "Add to Cart" : "Sold Out"}
              {product.inStock && <ShoppingBag size={14} />}
            </button>

            <button
              type="button"
              disabled={!product.inStock}
              onClick={handleBuyNow}
              className="border border-primary bg-transparent py-3.5 text-xs tracking-[0.2em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed"
            >
              BUY NOW
            </button>
          </div>

          {/* Delivery Callout Banner */}
          <div className="flex items-center gap-3 border border-border bg-[var(--ivory)] p-4">
            <Truck className="h-5 w-5 text-accent shrink-0" />
            <p className="text-xs text-foreground uppercase tracking-wider font-medium">
              FREE DELIVERY ON ORDERS ABOVE PKR 3,000
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="divide-y divide-border border-t border-b border-border pt-2">
            {/* Description Accordion */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleAccordion("desc")}
                className="flex w-full items-center justify-between text-left text-xs font-semibold tracking-wider text-foreground uppercase"
              >
                <span>Description &amp; Fit</span>
                {openAccordion === "desc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === "desc" && (
                <div className="mt-3 text-xs leading-relaxed text-muted-foreground space-y-2">
                  <p>{product.description}</p>
                  <p>
                    <strong>Fabric:</strong> {product.fabric}
                  </p>
                  <p>
                    <strong>Silhouette:</strong> Straight cut kurta with tailored trousers and finished edges.
                  </p>
                </div>
              )}
            </div>

            {/* Fabric & Care */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleAccordion("care")}
                className="flex w-full items-center justify-between text-left text-xs font-semibold tracking-wider text-foreground uppercase"
              >
                <span>Fabric &amp; Care</span>
                {openAccordion === "care" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === "care" && (
                <ul className="mt-3 list-disc list-inside text-xs leading-relaxed text-muted-foreground space-y-1">
                  <li>Dry clean recommended for embroidered chiffon & silk pieces.</li>
                  <li>Soft hand wash in cold water for cotton lawn suits.</li>
                  <li>Do not bleach or tumble dry.</li>
                  <li>Warm iron on reverse side.</li>
                </ul>
              )}
            </div>

            {/* Delivery Information */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleAccordion("delivery")}
                className="flex w-full items-center justify-between text-left text-xs font-semibold tracking-wider text-foreground uppercase"
              >
                <span>Delivery Information</span>
                {openAccordion === "delivery" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === "delivery" && (
                <div className="mt-3 text-xs leading-relaxed text-muted-foreground space-y-2">
                  <p>
                    <strong>Domestic Delivery (Pakistan):</strong> 3-5 business days via TCS & Leopard Courier. FREE on orders above PKR 3,000.
                  </p>
                  <p>
                    <strong>International Delivery:</strong> 7-10 business days worldwide.
                  </p>
                </div>
              )}
            </div>

            {/* Returns & Exchange */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleAccordion("returns")}
                className="flex w-full items-center justify-between text-left text-xs font-semibold tracking-wider text-foreground uppercase"
              >
                <span>Returns &amp; Exchange</span>
                {openAccordion === "returns" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === "returns" && (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Hassle-free 7-day exchange window for unused, unwashed items in original tags. Simply contact our support at care@noore.pk or WhatsApp +92 300 1234567.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border pt-12">
          <h2 className="font-serif text-2xl tracking-wide uppercase text-foreground mb-8 text-center sm:text-left">
            YOU MAY ALSO LIKE
          </h2>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} showRating />
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}
