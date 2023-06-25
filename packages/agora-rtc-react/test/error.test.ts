import { vi } from "vitest";

import type { AgoraRTCError } from "../src";
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

  it("should create an instance with rtcMethod and AgoraRTCError object", () => {
    const rtcMethod = "testMethod";
    const rtcError = { errorCode: "testErrorCode", message: "testErrorMessage" };
    const agoraRTCReactError = new AgoraRTCReactError(
      rtcMethod,
      rtcError as unknown as AgoraRTCError,
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
    agoraRTCReactError.print("log");
    expect(console.log).toHaveBeenCalledWith(rtcError);
  });

  it("should print the rtcError properly with console.warn", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRTCReactError = new AgoraRTCReactError(rtcMethod, rtcError);
    console.warn = vi.fn();
    agoraRTCReactError.print("warn");
    expect(console.warn).toHaveBeenCalledWith(rtcError);
  });

  it("should print the rtcError properly with console.error", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRTCReactError = new AgoraRTCReactError(rtcMethod, rtcError);
    console.error = vi.fn();
    agoraRTCReactError.print("error");
    expect(console.error).toHaveBeenCalledWith(rtcError);
  });

  it("should print the rtcError properly with console.info", () => {
    const rtcMethod = "testMethod";
    const rtcError = "testError";
    const agoraRTCReactError = new AgoraRTCReactError(rtcMethod, rtcError);
    console.info = vi.fn();
    agoraRTCReactError.print("info");
    expect(console.info).toHaveBeenCalledWith(rtcError);
  });
});
