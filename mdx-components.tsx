import type { MDXComponents } from "mdx/types";

import Code from "@/components/writings/Code";
import Link from "@/components/writings/Link";
import List, { ListItem } from "@/components/writings/List";
import Pre from "@/components/writings/Pre";

/**
 * We're leveraging a feature that was really designed to be used for
 * the app router but we're using the page router which is why there's
 * some funky things below like repeated spacing styles.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="writing-font writing-spacing font-bold text-2xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="writing-font writing-spacing mt-5 font-bold text-xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="writing-font writing-spacing font-bold text-lg">
        {children}
      </h3>
    ),
    li: ({ children }) => <ListItem>{children}</ListItem>,
    ol: ({ children }) => <List isOrdered>{children}</List>,
    ul: ({ children }) => <List>{children}</List>,
    p: ({ children }) => (
      <p className="writing-spacing writing-font">{children}</p>
    ),
    pre: ({ children }) => <Pre>{children}</Pre>,
    code: ({ children }) => (
      // An inaccurate approximation of if the code block is inline, but it works for now.
      <Code children={children} inline={!children.toString().includes("\n")} />
    ),
    a: ({ children, href }) => <Link href={href} children={children} />,
    ...components,
  };
}
