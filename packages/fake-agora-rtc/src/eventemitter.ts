import { hideProperties } from "./utils";

type Fn = (...args: any[]) => unknown;

/** Fake Agora internal Eventemitter */
export class FakeAgoraEventEmitter {
  private _events = new Map<string, Fn[]>();
  private _once = new WeakMap<Fn, Fn>();

  public constructor() {
    hideProperties(this, "_events", "_once");
  }

  /**
   * Gets all the listeners for a specified event.
   *
   * @param event The event name.
   */
  public getListeners(event: string): Fn[] {
    return this._events.get(event) || [];
  }
  /**
   * Listens for a specified event.
   *
   * When the specified event happens, the SDK triggers the callback that you pass.
   * @param event The event name.
   * @param listener The callback to trigger.
   */
  public on(event: string, listener: Fn): void {
    const listeners = this._events.get(event) || [];
    if (!listeners.includes(listener)) {
      listeners.push(listener);
    }
    this._events.set(event, listeners);
  }
  /**
   * Listens for a specified event once.
   *
   * When the specified event happens, the SDK triggers the callback that you pass and then removes the listener.
   * @param event The event name.
   * @param listener The callback to trigger.
   */
  public once(event: string, listener: Fn): void {
    const onceListener = (...args: any[]) => {
      this.off(event, onceListener);
      listener(...args);
    };
    this._once.set(listener, onceListener);
    this.on(event, onceListener);
  }
  /**
   * Removes the listener for a specified event.
   *
   * @param event The event name.
   * @param listener The callback that corresponds to the event listener.
   */
  public off(event: string, listener: Fn): void {
    listener = this._once.get(listener) || listener;
    const listeners = this._events.get(event) || [];
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
    this._events.set(event, listeners);
  }
  /**
   * Removes all listeners for a specified event.
   *
   * @param event The event name. If left empty, all listeners for all events are removed.
   */
  public removeAllListeners(event?: string): void {
    if (event) {
      this._events.delete(event);
    } else {
      this._events.clear();
    }
  }

  public dispatch(event: string, ...payload: unknown[]): void {
    this._events.get(event)?.forEach(listener => listener(...payload));
  }
}

export function dispatchRTCEvent(emitter: unknown, event: string, ...payload: unknown[]): void {
  if (emitter && (emitter as FakeAgoraEventEmitter).dispatch) {
    (emitter as FakeAgoraEventEmitter).dispatch(event, ...payload);
  }
}
