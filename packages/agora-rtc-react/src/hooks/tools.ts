import { useCallback, useState } from "react";

export function useForceUpdate() {
  const [_, forceUpdate] = useState(0);
  return useCallback(() => forceUpdate(n => (n + 1) | 0), []);
}
