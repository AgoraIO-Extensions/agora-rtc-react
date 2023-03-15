import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div className="h-screen flex flex-col bg-#191b1f c-coolgray-3">{children}</div>
);
