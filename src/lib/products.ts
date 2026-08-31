import heroMobile1 from "@/assets/hero-mobile-1.png";
import heroMobile2 from "@/assets/hero-mobile-2.png";
import heroMobile3 from "@/assets/hero-mobile-3.png";
import heroMobile4 from "@/assets/hero-mobile-4.png";
import heroDesktop1 from "@/assets/hero-desktop-1.png";
import heroDesktop2 from "@/assets/hero-desktop-2.png";
import heroDesktop3 from "@/assets/hero-desktop-3.png";
import heroDesktop4 from "@/assets/hero-desktop-4.png";
import catUnstitched from "@/assets/cat-unstitched.png";
import catReadyToWear from "@/assets/cat-readytowear.png";
import catFancy from "@/assets/cat-fancy.png";
import catPret from "@/assets/cat-pret.png";
import catAccessories from "@/assets/cat-accessories.png";
import productEmbroideredLawn from "@/assets/product-embroidered-lawn.png";
import productPrintedLawn from "@/assets/product-printed-lawn.png";
import productDigitalPrinted from "@/assets/product-digital-printed.png";
import productChiffonSuit from "@/assets/product-chiffon-suit.png";
import productLuxuryPret from "@/assets/product-luxury-pret.png";
import productFestiveVelvet from "@/assets/product-festive-velvet.png";
import productEmeraldSilk from "@/assets/product-emerald-silk.png";
import productEverydayCotton from "@/assets/product-everyday-cotton.png";
import productGoldClutch from "@/assets/product-gold-clutch.png";
import productMarigoldKurta from "@/assets/product-marigold-kurta.png";
import productBlushPret from "@/assets/product-blush-pret.png";
import editEveryday from "@/assets/edit-everyday.png";
import editFestive from "@/assets/edit-festive.png";
import editLuxuryPret from "@/assets/edit-luxury-pret.png";
import storyCraft from "@/assets/story-craft.png";
import bannerModel from "@/assets/banner-model.png";

export const images = {
  heroMobile1,
  heroMobile2,
  heroMobile3,
  heroMobile4,
  heroDesktop1,
  heroDesktop2,
  heroDesktop3,
  heroDesktop4,
  catUnstitched,
  catReadyToWear,
  catFancy,
  catPret,
  catAccessories,
  productEmbroideredLawn,
  productPrintedLawn,
  productDigitalPrinted,
  productChiffonSuit,
  productLuxuryPret,
  productFestiveVelvet,
  productEmeraldSilk,
  productEverydayCotton,
  productGoldClutch,
  productMarigoldKurta,
  productBlushPret,
  editEveryday,
  editFestive,
  editLuxuryPret,
  storyCraft,
  story: storyCraft,
  bannerModel,
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  categorySlug: string;
  fabric: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  gallery: string[];
  badge?: "NEW" | "SALE" | "BEST SELLER";
  description: string;
  inStock: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
};

