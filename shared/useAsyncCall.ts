import { useState } from "react";

interface Status {
  loading: boolean;
  isLoaded: boolean;
  error: string | null;
}

export default function useAsyncCall<U extends (...any: any[]) => Promise<any>>(
  asyncLoadFn: U,
  initialState
): [ReturnType<U>, Status, any, any] {
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
