import "../../shared/assets/storybook/global.scss";

export const parameters = {
  backgrounds: {
    default: "white",
    values: [
      {
        name: "white",
        value: "#fff",
      },
      {
        name: "light",
        value: "rgb(248, 248, 248)",
      },
      {
        name: "grey",
        value: "#555",
      },
      {
        name: "dark",
        value: "rgb(25, 27, 31)",
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    showPanel: true,
  },
  docs: {
    canvas: {
      sourceState: "shown",
    },
  },
};
