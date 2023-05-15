import type { CSSProperties } from "react";
import { useMemo } from "react";

export const VideoTrackWrapperStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  background: "#000",
};

export const VideoTrackStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

export const FloatBoxStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 2,
};

export const useMergedStyle = (s1?: CSSProperties, s2?: CSSProperties): CSSProperties =>
  useMemo(() => ({ ...s1, ...s2 }), [s1, s2]);
