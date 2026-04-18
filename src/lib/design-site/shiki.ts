import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "ts", "jsx", "js", "css", "html", "json", "bash", "mdx"],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  language: string = "tsx",
): Promise<string> {
  const highlighter = await getHighlighter();
  const supported = highlighter.getLoadedLanguages().includes(language);
  return highlighter.codeToHtml(code, {
    lang: supported ? language : "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });
}
