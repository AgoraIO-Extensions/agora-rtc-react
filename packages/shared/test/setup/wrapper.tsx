import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";

import { AgoraRTCProvider } from "../../../agora-rtc-react/src/hooks";
import type { Props } from "../setup";

export const createWrapper =
  (client: IAgoraRTCClient): React.FC<Props> =>
  ({ children }: { children: ReactNode }) =>
    <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