const sizes = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    slug: "embroidered-lawn-suit",
    name: "Embroidered Lawn Suit",
    price: 4350,
    rating: 4.8,
    reviews: 126,
    category: "Unstitched",
    categorySlug: "unstitched",
    fabric: "Premium Lawn",
    colors: [
      { name: "Sage", hex: "#A9BFA0" },
      { name: "Ivory", hex: "#FFFDF8" },
      { name: "Emerald", hex: "#064E3B" },
    ],
    sizes,
    image: productEmbroideredLawn,
    gallery: [productEmbroideredLawn, catUnstitched, productDigitalPrinted, productPrintedLawn],
    badge: "NEW",
    isNew: true,
    inStock: true,
    bestSeller: true,
    description:
      "A three-piece unstitched lawn suit with delicate thread embroidery across the neckline and hem, finished with a soft chiffon dupatta.",
  },
  {
    slug: "printed-lawn-suit",
    name: "Printed Lawn Suit",
    price: 3250,
    oldPrice: 3950,
    rating: 4.6,
    reviews: 84,
    category: "Ready to Wear",
    categorySlug: "ready-to-wear",
    fabric: "Cotton Lawn",
    colors: [
      { name: "Blush", hex: "#E8C4C9" },
      { name: "Ivory", hex: "#FFFDF8" },
    ],
    sizes,
    image: productPrintedLawn,
    gallery: [productPrintedLawn, catReadyToWear, productEmbroideredLawn],
    badge: "NEW",
    isNew: true,
    inStock: true,
    bestSeller: true,
    description:
      "Everyday ease in a digitally printed lawn shirt with contrast borders — light, breathable and made for warm afternoons.",
  },
  {
    slug: "digital-printed-suit",
    name: "Digital Printed Suit",
    price: 3850,
    rating: 4.5,
    reviews: 61,
    category: "Ready to Wear",
    categorySlug: "ready-to-wear",
    fabric: "Viscose Blend",
    colors: [
      { name: "Marigold", hex: "#E3A11B" },
      { name: "Sage", hex: "#A9BFA0" },
    ],
    sizes,
    image: productDigitalPrinted,
    gallery: [productDigitalPrinted, catReadyToWear, productEmbroideredLawn],
    badge: "NEW",
    isNew: true,
    inStock: true,
    description:
      "A sun-warmed marigold print with tasselled dupatta, cut in a relaxed straight silhouette for effortless day dressing.",
  },
  {
    slug: "embroidered-chiffon-suit",
    name: "Embroidered Chiffon Suit",
    price: 5450,
    oldPrice: 6400,
    rating: 4.9,
    reviews: 143,
    category: "Fancy Collection",
    categorySlug: "fancy",
    fabric: "Chiffon",
    colors: [
      { name: "Lilac", hex: "#C9B4D8" },
      { name: "Emerald", hex: "#064E3B" },
    ],
    sizes,
    image: productChiffonSuit,
    gallery: [productChiffonSuit, catFancy, productFestiveVelvet],
    badge: "NEW",
    isNew: true,
    inStock: true,
    bestSeller: true,
    description:
      "Hand-finished chiffon with tonal embroidery and a scalloped dupatta edge — a quiet statement for evening gatherings.",
  },
  {
    slug: "luxury-pret-collection",
    name: "Luxury Pret Collection",
    price: 6250,
    rating: 4.9,
    reviews: 98,
    category: "Pret Collection",
    categorySlug: "pret",
    fabric: "Silk Blend",
    colors: [
      { name: "Onyx", hex: "#17231F" },
      { name: "Gold", hex: "#C9A96E" },
    ],
    sizes,
    image: productLuxuryPret,
    gallery: [productLuxuryPret, editLuxuryPret, catPret],
    badge: "NEW",
    isNew: true,
    inStock: true,
    bestSeller: true,
    description:
      "Deep black silk panelled with antique gold zari work — our most requested festive silhouette, ready to wear.",
  },
  {
    slug: "festive-velvet-ensemble",
    name: "Festive Velvet Ensemble",
    price: 12900,
    oldPrice: 15900,
    rating: 4.7,
    reviews: 52,
    category: "Fancy Collection",
    categorySlug: "fancy",
    fabric: "Velvet",
    colors: [
      { name: "Maroon", hex: "#6B1F2B" },
      { name: "Gold", hex: "#C9A96E" },
    ],
    sizes,
    image: productFestiveVelvet,
    gallery: [productFestiveVelvet, productLuxuryPret, catFancy],
    badge: "SALE",
    inStock: true,
    bestSeller: true,
    description:
      "Rich velvet with dense gold embroidery across the bodice and sleeves, finished with a matching organza dupatta.",
  },
  {
    slug: "emerald-silk-pret",
    name: "Emerald Silk Pret",
    price: 8950,
    rating: 4.8,
    reviews: 74,
    category: "Pret Collection",
    categorySlug: "pret",
    fabric: "Raw Silk",
    colors: [
      { name: "Emerald", hex: "#064E3B" },
      { name: "Sage", hex: "#A9BFA0" },
    ],
    sizes,
    image: productEmeraldSilk,
    gallery: [productEmeraldSilk, productChiffonSuit, catPret],
    inStock: true,
    bestSeller: true,
    description:
      "A fluid emerald silk kurta with gold border detailing — cut long, worn easy, at home anywhere from dinner to Eid.",
  },
  {
    slug: "everyday-cotton-kurta",
    name: "Everyday Cotton Kurta",
    price: 2450,
    rating: 4.4,
    reviews: 210,
    category: "Ready to Wear",
    categorySlug: "ready-to-wear",
    fabric: "Cotton",
    colors: [
      { name: "Ivory", hex: "#FFFDF8" },
      { name: "Sage", hex: "#A9BFA0" },
    ],
    sizes,
    image: productEverydayCotton,
    gallery: [productEverydayCotton, productPrintedLawn, catReadyToWear],
    inStock: true,
    bestSeller: true,
    description:
      "A clean white cotton kurta with mother-of-pearl buttons and side slits. The uniform piece your wardrobe keeps returning to.",
  },
  {
    slug: "gold-thread-clutch",
    name: "Gold Thread Clutch",
    price: 3150,
    oldPrice: 3900,
    rating: 4.6,
    reviews: 39,
    category: "Accessories",
    categorySlug: "accessories",
    fabric: "Embroidered Satin",
    colors: [{ name: "Emerald", hex: "#064E3B" }],
    sizes: ["One Size"],
    image: productGoldClutch,
    gallery: [productGoldClutch, catAccessories, productLuxuryPret],
    badge: "SALE",
    inStock: true,
    description:
      "Hand-embroidered satin clutch with an antique gold clasp and detachable chain — the finishing note to a festive look.",
  },
  {
    slug: "sage-chikankari-suit",
    name: "Sage Chikankari Suit",
    price: 5150,
    rating: 4.7,
    reviews: 66,
    category: "Unstitched",
    categorySlug: "unstitched",
    fabric: "Lawn Chikankari",
    colors: [
      { name: "Sage", hex: "#A9BFA0" },
      { name: "Ivory", hex: "#FFFDF8" },
    ],
    sizes,
    image: productEmbroideredLawn,
    gallery: [productEmbroideredLawn, catUnstitched, productEverydayCotton],
    inStock: false,
    description:
      "Traditional chikankari worked by hand on soft mint lawn — three pieces, unstitched, ready for your tailor.",
  },
  {
    slug: "marigold-embroidered-kurta",
    name: "Marigold Embroidered Kurta",
    price: 4750,
    rating: 4.5,
    reviews: 45,
    category: "Ready to Wear",
    categorySlug: "ready-to-wear",
    fabric: "Khaddar",
    colors: [{ name: "Marigold", hex: "#E3A11B" }],
    sizes,
    image: productMarigoldKurta,
    gallery: [productMarigoldKurta, productDigitalPrinted, catReadyToWear],
    inStock: true,
    description:
      "Warm marigold khaddar with tonal gold thread work along the placket and cuffs.",
  },
  {
    slug: "blush-pret-drape",
    name: "Blush Pret Drape",
    price: 7250,
    rating: 4.6,
    reviews: 58,
    category: "Pret Collection",
    categorySlug: "pret",
    fabric: "Crepe",
    colors: [{ name: "Blush", hex: "#E8C4C9" }],
    sizes,
    image: productBlushPret,
    gallery: [productBlushPret, productPrintedLawn, catPret],
    inStock: true,
    description:
      "A softly draped blush crepe ensemble with lace trims — understated luxury for daytime celebrations.",
  },
];

