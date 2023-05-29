import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import matchers from "@testing-library/jest-dom/matchers";
import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { expect, vi } from "vitest";

import { AgoraRTCProvider } from "../src/hooks";

expect.extend(matchers);

AgoraRTC.setLogLevel(4);

/**
 * JSDOM does not implement global "HTMLMediaElement.prototype.play" function
 */
HTMLMediaElement.prototype.play = vi.fn().mockReturnValue(Promise.resolve());
HTMLMediaElement.prototype.pause = vi.fn().mockReturnValue(Promise.resolve());

/**
 * navigator does not implement global "mediaDevices.prototype.getUserMedia" function
 * navigator does not implement global "mediaDevices.prototype.enumerateDevices" function
 *
 */
const mockPromise = vi.fn(async () => {
  return new Promise<void>(resolve => {
    resolve();
  });
});
Object.defineProperty(global.navigator, "mediaDevices", {
  value: {
    getUserMedia: mockPromise,
    enumerateDevices: mockPromise,
  },
});

export interface Props {
  children: ReactNode;
}

export const createWrapper =
  (client: IAgoraRTCClient): React.FC<Props> =>
  ({ children }: { children: ReactNode }) =>
    <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
