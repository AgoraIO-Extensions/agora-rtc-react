import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div className="h-screen flex flex-col">{children}</div>
);
