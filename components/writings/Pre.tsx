export default function Pre({ children }) {
  return (
    <pre className="writing-spacing bg-gray-100 px-4 py-2 rounded-lg shadow whitespace-pre-wrap">
      {children}
    </pre>
  );
}
