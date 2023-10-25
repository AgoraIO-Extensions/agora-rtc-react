import { randFirstName, seed } from "@ngneat/falso";
import type { UID } from "agora-rtc-react";
import type { RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";

export const fakeName = (uid: UID): string => {
  seed(String(uid));
  const name = randFirstName();
  seed();
  return name;
};

export const fakeAvatar = (): string => {
  return "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg";
};

export function useIsUnmounted(): RefObject<boolean> {
  const isUnmountRef = useRef(false);
  useEffect(() => {
    isUnmountRef.current = false;
    return () => {
      isUnmountRef.current = true;
    };
  }, []);
  return isUnmountRef;
}

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
