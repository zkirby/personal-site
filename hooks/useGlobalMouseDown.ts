import { useEffect, useState } from "react";

/**
 * Calls a function whenever the user clicks the mouse.
 *
 * NOTE: We use 'click' instead of 'mousedown' because 'mousedown' will fire
 * even if the user clicks on a button, which means we can't stop propagation
 * without ensuring that the button also uses 'onMouseDown' and stops propagation.
 */
const useGlobalMouseDown = (cb: (e: MouseEvent) => void) => {
  useEffect(() => {
    window.addEventListener("click", cb);

    return () => {
      window.removeEventListener("click", cb);
    };
  }, []);
};

export default useGlobalMouseDown;
