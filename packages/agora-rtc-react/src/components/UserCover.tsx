import type { CSSProperties, ReactNode } from "react";

import { FloatBoxStyle } from "../assets/styles";

const CoverBlurStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  background: "#1a1e21 center/cover no-repeat",
  filter: "blur(16px) brightness(0.4)",
};

const CoverImgStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: "50%",
  maxHeight: "50%",
  aspectRatio: "1",
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  overflow: "hidden",
  objectFit: "cover",
};

export interface UserCoverProps {
  /**
   * Cover image url or a custom render function.
   */
  cover: string | (() => ReactNode);
}

/**
 * User Cover image with blur background
 */
export function UserCover({ cover }: UserCoverProps) {
  return (
    <div style={FloatBoxStyle}>
      {typeof cover === "string" ? (
        <>
          <div style={{ ...CoverBlurStyle, backgroundImage: `url(${cover})` }} />
          <img src={cover} style={CoverImgStyle} />
        </>
      ) : (
        cover()
      )}
    </div>
  );
}
