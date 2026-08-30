import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Instagram,
  RotateCcw,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import {
  bestSellers,
  categories,
  formatPKR,
  images,
  newArrivals,
  theEdit,
  socialGrid,
} from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Index,
});

const HERO_SLIDES = [
  {
    tag: "SUMMER COLLECTION 2026",
    title: "ELEGANCE THAT SPEAKS",
    desc: "Discover timeless designs crafted for the modern Pakistani woman.",
    image: images.hero,
    category: "ready-to-wear",
  },
  {
    tag: "FESTIVE EMBROIDERED EDIT",
    title: "GRACE IN EVERY EMBROIDERY",
    desc: "Intricate zari work and hand-finished organza for your special moments.",
    image: images.heroBanner2,
    category: "fancy",
  },
  {
    tag: "LUXURY PRET COLLECTION",
    title: "SILK SILHOUETTES & DRAPES",
    desc: "Fluid textures and understated cuts designed for effortless evening wear.",
    image: images.heroBanner3,
    category: "pret",
  },
  {
    tag: "UNSTITCHED LAWN 2026",
    title: "PURE ARTISTRY & HERITAGE",
    desc: "Three-piece luxury lawn ensembles with embroidered scalloped dupattas.",
    image: images.heroBanner4,
    category: "unstitched",
  },
];

