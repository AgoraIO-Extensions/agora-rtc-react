import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import matchers from "@testing-library/jest-dom/matchers";
import AgoraRTC from "agora-rtc-sdk-ng";
import { expect, vi } from "vitest";

expect.extend(matchers);

AgoraRTC.setLogLevel(4);

/**
 * JSDOM does not implement global "HTMLMediaElement.prototype.play" function
 */
HTMLMediaElement.prototype.play = vi.fn();
HTMLMediaElement.prototype.pause = vi.fn();

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
