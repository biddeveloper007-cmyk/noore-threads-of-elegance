import hero from "@/assets/hero.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";
import heroBanner4 from "@/assets/hero-banner-4.jpg";
import catUnstitched from "@/assets/cat-unstitched.jpg";
import catReadyToWear from "@/assets/cat-readytowear.jpg";
import catFancy from "@/assets/cat-fancy.jpg";
import catPret from "@/assets/cat-pret.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import edit1 from "@/assets/edit1.jpg";
import edit2 from "@/assets/edit2.jpg";
import edit3 from "@/assets/edit3.jpg";
import story from "@/assets/story.jpg";
import bannerModel from "@/assets/banner-model.jpg";

export const images = {
  hero,
  heroBanner2,
  heroBanner3,
  heroBanner4,
  catUnstitched,
  catReadyToWear,
  catFancy,
  catPret,
  catAccessories,
  p1,
  p2,
  p3,
  p4,
  p5,
  edit1,
  edit2,
  edit3,
  story,
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
    image: p1,
    gallery: [p1, catUnstitched, p3, p2],
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
    image: p2,
    gallery: [p2, catPret, p1],
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
    image: p3,
    gallery: [p3, catReadyToWear, p1],
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
    image: p4,
    gallery: [p4, catFancy, edit3],
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
    image: p5,
    gallery: [p5, edit2, catAccessories],
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
    image: edit2,
    gallery: [edit2, p5, catFancy],
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
    image: edit3,
    gallery: [edit3, p4, catFancy],
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
    image: edit1,
    gallery: [edit1, p2, catReadyToWear],
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
    image: catAccessories,
    gallery: [catAccessories, p5],
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
    image: catUnstitched,
    gallery: [catUnstitched, p1, edit1],
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
    image: catReadyToWear,
    gallery: [catReadyToWear, p3],
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
    image: catPret,
    gallery: [catPret, p2],
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
    image: edit1,
    slug: "ready-to-wear",
  },
  {
    title: "Festive Edit",
    copy: "Velvet, zari and celebration.",
    image: edit2,
    slug: "fancy",
  },
  {
    title: "Luxury Pret",
    copy: "Silk cut for the modern woman.",
    image: edit3,
    slug: "pret",
  },
];

export const socialGrid = [p1, edit3, catAccessories, p4, edit1, p5];

export const formatPKR = (value: number) =>
  `PKR ${value.toLocaleString("en-PK")}`;

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const bestSellers = products.filter((p) => p.bestSeller);
export const newArrivals = products.filter((p) => p.isNew).slice(0, 5);
export const FREE_DELIVERY_THRESHOLD = 3000;
