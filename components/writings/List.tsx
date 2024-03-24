import { cn } from "../../lib/utils";

export function ListItem({ children }) {
  return <li className="writing-font writing-spacing md:px-4">{children}</li>;
}

export default function List({ children, isOrdered = false }) {
  const ListComponent = isOrdered ? "ol" : "ul";
  return (
    <ListComponent
      className={cn(
        isOrdered ? "list-decimal" : "list-disc",
        "writing-font left-5 relative"
      )}
    >
      {children}
    </ListComponent>
  );
}