function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  // Auto scroll banners every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const activeSlide = HERO_SLIDES[currentSlide] ?? HERO_SLIDES[0]!;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION - REDESIGNED FOR 100% CLEAR MODEL & DRESS ON MOBILE */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full h-[620px] sm:h-[650px] lg:h-[calc(100vh-110px)] min-h-[580px] max-h-[880px] overflow-hidden bg-[var(--cream)] border-b border-border"
      >
        {/* Background Image Slideshow */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`h-full w-full object-cover object-[center_top] transition-transform duration-[6000ms] ease-out ${
                currentSlide === index ? "scale-105" : "scale-100"
              }`}
            />

            {/* Desktop Gradient Overlay (Left to Right) */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[var(--cream)]/90 via-[var(--cream)]/60 to-transparent sm:w-3/4 lg:w-3/5" />

            {/* Mobile Gradient Overlay (Ultra-subtle bottom vignette ONLY for button contrast - image is 100% clear!) */}
            <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-[var(--cream)]/75 via-transparent via-40% to-transparent" />
          </div>
        ))}

        {/* Hero Content Container - ZERO WHITE BG BOX */}
        <div className="relative z-20 mx-auto flex h-full max-w-[1440px] flex-col justify-end sm:justify-center px-4 pb-20 sm:px-12 sm:pb-0 lg:px-16">
          <div className="max-w-xl space-y-3 sm:space-y-4 p-0">
            <span className="label-eyebrow inline-block text-accent tracking-[0.25em] uppercase font-semibold drop-shadow-xs">
              {activeSlide.tag}
            </span>

            <h1 className="font-serif text-2xl tracking-tight text-foreground sm:text-5xl lg:text-6xl uppercase leading-tight drop-shadow-xs">
              {activeSlide.title}
            </h1>

            <p className="text-xs sm:text-base leading-relaxed text-foreground/90 font-medium sm:text-muted-foreground max-w-md drop-shadow-xs">
              {activeSlide.desc}
            </p>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/shop"
                search={{ category: activeSlide.category }}
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 sm:px-8 sm:py-4 text-[0.7rem] sm:text-xs tracking-[0.2em] text-primary-foreground uppercase transition-all duration-300 hover:bg-[var(--emerald-dark)] shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                SHOP NOW <ArrowRight size={14} />
              </Link>
              <Link
                to="/shop"
                search={{ category: "all" }}
                className="inline-flex items-center gap-2 border border-foreground/40 bg-[var(--cream)]/80 backdrop-blur-xs px-6 py-3 sm:px-8 sm:py-4 text-[0.7rem] sm:text-xs tracking-[0.2em] text-foreground uppercase transition-all duration-300 hover:border-primary hover:text-primary hover:bg-card"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>

          {/* Carousel Progress Indicators & Slide Controls */}
          <div className="absolute bottom-4 sm:bottom-8 inset-x-4 sm:inset-x-12 lg:inset-x-16 flex items-center justify-between pt-3 sm:pt-4 border-t border-foreground/10">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[0.7rem] sm:text-xs font-serif text-primary font-semibold">
                0{currentSlide + 1}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-1.5 transition-all duration-500 ${
                      currentSlide === idx
                        ? "w-7 sm:w-10 bg-primary"
                        : "w-2 sm:w-3 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[0.7rem] sm:text-xs font-serif text-muted-foreground">
                0{HERO_SLIDES.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide(
                    (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
                  )
                }
                aria-label="Previous slide"
                className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center border border-border bg-card/90 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
                }
                aria-label="Next slide"
                className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center border border-border bg-card/90 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICE FEATURES */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Reveal>
          <div className="grid grid-cols-2 border border-border bg-[var(--ivory)] lg:grid-cols-4">
            <div className="flex items-center gap-3 border-r border-b border-border p-5 lg:border-b-0">
              <Truck className="h-6 w-6 text-accent shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                  FREE DELIVERY
                </h4>
                <p className="text-[0.75rem] text-muted-foreground">
                  On orders above PKR 3,000
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-border p-5 lg:border-r lg:border-b-0">
              <RotateCcw className="h-6 w-6 text-accent shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                  EASY RETURNS
                </h4>
                <p className="text-[0.75rem] text-muted-foreground">
                  Within 7 days
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-r border-border p-5">
              <ShieldCheck className="h-6 w-6 text-accent shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                  SECURE PAYMENT
                </h4>
                <p className="text-[0.75rem] text-muted-foreground">
                  100% protected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-5">
              <Headphones className="h-6 w-6 text-accent shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                  24/7 SUPPORT
                </h4>
                <p className="text-[0.75rem] text-muted-foreground">
                  We're here to help
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionHeading title="SHOP BY CATEGORY" eyebrow="COLLECTIONS" />
        <Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to="/shop"
                search={{ category: cat.slug }}
                className="group relative overflow-hidden border border-border bg-card"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--emerald-dark)]/90 via-[var(--emerald-dark)]/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-center text-primary-foreground">
                  <h3 className="font-serif text-lg tracking-wide uppercase sm:text-xl">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-[0.65rem] text-primary-foreground/75 uppercase tracking-wider hidden sm:block">
                    {cat.blurb}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[0.65rem] tracking-[0.18em] text-accent uppercase transition-transform duration-300 group-hover:translate-x-1">
                    SHOP NOW <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 4. NEW ARRIVALS */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="flex items-end justify-between border-b border-border pb-4 mb-8">
          <div>
            <span className="label-eyebrow text-accent">FRESH CUTS</span>
            <h2 className="font-serif text-2xl tracking-wide uppercase sm:text-3xl text-foreground">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            to="/shop"
            search={{ category: "new" }}
            className="group flex items-center gap-1 text-xs tracking-[0.18em] text-primary uppercase hover:text-[var(--emerald-dark)]"
          >
            VIEW ALL{" "}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {newArrivals.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* 5. COLLECTION BANNER */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden border border-border bg-[var(--emerald-deep)] text-primary-foreground">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-16">
                <span className="label-eyebrow text-accent">EXCLUSIVE OFFER</span>
                <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                  Get 10% Off On Your First Order
                </h2>
                <p className="mt-4 max-w-md text-sm text-primary-foreground/80 leading-relaxed">
                  Join the NOORÉ family today and receive 10% off your inaugural online purchase across unstitched and pret edits.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link
                    to="/shop"
                    search={{ category: "all" }}
                    className="inline-flex items-center gap-2 bg-card px-6 py-3 text-xs tracking-[0.2em] text-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    SHOP NOW <ArrowRight size={14} />
                  </Link>
                  <span className="border border-accent/40 px-3 py-1.5 font-serif text-sm tracking-wider text-accent uppercase">
                    10% OFF
                  </span>
                </div>
              </div>

              <div className="relative min-h-[300px] md:min-h-[400px]">
                <img
                  src={images.bannerModel}
                  alt="NOORÉ Exclusive Offer"
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--emerald-deep)] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 6. FEATURED COLLECTION (THE EDIT) */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionHeading
          title="THE EDIT"
          subtitle="Curated styles for every occasion."
          eyebrow="SEASONAL LOOKBOOK"
        />

        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {theEdit.map((item) => (
              <Link
                key={item.title}
                to="/shop"
                search={{ category: item.slug }}
                className="group relative overflow-hidden border border-border bg-card"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--emerald-dark)]/85 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                  <span className="label-eyebrow text-accent">CURATED</span>
                  <h3 className="mt-1 font-serif text-2xl tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-primary-foreground/75">
                    {item.copy}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] text-accent uppercase group-hover:underline">
                    EXPLORE EDIT <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 7. BEST SELLERS */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="flex items-end justify-between border-b border-border pb-4 mb-8">
          <div>
            <span className="label-eyebrow text-accent">MOST LOVED</span>
            <h2 className="font-serif text-2xl tracking-wide uppercase sm:text-3xl text-foreground">
              BEST SELLERS
            </h2>
          </div>
          <Link
            to="/shop"
            search={{ category: "all" }}
            className="flex items-center gap-1 text-xs tracking-[0.18em] text-primary uppercase hover:text-[var(--emerald-dark)]"
          >
            SEE ALL
          </Link>
        </div>

        <Reveal>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {bestSellers.map((product) => (
              <div key={product.slug} className="w-[240px] shrink-0 sm:w-[280px]">
                <ProductCard product={product} showRating />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 8. BRAND STORY */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Reveal>
          <div className="grid items-center gap-8 border border-border bg-[var(--ivory)] lg:grid-cols-2">
            <div className="aspect-[4/3] overflow-hidden lg:aspect-square">
              <img
                src={images.story}
                alt="NOORÉ Brand Story"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-8 sm:p-12 lg:p-16 space-y-6">
              <span className="label-eyebrow text-accent">OUR STORY</span>
              <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
                CRAFTED FOR THE WOMAN YOU ARE.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                NOORÉ celebrates the beauty of Pakistani craftsmanship through contemporary silhouettes, thoughtful details and timeless fabrics. Every collection is designed to bring effortless elegance into the modern woman's wardrobe.
              </p>
              <div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-xs tracking-[0.2em] font-medium text-primary uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  DISCOVER OUR STORY <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 9. INSTAGRAM / SOCIAL SECTION */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionHeading
          title="FOLLOW THE NOORÉ JOURNEY"
          subtitle="@nooreofficial"
          eyebrow="INSTAGRAM"
        />

        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {socialGrid.map((img, i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden border border-border bg-card"
              >
                <img
                  src={img}
                  alt={`NOORÉ Instagram post ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--emerald-dark)]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram className="h-6 w-6 text-accent" />
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 10. NEWSLETTER */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 pb-12">
        <Reveal>
          <div className="border border-border bg-[var(--ivory)] px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="mx-auto max-w-xl space-y-4">
              <span className="label-eyebrow text-accent">JOIN THE NOORÉ CLUB</span>
              <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
                Stay in the NOORÉ circle.
              </h2>
              <p className="text-sm text-muted-foreground">
                Be the first to discover new collections, exclusive offers and seasonal edits.
              </p>

              {subscribed ? (
                <div className="mt-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-medium text-primary">
                  <CheckCircle2 size={18} />
                  Thank you for subscribing! Check your inbox for updates.
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full border border-border bg-card px-4 py-3 text-xs focus:border-primary focus:outline-none sm:w-80"
                  />
                  <button
                    type="submit"
                    className="bg-primary px-8 py-3 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--emerald-dark)]"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
