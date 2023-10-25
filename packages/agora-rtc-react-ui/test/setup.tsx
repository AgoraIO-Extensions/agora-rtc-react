import "@testing-library/jest-dom";
import matchers from "@testing-library/jest-dom/matchers";
import type { ReactNode } from "react";
import { expect, vi } from "vitest";
import "vitest-canvas-mock";

expect.extend(matchers);

/**
 * started agora-rtc-sdk-ng@17.0.0, need mock RTCPeerConnection.
 * RTCPeerConnection does not implement global
 */
// @ts-expect-error type
global.RTCPeerConnection = vi.fn();

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
