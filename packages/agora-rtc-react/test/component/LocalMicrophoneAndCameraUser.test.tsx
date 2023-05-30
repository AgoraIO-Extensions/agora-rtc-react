import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { LocalMicrophoneAndCameraUser } from "../../src/components";
import * as stories from "../../src/components/LocalMicrophoneAndCameraUser.stories";
const { Overview } = composeStories(stories);

vi.mock("../../src/hooks", async () => {
  const actual: object = await vi.importActual("../../src/hooks");
  return {
    ...actual,
    useAwaited: vi.fn(),
  };
});

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
