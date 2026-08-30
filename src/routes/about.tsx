import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Heart, ShieldCheck, Feather } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { images } from "@/lib/products";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-14">
      {/* Banner / Header */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="border-b border-border pb-10 text-center">
          <span className="label-eyebrow text-accent">OUR HERITAGE</span>
          <h1 className="mt-2 font-serif text-4xl tracking-tight text-foreground sm:text-6xl uppercase">
            CRAFTED FOR THE WOMAN YOU ARE.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
            NOORÉ is a celebration of Pakistani heritage, fine embroidery, and modern silhouette design — thoughtfully created in the heart of Lahore.
          </p>
        </div>
      </section>

      {/* Main Story Split Section */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden border border-border">
              <img
                src={images.story}
                alt="NOORÉ Craftsmanship"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <span className="label-eyebrow text-accent">THE NOORÉ PHILOSOPHY</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
                Where Tradition Meets Contemporary Elegance
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Founded with a vision to redefine Pakistani fashion for the modern woman, NOORÉ bridges centuries-old textile artistry with clean, minimalist cuts. Each piece is born from a deep appreciation of hand-loom weaving, intricate zardozi, chikankari, and botanical digital prints.
                </p>
                <p>
                  Whether it is an effortless 3-piece unstitched lawn ensemble for sunny afternoons or an opulent velvet drape for festive soirées, our garments are crafted to evoke poise, confidence, and comfort.
                </p>
              </div>

              <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-serif text-2xl text-primary font-semibold">100%</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Authentic Fabrics</p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-primary font-semibold">50+</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Master Artisans</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Values Grid */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="border border-border bg-[var(--ivory)] p-8 sm:p-14">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="label-eyebrow text-accent">WHAT GUIDES US</span>
            <h2 className="font-serif text-3xl uppercase text-foreground">OUR CORE VALUES</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3 p-6 border border-border bg-card">
              <Sparkles className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-foreground">Artisanal Excellence</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every thread and embellishment is inspected by our master craftsmen to ensure heirloom-quality finishing.
              </p>
            </div>

            <div className="space-y-3 p-6 border border-border bg-card">
              <Feather className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-foreground">Comfortable Luxury</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We select soft cotton lawns, pure silk blends, and weightless chiffons designed for day-long wear.
              </p>
            </div>

            <div className="space-y-3 p-6 border border-border bg-card">
              <ShieldCheck className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-foreground">Ethical Atelier</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fair wages, safe working conditions, and sustainable production cycles empower our local artisan communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 text-center">
        <div className="py-12 border-t border-b border-border space-y-4">
          <h2 className="font-serif text-3xl text-foreground">Discover Our Latest Collections</h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Experience elegance in every thread with our newly arrived unstitched and pret ranges.
          </p>
          <Link
            to="/shop"
            search={{ category: "all" }}
            className="inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase hover:bg-[var(--emerald-dark)]"
          >
            SHOP NOW <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