export const categories = [
  {
    name: "UNSTITCHED",
    slug: "unstitched",
    image: catUnstitched,
    blurb: "Three-piece lawn & chikankari",
  },
  {
    name: "READY TO WEAR",
    slug: "ready-to-wear",
    image: catReadyToWear,
    blurb: "Stitched and ready to go",
  },
  {
    name: "FANCY COLLECTION",
    slug: "fancy",
    image: catFancy,
    blurb: "Chiffon, velvet & formals",
  },
  {
    name: "PRET COLLECTION",
    slug: "pret",
    image: catPret,
    blurb: "Modern silhouettes",
  },
  {
    name: "ACCESSORIES",
    slug: "accessories",
    image: catAccessories,
    blurb: "Clutches & jewellery",
  },
];

export const theEdit = [
  {
    title: "Everyday Elegance",
    copy: "Soft cottons and quiet detail.",
    image: editEveryday,
    slug: "ready-to-wear",
  },
  {
    title: "Festive Edit",
    copy: "Velvet, zari and celebration.",
    image: editFestive,
    slug: "fancy",
  },
  {
    title: "Luxury Pret",
    copy: "Silk cut for the modern woman.",
    image: editLuxuryPret,
    slug: "pret",
  },
];

export const socialGrid = [
  productEmbroideredLawn,
  productEmeraldSilk,
  productGoldClutch,
  productChiffonSuit,
  productEverydayCotton,
  productLuxuryPret,
];

export const formatPKR = (value: number) =>
  `PKR ${value.toLocaleString("en-PK")}`;

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const bestSellers = products.filter((p) => p.bestSeller);
export const newArrivals = products.filter((p) => p.isNew).slice(0, 5);
export const FREE_DELIVERY_THRESHOLD = 3000;
