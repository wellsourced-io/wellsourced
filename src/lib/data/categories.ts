/**
 * Placeholder category catalog used by the IA chrome until the real
 * category-data integration lands. The slug list is the source of truth
 * for `/[locale]/categories` (index) and `/[locale]/c/[slug]` (single
 * category) `generateStaticParams`.
 */

export interface Category {
  slug: string;
  name: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  { slug: "home-kitchen",     name: "Home & Kitchen",       blurb: "Cookware, knives, kitchen tools, boards." },
  { slug: "bedding-bath",     name: "Bedding & Bath",       blurb: "Linens, towels, sleepwear, soaps." },
  { slug: "clothing",         name: "Clothing & Apparel",   blurb: "Everyday wear, workwear, basics." },
  { slug: "footwear",         name: "Footwear",             blurb: "Boots, shoes, sandals — built to last." },
  { slug: "bags-accessories", name: "Bags & Accessories",   blurb: "Backpacks, totes, wallets, belts." },
  { slug: "personal-care",    name: "Personal Care",        blurb: "Soap, skincare, oral care, grooming." },
  { slug: "food-pantry",      name: "Food & Pantry",        blurb: "Dry goods, condiments, snacks from independents." },
  { slug: "outdoor",          name: "Outdoor & Recreation", blurb: "Camping, hiking, cycling gear." },
  { slug: "office-stationery", name: "Office & Stationery", blurb: "Notebooks, pens, paper, desk goods." },
  { slug: "kids-baby",        name: "Kids & Baby",          blurb: "Apparel, toys, gear made well for small humans." },
  { slug: "cleaning",         name: "Home Cleaning",        blurb: "Refillable cleaners, brushes, laundry care." },
  { slug: "pets",             name: "Pets",                 blurb: "Food, toys, gear from independent makers." },
];

export const FEATURED_CATEGORY_SLUGS = [
  "home-kitchen",
  "clothing",
  "footwear",
  "bags-accessories",
  "food-pantry",
  "personal-care",
];

export function findCategory(slug: string): Category | null {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function featuredCategories(): Category[] {
  return FEATURED_CATEGORY_SLUGS.map((s) => findCategory(s)).filter(
    (c): c is Category => c !== null,
  );
}
