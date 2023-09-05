import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as clientHook from "agora-rtc-react/src/hooks/tools";
import { FakeMicrophoneAudioTrack } from "agora-rtc-sdk-ng-fake";
import { describe, expect, test, vi } from "vitest";

import { LocalMicrophoneAndCameraUser } from "../src/components";
import * as stories from "../src/stories/LocalMicrophoneAndCameraUser.stories";
const { Overview } = composeStories(stories);

describe("LocalMicrophoneAndCameraUser component", () => {
  test("renders without crashing", () => {
    const { container } = render(<LocalMicrophoneAndCameraUser />);
    expect(container).toBeInTheDocument();
  });

  test("sets cover", () => {
    const cover = "test";
    const { container } = render(<LocalMicrophoneAndCameraUser cover={cover} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(cover);
  });

  test("sets volume", async () => {
    const track = FakeMicrophoneAudioTrack.create();
    const spy = vi.spyOn(clientHook, "useAwaited");
    spy.mockReturnValue(track);
    track.setVolume = vi.fn();

    render(<LocalMicrophoneAndCameraUser audioTrack={track} volume={40} />);
    expect(track.setVolume).toHaveBeenCalledWith(40);
  });

  test("sets cover but cameraOn is true", () => {
    const cover = "test";
    const { container } = render(<LocalMicrophoneAndCameraUser cameraOn cover={cover} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
  });
});

describe("LocalMicrophoneAndCameraUser component stories", () => {
  test("renders Overview stories", () => {
    const { container } = render(<Overview />);
    expect(Boolean(container.querySelector("img")?.getAttribute("src"))).toBe(true);
  });

  test("renders Enabled stories", () => {
    const { container } = render(<Overview cameraOn micOn playAudio playVideo />);
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
  });
});
