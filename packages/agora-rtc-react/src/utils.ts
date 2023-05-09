export type Disposer = () => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export interface AsyncTaskRunner {
  run: (this: void, task: () => MaybePromise<void | (() => MaybePromise<void>)>) => void;
  dispose: (this: void) => void;
}

/**
 * Chain async tasks. During the task running/stopping, if multiple tasks are triggered, only the last one will be executed.
 */
export function createAsyncTaskRunner(): AsyncTaskRunner {
  let isRunning: boolean | undefined;
  let nextTask: undefined | (() => MaybePromise<void>);
  let disposer: undefined | void | (() => MaybePromise<void>);

  function runNextTask() {
    if (nextTask) {
      const _nextTask = nextTask;
      nextTask = void 0;
      _nextTask();
    }
  }

  async function disposeEffect() {
    if (disposer) {
      const _disposer = disposer;
      disposer = void 0;
      try {
        await _disposer();
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function runTask(effect: () => MaybePromise<void | (() => MaybePromise<void>)>) {
    isRunning = true;

    await disposeEffect();

    try {
      disposer = await effect();
    } catch (e) {
      console.error(e);
    }

    isRunning = false;

    runNextTask();
  }

  async function stopTask() {
    isRunning = true;

    await disposeEffect();

    isRunning = false;

    runNextTask();
  }

  function run(task: () => MaybePromise<void | (() => MaybePromise<void>)>): void {
    if (isRunning) {
      nextTask = () => runTask(task);
    } else {
      runTask(task);
    }
  }

  function dispose(): void {
    if (isRunning) {
      nextTask = stopTask;
    } else {
      stopTask();
    }
  }

  return {
    run,
    dispose,
  };
}
