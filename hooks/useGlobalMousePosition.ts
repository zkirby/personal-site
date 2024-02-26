import { useEffect, useState } from "react";

/**
 * Returns the current mouse position
 *
 * @source https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/
 */
const useGlobalMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useGlobalMousePosition;
