import type { IAgoraRTCError } from "agora-rtc-sdk-ng";
import { vi } from "vitest";

import { AgoraRTCReactError } from "../src/error";

describe("AgoraRTCReactError", () => {
  it("should create an instance with rtcMethod and rtcError", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRTCReactError = new AgoraRTCReactError(rtcMethod, rtcError);
    expect(agoraRTCReactError).toBeInstanceOf(AgoraRTCReactError);
    expect(agoraRTCReactError.rtcMethod).toEqual(rtcMethod);
    expect(agoraRTCReactError.rtcError).toEqual(rtcError);
    expect(agoraRTCReactError.name).toEqual("AgoraRTCReactException");
  });

  it("should create an instance with rtcMethod and IAgoraRTCError object", () => {
    const rtcMethod = "testMethod";
    const rtcError = { errorCode: "testErrorCode", message: "testErrorMessage" };
    const agoraRTCReactError = new AgoraRTCReactError(
      rtcMethod,
      rtcError as unknown as IAgoraRTCError,
    );
    expect(agoraRTCReactError).toBeInstanceOf(AgoraRTCReactError);
    expect(agoraRTCReactError.rtcMethod).toEqual(rtcMethod);
    expect(agoraRTCReactError.rtcError).toEqual(rtcError);
    expect(agoraRTCReactError.name).toEqual("AgoraRTCReactException");
  });

  it("should print the rtcError properly with console.log", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRTCReactError = new AgoraRTCReactError(rtcMethod, rtcError);
    console.log = vi.fn();
    agoraRTCReactError.log("log");
    expect(console.log).toHaveBeenCalledWith(agoraRTCReactError);
  });

  it("should print the rtcError properly with console.warn", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRTCReactError = new AgoraRTCReactError(rtcMethod, rtcError);
    console.warn = vi.fn();
    agoraRTCReactError.log("warn");
    expect(console.warn).toHaveBeenCalledWith(agoraRTCReactError);
  });

  it("should print the rtcError properly with console.error", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRTCReactError = new AgoraRTCReactError(rtcMethod, rtcError);
    console.error = vi.fn();
    agoraRTCReactError.log("error");
    expect(console.error).toHaveBeenCalledWith(agoraRTCReactError);
  });

  it("should print the rtcError properly with console.info", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRTCReactError = new AgoraRTCReactError(rtcMethod, rtcError);
    console.info = vi.fn();
    agoraRTCReactError.log("info");
    expect(console.info).toHaveBeenCalledWith(agoraRTCReactError);
  });
});
