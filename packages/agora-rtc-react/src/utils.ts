import type { MutableRefObject, Ref, RefObject } from "react";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type Disposer = () => void;
export type Fn = (...args: any[]) => any;
export type Nullable<T> = T | null | undefined;
export type MaybePromise<T> = T | PromiseLike<T>;
export type MaybePromiseOrNull<T> = MaybePromise<Nullable<T>>;

export const useIsomorphicLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

export function isPromise<T>(value: MaybePromise<T>): value is PromiseLike<T> {
  return value != null && typeof (value as PromiseLike<T>).then === "function";
}

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
    (ref as MutableRefObject<T>).current = value;
  }
}

/**
 * Sugar to merge ref and setDiv.
 */
export function useForwardRef<T>(ref: Ref<T>): [T | null, (value: T | null) => void] {
  const [current, setCurrent] = useState<T | null>(null);
  const forwardedRef = useCallback(
    (value: T | null) => {
      setCurrent(value);
      applyRef(ref, value);
    },
    [ref, setCurrent],
  );
  return [current, forwardedRef];
}

/**
 * Await a promise or return the value directly.
 */
export function useAwaited<T>(promise: MaybePromise<T>): T | undefined {
  const sp = useSafePromise();
  const [value, setValue] = useState<T | undefined>();

  useIsomorphicLayoutEffect(() => {
    if (isPromise(promise)) {
      sp(promise).then(setValue);
    } else {
      setValue(promise);
    }
  }, [promise, sp]);

  return value;
}

export function invoke<T>(fn: () => T): T | void {
  try {
    return fn();
  } catch (e) {
    console.error(e);
  }
}

export function joinDisposers(disposers: Disposer[]): Disposer {
  return () => disposers.forEach(invoke);
}
