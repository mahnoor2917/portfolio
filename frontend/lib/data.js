// Central content file for Usama Asghar & Co website.
// To add a product video: paste the YouTube video ID (the part after v= in the URL)
// into the `youtubeId` field for that product, e.g. youtubeId: "dQw4w9WgXcQ"

export const company = {
  name: "Usama Asghar & Co",
  tagline: "Distribution & Retailing Company",
  type: "Wholesale & Supply Store | Foodservice Distributor",
  founded: "1990s",
  owners: ["Malik Asghar", "Malik Zafar"],
  contactPerson: "Usama Malik",
  phones: ["0301-6856800", "0301-8687857"],
  email: "talhamalik0909@gmail.com",
  address: "Sama Satta, Punjab, Pakistan",
  mapLink: "https://maps.app.goo.gl/8hwbysPZjgjPFepW7?g_st=iw",
  serviceArea: "We proudly distribute across Sama Satta and all over Punjab, supplying retailers, wholesalers and foodservice businesses with trusted household brands.",
  mission:
    "To deliver Pakistan's most trusted food, beverage and household brands to every shop and household across Punjab — reliably, affordably, and on time — while building lasting partnerships with the retailers and communities we serve.",
  vision:
    "To become Punjab's leading distribution house, recognized for integrity, wide reach, and unmatched service, connecting quality manufacturers with every corner of the market.",
  values: [
    { title: "Reliability", desc: "On-time delivery across Sama Satta and Punjab, every single time." },
    { title: "Trust", desc: "Decades of relationships built on honesty with brands and retailers alike." },
    { title: "Wide Reach", desc: "A distribution network that reaches deep into every district we serve." },
    { title: "Quality Partners", desc: "We only carry brands that meet real quality and hygiene standards." },
  ],
};

export const categories = [
  {
    slug: "beverages-juices",
    name: "Beverages & Juices",
    description: "Refreshing soft drinks and fruit juices for every season and celebration.",
    icon: "🥤",
  },
  {
    slug: "cooking-oil-banaspati",
    name: "Cooking Oil & Banaspati",
    description: "Premium cooking oils and banaspati trusted in kitchens across Pakistan.",
    icon: "🛢️",
  },
  {
    slug: "detergents-home-care",
    name: "Detergents & Home Care",
    description: "Laundry, dishwashing and home essentials that keep homes spotless.",
    icon: "🧼",
  },
  {
    slug: "pasta-kitchen-essentials",
    name: "Pasta & Kitchen Essentials",
    description: "Pasta, vermicelli, sauces and everyday kitchen partners.",
    icon: "🍝",
  },
  {
    slug: "spices-grocery",
    name: "Spices & Grocery",
    description: "Pure spices and grocery staples for every kitchen.",
    icon: "🌶️",
  },
  {
    slug: "dairy-tea",
    name: "Dairy & Tea Essentials",
    description: "Tea whiteners and dairy essentials for the perfect cup.",
    icon: "☕",
  },
];

