import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { FakeLocalAudioTrack } from "agora-rtc-sdk-ng-fake";
import { describe, expect, test, vi } from "vitest";

import { LocalUser } from "../../src/components";
import * as clientHook from "../../src/hooks/tools";
import * as stories from "../../src/stories/LocalUser.stories";
const { Overview } = composeStories(stories);

describe("LocalUser component", () => {
  test("renders without crashing", () => {
    const { container } = render(<LocalUser />);
    expect(container).toBeInTheDocument();
  });

  test("sets cover", () => {
    const cover = "test";
    const { container } = render(<LocalUser cover={cover} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(cover);
  });

  test("sets volume", async () => {
    const cover = "test";
    const track = FakeLocalAudioTrack.create();
    const spy = vi.spyOn(clientHook, "useAwaited");
    spy.mockReturnValue(track);
    track.setVolume = vi.fn();

    const { container } = render(<LocalUser audioTrack={track} cover={cover} volume={40} />);
    expect(track.setVolume).toHaveBeenCalledWith(40);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(cover);
  });

  test("sets cover but cameraOn is true", () => {
    const cover = "test";
    const { container } = render(<LocalUser cameraOn cover={cover} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
  });
});

describe("LocalUser component stories", () => {
  test("renders Overview stories", () => {
    const { container } = render(<Overview />);
    expect(Boolean(container.querySelector("img")?.getAttribute("src"))).toBe(true);
  });

  test("renders Enabled stories", () => {
    const { container } = render(<Overview cameraOn micOn playAudio playVideo />);
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
  });
});
