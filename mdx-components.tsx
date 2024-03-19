import type { MDXComponents } from "mdx/types";

/**
 * We're leveraging a feature that was really designed to be used for
 * the app router but we're using the page router which is why there's
 * some funky things below like repeated spacing styles.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-red-400">{children}</h1>,
    ...components,
  };
}
