import { cn } from "../../lib/utils";

/**
 * `code` or ```code``` block.
 */
export default function Code({ inline = false, children }) {
  return (
    <code
      className={cn("text-sm bg-gray-100 p-1 rounded", {
        "text-red-600": inline,
      })}
    >
      {children}
    </code>
  );
}
