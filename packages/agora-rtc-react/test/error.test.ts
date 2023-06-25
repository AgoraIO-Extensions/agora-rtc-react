import { vi } from "vitest";

import type { AgoraRTCError } from "../src";
import { AgoraRtcReactError } from "../src/error";

describe("AgoraRtcReactError", () => {
  it("should create an instance with rtcMethod and rtcError", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRtcReactError = new AgoraRtcReactError(rtcMethod, rtcError);
    expect(agoraRtcReactError).toBeInstanceOf(AgoraRtcReactError);
    expect(agoraRtcReactError.rtcMethod).toEqual(rtcMethod);
    expect(agoraRtcReactError.rtcError).toEqual(rtcError);
    expect(agoraRtcReactError.name).toEqual("AgoraRTCReactException");
  });

  it("should create an instance with rtcMethod and AgoraRTCError object", () => {
    const rtcMethod = "testMethod";
    const rtcError = { errorCode: "testErrorCode", message: "testErrorMessage" };
    const agoraRtcReactError = new AgoraRtcReactError(
      rtcMethod,
      rtcError as unknown as AgoraRTCError,
    );
    expect(agoraRtcReactError).toBeInstanceOf(AgoraRtcReactError);
    expect(agoraRtcReactError.rtcMethod).toEqual(rtcMethod);
    expect(agoraRtcReactError.rtcError).toEqual(rtcError);
    expect(agoraRtcReactError.name).toEqual("AgoraRTCReactException");
  });

  it("should print the rtcError properly with console.log", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRtcReactError = new AgoraRtcReactError(rtcMethod, rtcError);
    console.log = vi.fn();
    agoraRtcReactError.print("log");
    expect(console.log).toHaveBeenCalledWith(rtcError);
  });

  it("should print the rtcError properly with console.warn", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRtcReactError = new AgoraRtcReactError(rtcMethod, rtcError);
    console.warn = vi.fn();
    agoraRtcReactError.print("warn");
    expect(console.warn).toHaveBeenCalledWith(rtcError);
  });

  it("should print the rtcError properly with console.error", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRtcReactError = new AgoraRtcReactError(rtcMethod, rtcError);
    console.error = vi.fn();
    agoraRtcReactError.print("error");
    expect(console.error).toHaveBeenCalledWith(rtcError);
  });

  it("should print the rtcError properly with console.info", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRtcReactError = new AgoraRtcReactError(rtcMethod, rtcError);
    console.info = vi.fn();
    agoraRtcReactError.print("info");
    expect(console.info).toHaveBeenCalledWith(rtcError);
  });
});
