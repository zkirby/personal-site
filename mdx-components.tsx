import type { MDXComponents } from "mdx/types";
import cn from "classnames";

const SHARED_STYLE = "font-body md:px-72 sm:px-32 leading-relaxed text-lg py-3";

/**
 * We're leveraging a feature that was really designed to be used for
 * the app router but we're using the page router which is why there's
 * some funky things below like repeated spacing styles.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className={cn(SHARED_STYLE, "font-bold text-2xl")}>{children}</h1>
    ),
    h3: ({ children }) => (
      <h3 className={cn(SHARED_STYLE, "font-bold text-xl")}>{children}</h3>
    ),
    li: ({ children }) => (
      <li className={cn(SHARED_STYLE, "md:px-4")}>{children}</li>
    ),
    ol: ({ children }) => (
      <ol className={cn(SHARED_STYLE, "list-decimal left-5 relative")}>
        {children}
      </ol>
    ),
    p: ({ children }) => <p className={cn(SHARED_STYLE)}>{children}</p>,
    pre: ({ children }) => (
      <pre className={cn("bg-gray-100 md:px-72 py-4")}>{children}</pre>
    ),
    ...components,
  };
}
