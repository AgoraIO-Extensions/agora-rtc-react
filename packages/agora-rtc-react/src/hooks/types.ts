import type { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";

export interface massUserProps {
  user: IAgoraRTCRemoteUser;
  mediaType: "audio" | "video";
}

export interface AgoraRTCProviderProps {
  readonly client: IAgoraRTCClient;
  readonly children?: ReactNode;
}
