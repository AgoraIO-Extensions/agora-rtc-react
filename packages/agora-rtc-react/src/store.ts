import type { Disposer } from "./utils";

/** Callback to inform of a value updates. */
export type Subscriber<T> = (value: T) => void;

/** Start and stop notification callbacks. */
export type StartStopNotifier<T> = (set: Subscriber<T>) => Disposer | void;

/** Readable interface for subscribing. */
export interface Readable<T> {
  /**
   * Subscribe on value changes.
   * @param run subscription callback
   */
  subscribe: (this: void, run: Subscriber<T>) => Disposer;
}

export function readable<T>(value: T, start: StartStopNotifier<T>): Readable<T> {
  let stop: Disposer | null | undefined;
  const subscribers = new Set<Subscriber<T>>();

  function set(newValue: T) {
    if (!Object.is(value, newValue)) {
      value = newValue;
      if (stop) {
        for (const subscriber of subscribers) {
          subscriber(value);
        }
      }
    }
  }

  function subscribe(run: Subscriber<T>) {
    subscribers.add(run);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(run);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }

  return { subscribe };
}

function noop() {
  // noop
}
