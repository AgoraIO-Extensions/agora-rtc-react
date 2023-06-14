import { AgoraRTCReact } from "../src/rtc";

describe("AgoraRTCReact test", () => {
  test("appType is 1001", async () => {
    expect(AgoraRTCReact.appType).toBe(1001);
  });
});
