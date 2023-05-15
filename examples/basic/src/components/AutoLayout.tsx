import { clsx } from "clsx";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

const Item = /* @__PURE__ */ forwardRef<HTMLDivElement, PropsWithChildren<{ className?: string }>>(
  ({ className, children }, ref) => (
    <div
      className={clsx(className, "b-1 b-solid b-coolgray-6 rd of-hidden relative")}
      ref={ref}
      style={{ width: 288, height: 216 }}
    >
      {children}
    </div>
  ),
);

export const AutoLayout = /* @__PURE__ */ Object.assign(
  /* @__PURE__ */ forwardRef<HTMLDivElement, PropsWithChildren<{ className?: string }>>(
    ({ className, children }, ref) => (
      <div className={clsx(className, "flex-1 p-10 p-t-4 flex gap-5")} ref={ref}>
        {children}
      </div>
    ),
  ),
  { Item },
);
