import { AgoraRTCProvider } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useState } from "react";

interface ClientProps {
  children: ReactNode;
}

export const Client = ({ children }: ClientProps) => {
  const [client] = useState(() => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
};

export default Client;
