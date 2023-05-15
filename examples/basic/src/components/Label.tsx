import type { PropsWithChildren } from "react";

export const Label = ({ children }: PropsWithChildren) => (
  <samp className="z-2 inline-flex items-center gap-1 absolute bottom-0 bg-black c-white px-1 text-sm">
    {children}
  </samp>
);
