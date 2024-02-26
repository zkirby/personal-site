import { useEffect, useState } from "react";

/**
 * Calls a function whenever the user clicks the mouse
 */
const useGlobalMouseDown = (cb: (e: MouseEvent) => void) => {
  useEffect(() => {
    window.addEventListener("mousedown", cb);

    return () => {
      window.removeEventListener("mousedown", cb);
    };
  }, []);
};

export default useGlobalMouseDown;
