import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { LocalUser } from "../../src/components";
import * as stories from "../../src/components/LocalUser.stories";
const { Overview } = composeStories(stories);

vi.mock("../../src/hooks", async () => {
  const actual: object = await vi.importActual("../../src/hooks");
  return {
    ...actual,
    useAwaited: vi.fn(),
  };
});

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
