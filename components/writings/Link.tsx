/**
 * [Link description](https://www.example.com)
 */
export default function Link({ children, href }) {
  const internalLink = href.startsWith("/");
  const Component = internalLink ? Link : "a";

  return (
    <Component
      className="text-blue-700 hover:text-blue-400 transition-colors"
      href={href}
      target="_blank"
    >
      {children}
    </Component>
  );
}
