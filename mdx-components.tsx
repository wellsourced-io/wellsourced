import type { MDXComponents } from "mdx/types";
import { MDXHeading } from "@/components/design-site/MDXHeading";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <MDXHeading level={1} {...props} />,
    h2: (props) => <MDXHeading level={2} {...props} />,
    h3: (props) => <MDXHeading level={3} {...props} />,
    h4: (props) => <MDXHeading level={4} {...props} />,
    ...components,
  };
}
