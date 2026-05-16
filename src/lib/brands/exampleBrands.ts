/**
 * Placeholder brand fixtures used by the IA chrome's static route generation.
 * The real brand catalog is loaded from the `brand-data` sibling repo by a
 * future feature — these exist so `/brand/[slug]` routes resolve at build
 * time and the chrome can be exercised end-to-end.
 */

export interface ExampleBrand {
  slug: string;
  name: string;
  hq: string;
  ownership: string;
}

export const EXAMPLE_BRANDS: ExampleBrand[] = [
  { slug: "hardpan-workshop", name: "Hardpan Workshop", hq: "Denver, CO", ownership: "Family-owned" },
  { slug: "field-and-forge",  name: "Field & Forge",    hq: "Sheffield, UK", ownership: "Worker-owned" },
  { slug: "north-cove-knits", name: "North Cove Knits", hq: "Donegal, IE",   ownership: "Cooperative" },
  { slug: "verdant-press",    name: "Verdant Press",    hq: "Portland, OR",  ownership: "B Corp" },
  { slug: "ironpine-fire",    name: "Ironpine Fire",    hq: "Pittsburgh, PA", ownership: "Independent" },
  { slug: "low-water-co",     name: "Low Water Co.",    hq: "Provence, FR",  ownership: "Family-owned" },
];

export function humanizeBrand(slug: string): string {
  const known = EXAMPLE_BRANDS.find((b) => b.slug === slug);
  if (known) return known.name;
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
