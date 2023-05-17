import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";

expect.extend(matchers);

/**
 * JSDOM does not implement global "HTMLMediaElement.prototype.play" function
 */
HTMLMediaElement.prototype.play = vi.fn();
HTMLMediaElement.prototype.pause = vi.fn();
