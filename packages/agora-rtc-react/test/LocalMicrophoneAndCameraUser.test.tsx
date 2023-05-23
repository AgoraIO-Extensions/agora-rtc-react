import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { LocalMicrophoneAndCameraUser } from "../src/components";
import * as stories from "../src/components/LocalMicrophoneAndCameraUser.stories";
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

  test("sets cover but cameraOn is true", () => {
    const cover = "test";
    const { container } = render(<LocalMicrophoneAndCameraUser cameraOn cover={cover} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
  });
});

describe("LocalMicrophoneAndCameraUser component stories", () => {
  test("renders Overview stories", () => {
    const { container } = render(<Overview />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "http://placekitten.com/200/200",
    );
  });
});
