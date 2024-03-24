import type { MDXComponents } from "mdx/types";
import { cn } from "./lib/utils";

const SPACING = "mb-3";
const FONT = "font-body leading-relaxed text-lg";

/**
 * We're leveraging a feature that was really designed to be used for
 * the app router but we're using the page router which is why there's
 * some funky things below like repeated spacing styles.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className={cn(SPACING, FONT, "font-bold text-2xl")}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className={cn(SPACING, FONT, "font-bold text-xl")}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className={cn(SPACING, FONT, "font-bold text-lg")}>{children}</h3>
    ),
    li: ({ children }) => (
      <li className={cn(SPACING, FONT, "md:px-4")}>{children}</li>
    ),
    ol: ({ children }) => (
      <ol className={cn(FONT, "list-decimal left-5 relative")}>{children}</ol>
    ),
    ul: ({ children }) => (
      <ol className={cn(FONT, "list-disc left-5 relative")}>{children}</ol>
    ),
    p: ({ children }) => <p className={cn(SPACING, FONT)}>{children}</p>,
    pre: ({ children }) => (
      <pre
        className={cn(
          SPACING,
          "bg-gray-100 px-4 py-2 rounded-lg shadow whitespace-pre-wrap"
        )}
      >
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className={cn("text-sm bg-gray-100 p-1 rounded")}>{children}</code>
    ),
    a: ({ children, href }) => (
      <a
        className={cn(
          SPACING,
          FONT,
          "text-blue-700 hover:text-blue-400 transition-colors"
        )}
        href={href}
        target="_blank"
      >
        {children}
      </a>
    ),
    ...components,
  };
}
