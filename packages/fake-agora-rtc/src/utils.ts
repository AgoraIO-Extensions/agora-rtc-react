export function hideProperties<T>(o: T, ...properties: string[]): void {
  Object.defineProperties(
    o,
    properties.reduce((o, k) => ((o[k] = { writable: true, enumerable: false }), o), {} as any),
  );
}
