import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { products, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ShopSearch = {
  category?: string;
  search?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: (search["category"] as string) || "all",
    search: (search["search"] as string) || "",
  }),
  component: ShopPage,
});

const CATEGORY_OPTIONS = [
  { label: "All Collections", value: "all" },
  { label: "New Arrivals", value: "new" },
  { label: "Unstitched", value: "unstitched" },
  { label: "Ready to Wear", value: "ready-to-wear" },
  { label: "Fancy Collection", value: "fancy" },
  { label: "Pret Collection", value: "pret" },
  { label: "Accessories", value: "accessories" },
  { label: "Sale", value: "sale" },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

const COLORS = [
  { name: "Emerald", hex: "#064E3B" },
  { name: "Gold", hex: "#C9A96E" },
  { name: "Sage", hex: "#A9BFA0" },
  { name: "Ivory", hex: "#FFFDF8" },
  { name: "Blush", hex: "#E8C4C9" },
  { name: "Onyx", hex: "#17231F" },
  { name: "Marigold", hex: "#E3A11B" },
];

function ShopPage() {
  const searchParams = Route.useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.category || "all",
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(16000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.search || "");

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName],
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(16000);
    setOnlyInStock(false);
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory === "new") {
          if (!p.isNew) return false;
        } else if (selectedCategory === "sale") {
          if (p.badge !== "SALE" && !p.oldPrice) return false;
        } else if (selectedCategory !== "all") {
          if (p.categorySlug !== selectedCategory) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchFabric) return false;
        }

        // Size filter
        if (selectedSizes.length > 0) {
          const hasSize = p.sizes.some((s) => selectedSizes.includes(s));
          if (!hasSize) return false;
        }

        // Color filter
        if (selectedColors.length > 0) {
          const hasColor = p.colors.some((c) => selectedColors.includes(c.name));
          if (!hasColor) return false;
        }

        // Price filter
        if (p.price > maxPrice) return false;

        // In Stock filter
        if (onlyInStock && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === "bestselling")
          return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
        return 0; // featured
      });
  }, [
    selectedCategory,
    searchQuery,
    selectedSizes,
    selectedColors,
    maxPrice,
    onlyInStock,
    sortBy,
  ]);

  const activeCategoryTitle =
    CATEGORY_OPTIONS.find((c) => c.value === selectedCategory)?.label || "Collection";

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12">
      {/* Header Banner */}
      <div className="border-b border-border pb-8 text-center sm:text-left">
        <span className="label-eyebrow text-accent">NOORÉ CATALOG</span>
        <h1 className="mt-1 font-serif text-3xl tracking-tight text-foreground sm:text-5xl uppercase">
          {activeCategoryTitle}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Explore handcrafted Pakistani ensembles — from breathable unstitched lawn to intricately embroidered festive formals and luxury pret silhouettes.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden space-y-8 lg:block">
          {/* Search filter input */}
          <div className="space-y-2">
            <h3 className="label-eyebrow text-foreground">Search</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-border bg-card px-3 py-2 text-xs focus:border-primary focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h3 className="label-eyebrow text-foreground">Category</h3>
            <div className="space-y-1">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={cn(
                    "block w-full text-left py-1.5 text-xs transition-colors hover:text-primary",
                    selectedCategory === cat.value
                      ? "font-semibold text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-3 border-t border-border pt-6">
            <h3 className="label-eyebrow text-foreground">Size</h3>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={cn(
                      "grid h-8 min-w-8 place-items-center border px-2 text-xs tracking-wider transition-colors",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground font-medium"
                        : "border-border bg-card text-foreground hover:border-primary/50",
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-3 border-t border-border pt-6">
            <h3 className="label-eyebrow text-foreground">Color</h3>
            <div className="flex flex-wrap gap-2.5">
              {COLORS.map((c) => {
                const isSelected = selectedColors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => toggleColor(c.name)}
                    title={c.name}
                    aria-label={`Filter by ${c.name}`}
                    className={cn(
                      "group relative h-6 w-6 rounded-full border border-border shadow-xs transition-transform hover:scale-110",
                      isSelected && "ring-2 ring-primary ring-offset-2",
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <h3 className="label-eyebrow text-foreground">Max Price</h3>
              <span className="text-xs font-semibold text-primary">
                PKR {maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="16000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Availability Filter */}
          <div className="space-y-3 border-t border-border pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-primary"
              />
              In Stock Only
            </label>
          </div>

          {/* Clear Filters CTA */}
          <button
            type="button"
            onClick={clearFilters}
            className="w-full border border-border bg-card py-2 text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Reset Filters
          </button>
        </aside>

        {/* Right Main Product Grid Area */}
        <div>
          {/* Top Bar: Results count & Sort & Mobile Filter toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 border border-border bg-card px-4 py-2 text-xs tracking-wider text-foreground uppercase lg:hidden"
              >
                <SlidersHorizontal size={14} /> Filter
              </button>
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-by" className="text-xs text-muted-foreground uppercase tracking-wider">
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-border bg-card px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bestselling">Best Selling</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedSizes.length > 0 ||
            selectedColors.length > 0 ||
            selectedCategory !== "all" ||
            onlyInStock ||
            searchQuery.trim()) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 bg-secondary px-2.5 py-1 text-[0.65rem] text-secondary-foreground uppercase tracking-wider">
                  Cat: {selectedCategory}
                  <X
                    size={12}
                    className="cursor-pointer hover:text-destructive"
                    onClick={() => setSelectedCategory("all")}
                  />
                </span>
              )}
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1 bg-secondary px-2.5 py-1 text-[0.65rem] text-secondary-foreground uppercase tracking-wider">
                  Search: "{searchQuery}"
                  <X
                    size={12}
                    className="cursor-pointer hover:text-destructive"
                    onClick={() => setSearchQuery("")}
                  />
                </span>
              )}
              {selectedSizes.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 bg-secondary px-2.5 py-1 text-[0.65rem] text-secondary-foreground uppercase tracking-wider"
                >
                  Size: {s}
                  <X
                    size={12}
                    className="cursor-pointer hover:text-destructive"
                    onClick={() => toggleSize(s)}
                  />
                </span>
              ))}
              {selectedColors.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 bg-secondary px-2.5 py-1 text-[0.65rem] text-secondary-foreground uppercase tracking-wider"
                >
                  Color: {c}
                  <X
                    size={12}
                    className="cursor-pointer hover:text-destructive"
                    onClick={() => toggleColor(c)}
                  />
                </span>
              ))}
              <button
                type="button"
                onClick={clearFilters}
                className="text-[0.65rem] font-semibold text-primary underline hover:text-[var(--emerald-dark)]"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="my-16 text-center space-y-4">
              <Filter className="mx-auto h-10 w-10 text-muted-foreground" strokeWidth={1} />
              <h3 className="font-serif text-xl">No products match your criteria</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try clearing your filters or search term to discover our full collection.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-block bg-primary px-6 py-2.5 text-xs tracking-widest text-primary-foreground uppercase hover:bg-[var(--emerald-dark)]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <Reveal className="mt-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} showRating />
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-[var(--ivory)] p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-serif text-xl uppercase">Filters</h2>
              <button type="button" onClick={() => setMobileFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h3 className="label-eyebrow text-foreground mb-2">Category</h3>
              <div className="space-y-1">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      setMobileFilterOpen(false);
                    }}
                    className={cn(
                      "block w-full text-left py-1.5 text-xs",
                      selectedCategory === cat.value
                        ? "font-semibold text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Sizes */}
            <div className="border-t border-border pt-4">
              <h3 className="label-eyebrow text-foreground mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={cn(
                      "grid h-8 min-w-8 place-items-center border px-2 text-xs",
                      selectedSizes.includes(size)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Colors */}
            <div className="border-t border-border pt-4">
              <h3 className="label-eyebrow text-foreground mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => toggleColor(c.name)}
                    className={cn(
                      "h-7 w-7 rounded-full border border-border",
                      selectedColors.includes(c.name) && "ring-2 ring-primary ring-offset-2",
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-primary py-3 text-xs tracking-widest text-primary-foreground uppercase"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
