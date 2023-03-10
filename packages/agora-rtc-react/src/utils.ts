import type { Ref, RefObject } from "react";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export type Fn = (...args: any[]) => void;

export const useIsomorphicLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

export function useIsUnmounted(): RefObject<boolean> {
  const isUnmountRef = useRef(false);
  useEffect(
    () => () => {
      isUnmountRef.current = true;
    },
    [],
  );
  return isUnmountRef;
}

/**
 * Leave promise unresolved when the component is unmounted.
 * @example
 * ```ts
 * const sp = useSafePromise()
 * setLoading(true)
 * try {
 *   const result1 = await sp(fetchData1())
 *   const result2 = await sp(fetchData2(result1))
 *   setData(result2)
 * } catch(e) {
 *   setHasError(true)
 * }
 * setLoading(false)
 * ```
 */
export function useSafePromise() {
  const isUnmountRef = useIsUnmounted();

  function safePromise<T, E = unknown>(
    promise: PromiseLike<T>,
    onUnmountedError?: (error: E) => void,
  ) {
    // the async promise executor is intended
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<T>(async (resolve, reject) => {
      try {
        const result = await promise;
        if (!isUnmountRef.current) {
          resolve(result);
        }
        // unresolved promises will be garbage collected.
      } catch (error) {
        if (!isUnmountRef.current) {
          reject(error);
        } else if (onUnmountedError) {
          onUnmountedError(error as E);
        } else {
          if (process.env.NODE_ENV === "development") {
            console.error("An error occurs from a promise after a component is unmounted", error);
          }
        }
      }
    });
  }

  return useCallback(safePromise, [isUnmountRef]);
}

export function applyRef<T>(ref: Ref<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref) {
    (ref as any).current = value;
  }
}
