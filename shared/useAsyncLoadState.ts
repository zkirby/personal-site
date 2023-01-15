import { useEffect } from "react";
import useAsyncCall from "./useAsyncCall";

export default function useAsyncLoadState<
  U extends (...any: any[]) => Promise<any>
>(asyncLoadFn: U, initialState = null) {
  const [state, status, loadState, updateState] = useAsyncCall(
    asyncLoadFn,
    initialState
  );

  useEffect(() => {
    loadState();
  }, []);

  return [state, status, updateState];
}
