import type { SVGProps } from "react";
import { memo } from "react";

export type SVGCameraProps = SVGProps<SVGSVGElement>;

export const SVGCamera = /* @__PURE__ */ memo<SVGCameraProps>(function SVGCamera(props) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="11" r="7" stroke="#fff" strokeLinejoin="round" strokeWidth="1.25" />
      <circle cx="12" cy="11" r="3" stroke="#fff" strokeLinejoin="round" strokeWidth="1.25" />
      <circle cx="14.625" cy="6.625" fill="#fff" r=".625" />
      <path
        d="M7 18.25a8.004 8.004 0 0 0 10 0"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
});
