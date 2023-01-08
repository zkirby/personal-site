import { useState } from "react";

export default function useAsyncCall(asyncLoadFn, initialState) {
  const baseStatus = {
    loading: false,
    isLoaded: false,
    error: null,
  };
  const [status, updateStatus] = useState({
    ...baseStatus,
  });
  const [state, updateState] = useState(initialState);

  async function loadState(...params) {
    try {
      updateStatus({
        loading: true,
        isLoaded: false,
        error: null,
      });

      const newState = await asyncLoadFn(...params);
      updateState(newState);

      updateStatus({
        loading: false,
        isLoaded: true,
        error: null,
      });
    } catch (err) {
      updateStatus({
        loading: false,
        isLoaded: true,
        error: err.message,
      });
    }
  }

  return [state, status, loadState, updateState];
}
