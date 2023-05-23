import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { LocalUser } from "../src/components";
import * as stories from "../src/components/LocalUser.stories";
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

  test("sets cover but cameraOn is true", () => {
    const cover = "test";
    const { container } = render(<LocalUser cameraOn cover={cover} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
  });
});

describe("LocalUser component stories", () => {
  test("renders Overview stories", () => {
    const { container } = render(<Overview />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "http://placekitten.com/200/200",
    );
  });
});