export const products = [
  {
    id: "brunos-vermicelli",
    name: "Bruno's Vermicelli",
    brand: "Bruno's Pasta",
    category: "pasta-kitchen-essentials",
    image: "/images/brands/brunos-vermicelli.jpg",
    tagline: "Har khaas mauqay ki mithaas",
    description:
      "Bruno's Colour Vermicelli brings sweetness to every special occasion. Halal certified and packed fresh, it's a festive favourite in households across Pakistan.",
    tags: ["Halal", "400g Pack", "Festive Favourite"],
    youtubeId: "",
  },
  {
    id: "brunos-range",
    name: "Bruno's Pasta Range",
    brand: "Bruno's Pasta",
    category: "pasta-kitchen-essentials",
    image: "/images/brands/brunos-range.jpg",
    tagline: "Sirf pasta nahi, kuch khaas hai",
    description:
      "Bruno's full pasta range — Elbow, Penne, Fusilli, Shell and Twisted Macaroni, flavoured BBQ, Achari, Tikka and 7 Spice Macaroni, plus Cut, Colour and Roasted Vermicelli.",
    tags: ["Macaroni", "Flavoured Range", "Vermicelli"],
    youtubeId: "",
  },
  {
    id: "kite-detergent",
    name: "Kite Detergent Powder Glow",
    brand: "Kite",
    category: "detergents-home-care",
    image: "/images/brands/kite-detergent.jpg",
    tagline: "Kapre chamkaein, ghar mehkaein",
    description:
      "Since 1973 — more than 50 years of excellence. Kite Detergent Glow delivers deep-cleaning power and a lasting fresh fragrance for the whole family's laundry.",
    tags: ["Since 1973", "50+ Years Trusted", "Deep Clean"],
    youtubeId: "",
  },
  {
    id: "kite-range",
    name: "Kite Complete Range",
    brand: "Kite",
    category: "detergents-home-care",
    image: "/images/brands/kite-range.jpg",
    tagline: "Aik naam, teen kaam",
    description:
      "One name, three jobs — Kite Detergent Glow, Dishwash Bar and Safety Matches. A complete home-care range from a brand trusted for over 50 years.",
    tags: ["Detergent", "Dishwash Bar", "Safety Matches"],
    youtubeId: "",
  },
  {
    id: "kite-matches",
    name: "Kite Safety Matches",
    brand: "Kite",
    category: "detergents-home-care",
    image: "/images/brands/kite-matches.jpg",
    tagline: "Kite ke saath har shama roshan",
    description:
      "Carbonised safety matches that light every moment with confidence — safe, reliable, and long-lasting.",
    tags: ["Carbonised", "Safe & Reliable"],
    youtubeId: "",
  },
  {
    id: "popular-maza",
    name: "Popular Ka Maza",
    brand: "Popular Foods",
    category: "beverages-juices",
    image: "/images/brands/popular-maza.jpg",
    tagline: "Made in Pakistan, loved by Pakistan!",
    description:
      "Popular Ka Maza mango fruit drink and its full range of fruit flavours — made with real fruit goodness that Pakistan has loved for over 50 years.",
    tags: ["Mango", "250ml", "50+ Years"],
    youtubeId: "",
  },
  {
    id: "gourmet-range",
    name: "Gourmet Soft Drinks",
    brand: "Gourmet Foods",
    category: "beverages-juices",
    image: "/images/brands/gourmet-sodas.jpg",
    tagline: "Since 1987",
    description:
      "Gourmet Foods' complete carbonated drinks range — Cola, Lemon, Malta, Red Anar, Lychee, Mojito and more. Brand of the Year, ISO 9001 & 22000 certified.",
    tags: ["Since 1987", "ISO Certified", "1.5 Litre"],
    youtubeId: "",
  },
  {
    id: "rifsons-siplay",
    name: "Siplay Juice Collection",
    brand: "Rifsons Food",
    category: "beverages-juices",
    image: "/images/brands/rifsons-siplay.jpg",
    tagline: "Real Fruit, Real Refreshment",
    description:
      "Siplay's Lychee, Mango and Pomegranate fruit drinks — made locally right here in Multan's Industrial Estate Phase 2.",
    tags: ["Multan Made", "Real Fruit"],
    youtubeId: "",
  },
  {
    id: "alhabib-party",
    name: "Party Mango Juice",
    brand: "Al-Habib Foods",
    category: "beverages-juices",
    image: "/images/brands/alhabib-party.jpg",
    tagline: "Order Now!",
    description:
      "Al-Habib Foods' Party Mango Fruit Drink — thick, real mango flavour in every bottle.",
    tags: ["Mango Fruit Drink"],
    youtubeId: "",
  },
  {
    id: "tipka-buddy",
    name: "Tipka Buddy",
    brand: "Al-Habib Foods",
    category: "beverages-juices",
    image: "/images/brands/tipka-buddy.jpg",
    tagline: "Refreshingly Delicious!",
    description:
      "Tipka Buddy fruit drinks in Peach, Pineapple, Mango and Lychee — great taste at just Rs. 50, perfect for on-the-go refreshment.",
    tags: ["Peach", "Pineapple", "Mango", "Lychee", "240ml"],
    youtubeId: "",
  },
  {
    id: "kurak-whitener",
    name: "Kurak Liquid Tea Whitener",
    brand: "Kurak",
    category: "dairy-tea",
    image: "/images/brands/kurak-whitener.jpg",
    tagline: "Chai ka karak mazaa jagayein",
    description:
      "Kurak Liquid Tea Whitener gives your tea that perfect karak taste — smooth, rich and made for the way Pakistan drinks its chai.",
    tags: ["Liquid Whitener", "Rich Taste"],
    youtubeId: "",
  },
  {
    id: "marios-range",
    name: "Mario's Kitchen Range",
    brand: "Mario's",
    category: "pasta-kitchen-essentials",
    image: "/images/brands/marios-range.jpg",
    tagline: "Your Kitchen Partner",
    description:
      "Mario's full kitchen range — Pasta, Macaroni, Spaghetti, Ketchup, Chilli Garlic Sauce, Classic Mayo, Vanilla Custard, Jelly and Lasagne. Everything your kitchen needs.",
    tags: ["Pasta", "Sauces", "Custard", "Jelly"],
    youtubeId: "",
  },
  {
    id: "rite-oil",
    name: "Rite Cooking Oil & Banaspati",
    brand: "Rite",
    category: "cooking-oil-banaspati",
    image: "/images/brands/rite-oil.jpg",
    tagline: "Where Taste Meets Quality",
    description:
      "Rite Cooking Oil and Banaspati — available in pouch, bottle and can formats, trusted for great taste and everyday cooking quality.",
    tags: ["4.5L Bottle", "Pouch & Can"],
    youtubeId: "",
  },
  {
    id: "shahbaz-oil",
    name: "Shahbaz Cooking Oil & Banaspati",
    brand: "Shahbaz",
    category: "cooking-oil-banaspati",
    image: "/images/brands/shahbaz-oil.jpg",
    tagline: "Since 1983",
    description:
      "Shahbaz Cooking Oil and Banaspati, fortified with Vitamins A & D — over 40 years of trusted quality in Pakistani kitchens.",
    tags: ["Since 1983", "Vitamin A & D", "PSMA & HACCP"],
    youtubeId: "",
  },
  {
    id: "shahbaz-spices",
    name: "Shahbaz Spices",
    brand: "Shahbaz",
    category: "spices-grocery",
    image: "/images/brands/shahbaz-spices.jpg",
    tagline: "Pure & Food Grade",
    description:
      "Shahbaz's spice range — Coriander Powder, Red Chilli Powder, Refined Iodized Salt, and Himalayan Pink Salt. Pure, food-grade quality for every recipe.",
    tags: ["Coriander", "Red Chilli", "Salt", "Pink Salt"],
    youtubeId: "",
  },
  {
    id: "commander-range",
    name: "Commander Home & Grocery Range",
    brand: "Commander",
    category: "detergents-home-care",
    image: "/images/brands/commander-range.jpg",
    tagline: "One Name, Many Essentials",
    description:
      "Commander's wide range covering dishwash liquid, detergent powder, banaspati, cooking oil, fruity soaps and Lajawab black tea — a true all-rounder for the household.",
    tags: ["Detergent", "Cooking Oil", "Soap", "Tea"],
    youtubeId: "",
  },
  {
    id: "bulk-sugar",
    name: "Sugar (Bulk 50kg)",
    brand: "Grocery Essentials",
    category: "spices-grocery",
    image: "/images/brands/sugar.jpg",
    tagline: "Bulk Supply Available",
    description:
      "Premium quality sugar supplied in bulk 50kg bags — ideal for retailers, bakeries and foodservice businesses across Punjab.",
    tags: ["50kg Bag", "Bulk Supply"],
    youtubeId: "",
  },
];

export function getProductsByCategory(slug) {
  return products.filter((p) => p.category === slug);
}

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}
