export function hideProperties<T>(o: T, ...properties: string[]): void {
  Object.defineProperties(
    o,
    [...properties, "_constructor-name_"].reduce(
      (o, k) => ((o[k] = { writable: true, enumerable: false }), o),
      {} as any,
    ),
  );
}
