import type { ClientConfig } from "agora-rtc-react";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import type { ReactNode } from "react";
import { useState } from "react";

interface ClientProps {
  children: ReactNode;
  clientConfig?: ClientConfig;
}

export const Client = ({ children, clientConfig = { mode: "rtc", codec: "vp8" } }: ClientProps) => {
  const [client] = useState(() => AgoraRTC.createClient(clientConfig));
  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
};

export default Client;
