export type PropDef = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
};

export type ComponentPropsDoc = {
  component: string;
  description?: string;
  props: PropDef[];
};

export const PROPS: Record<string, ComponentPropsDoc> = {
  Button: {
    component: "Button",
    description:
      "Primary call-to-action. Used for commit actions (“Buy Direct”, “Submit”, “Save”).",
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "ghost" | "destructive"',
        default: '"primary"',
        description: "Visual weight. Primary for the one main action per screen.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Height and padding scale.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description:
          "Shows an inline spinner and disables the button. Preserves width.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "HTML disabled; prevents pointer and keyboard activation.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description:
          "When true, passes styling to the immediate child (use for wrapping <a> links).",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Button label. Keep to 1–3 words, sentence case.",
      },
    ],
  },
  Badge: {
    component: "Badge",
    description:
      "A small pill used for status, category tags, and metadata. Not interactive.",
    props: [
      {
        name: "tone",
        type: '"neutral" | "teal" | "success" | "warn" | "err"',
        default: '"neutral"',
        description: "Semantic color. Use sparingly — badges are for metadata, not emphasis.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Badge text. Keep under 20 characters.",
      },
    ],
  },
  TrustBadge: {
    component: "TrustBadge",
    description:
      "Signals verification depth. Gray → Blue → Green maps to T1 (self-reported), T2 (community-verified), T3 (independently audited). Never maps to emotion.",
    props: [
      {
        name: "tier",
        type: '"t1" | "t2" | "t3"',
        required: true,
        description: "Verification tier. T1 self-reported, T2 community, T3 audited.",
      },
      {
        name: "label",
        type: "string",
        description: "Override the default tier label.",
      },
      {
        name: "sourceUrl",
        type: "string",
        description:
          "When provided, the badge becomes a link to the source of the claim.",
      },
    ],
  },
  FilterChip: {
    component: "FilterChip",
    description:
      "Toggleable filter. Appears in rows above search results and on category pages.",
    props: [
      {
        name: "active",
        type: "boolean",
        default: "false",
        description: "Whether the filter is currently applied.",
      },
      {
        name: "onToggle",
        type: "(next: boolean) => void",
        description: "Called when the user toggles the chip.",
      },
      {
        name: "count",
        type: "number",
        description: "Optional count rendered in monospace at the right.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Filter label.",
      },
    ],
  },
  SearchBar: {
    component: "SearchBar",
    description:
      "The primary search entry point. Two variants: hero (landing page) and compact (in-page header).",
    props: [
      {
        name: "variant",
        type: '"hero" | "compact"',
        default: '"hero"',
        description: "Visual size and emphasis.",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Search organic cotton shirts, Japanese denim, …"',
        description: "Hint text. Keep concrete — show real example queries.",
      },
      {
        name: "shortcut",
        type: "string",
        description: 'Keyboard shortcut shown on the right, e.g. "⌘K".',
      },
    ],
  },
  Input: {
    component: "Input",
    description:
      "Text input with label, helper text, and error state. Use <Textarea> for multi-line.",
    props: [
      {
        name: "label",
        type: "string",
        description: "Floating or above-field label.",
      },
      {
        name: "helper",
        type: "string",
        description: "Supporting text below the field. Swapped for errors.",
      },
      {
        name: "error",
        type: "string",
        description: "Error message. Sets invalid state and replaces helper text.",
      },
      {
        name: "...htmlProps",
        type: "InputHTMLAttributes<HTMLInputElement>",
        description: "All native input attributes are forwarded.",
      },
    ],
  },
  Card: {
    component: "Card",
    description:
      "Base surface container. Used as a shell for composed patterns (product card, brand card).",
    props: [
      {
        name: "interactive",
        type: "boolean",
        default: "false",
        description: "Adds hover elevation and cursor treatment.",
      },
      {
        name: "padding",
        type: '"none" | "sm" | "md" | "lg"',
        default: '"md"',
        description: "Internal padding scale.",
      },
    ],
  },
  ProductCard: {
    component: "ProductCard",
    description:
      "Composed card for search/results. Image, title, brand, price, trust badge, and a direct-buy CTA.",
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Product name.",
      },
      {
        name: "brand",
        type: "string",
        required: true,
        description: "Brand display name.",
      },
      {
        name: "price",
        type: "string",
        required: true,
        description: 'Formatted price string, e.g. "$128".',
      },
      {
        name: "tier",
        type: '"t1" | "t2" | "t3"',
        required: true,
        description: "Verification tier.",
      },
      {
        name: "image",
        type: "string",
        description: "Product image URL. Placeholder shown when omitted.",
      },
      {
        name: "buyUrl",
        type: "string",
        required: true,
        description: "Direct link to the brand's store. Opens in new tab.",
      },
    ],
  },
  Skeleton: {
    component: "Skeleton",
    description:
      "Animated placeholder for loading states. Use the exact shape/size of the content it replaces.",
    props: [
      {
        name: "shape",
        type: '"text" | "block" | "circle"',
        default: '"block"',
        description: "Geometry preset.",
      },
      {
        name: "className",
        type: "string",
        description: "Custom size via Tailwind (w-*, h-*).",
      },
    ],
  },
  NavBar: {
    component: "NavBar",
    description:
      "Top-level site navigation. Logo lockup, primary links, and right-aligned utility slot.",
    props: [
      {
        name: "current",
        type: "string",
        description: "Pathname of the current route, for active state.",
      },
    ],
  },
};
