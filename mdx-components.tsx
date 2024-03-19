import type { MDXComponents } from "mdx/types";
import cn from "classnames";

const SPACING = "py-3";
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
    h3: ({ children }) => (
      <h3 className={cn(SPACING, FONT, "font-bold text-xl")}>{children}</h3>
    ),
    li: ({ children }) => (
      <li className={cn(SPACING, FONT, "md:px-4")}>{children}</li>
    ),
    ol: ({ children }) => (
      <ol className={cn(SPACING, FONT, "list-decimal left-5 relative")}>
        {children}
      </ol>
    ),
    p: ({ children }) => <p className={cn(SPACING, FONT)}>{children}</p>,
    pre: ({ children }) => (
      <pre className={cn(SPACING, "bg-gray-100 px-4 rounded-lg shadow")}>
        {children}
      </pre>
    ),
    ...components,
  };
}
