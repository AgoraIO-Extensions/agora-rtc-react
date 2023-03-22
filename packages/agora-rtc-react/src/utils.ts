export type Disposer = () => void;
export type Fn = (...args: any[]) => any;
export type Nullable<T> = T | null | undefined;
export type MaybePromise<T> = T | PromiseLike<T>;
export type MaybePromiseOrNull<T> = MaybePromise<Nullable<T>>;

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

export function interval(fn: Fn, interval: number): Disposer {
  const id = setInterval(fn, interval);
  return () => clearInterval(id);
}

export function timeout(fn: Fn, ms: number): Disposer {
  const id = setTimeout(fn, ms);
  return () => clearTimeout(id);
}
