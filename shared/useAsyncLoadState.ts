import { useEffect } from "react";
import useAsyncCall from "./useAsyncCall";

export default function useAsyncLoadState(asyncLoadFn, initialState = null) {
  const [state, status, loadState, updateState] = useAsyncCall(
    asyncLoadFn,
    initialState
  );

  useEffect(() => {
    loadState();
  }, []);

  return [state, status, updateState];
}
