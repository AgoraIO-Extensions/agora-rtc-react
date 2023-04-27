import { render, screen, renderHook, render } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import * as stories from "../src/components/LocalAudioTrack.stories";
import { FakeLocalAudioTrack } from "fake-agora-rtc";
import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { MaybePromiseOrNull } from "../src/utils";
const { EmptyTrack } = composeStories(stories);
import { describe, test, vi, expect } from "vitest";
import { LocalAudioTrack } from "../src/components";

describe("LocalAudioTrack component", () => {
  test("renders without crashing with track", () => {
    const track: MaybePromiseOrNull<ILocalAudioTrack> = FakeLocalAudioTrack.create();
    render(<LocalAudioTrack track={track} />);
  });

  test("sets volume on audio track", () => {
    const track: MaybePromiseOrNull<ILocalAudioTrack> = FakeLocalAudioTrack.create();
    track.setVolume = vi.fn();
    render(<LocalAudioTrack track={track} volume={0.5} />);
    expect(track.setVolume).toHaveBeenCalledWith(0.5);
  });

  test("disables audio track", () => {
    const track: MaybePromiseOrNull<ILocalAudioTrack> = FakeLocalAudioTrack.create();
    render(<LocalAudioTrack disabled track={track} />);
    expect(track.enabled).toBe(false);
  });

  test("renders without crashing without track", () => {
    render(<EmptyTrack />);
  });
});
