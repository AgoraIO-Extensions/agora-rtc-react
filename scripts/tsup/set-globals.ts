const setGlobals = (
  globals: {
    [key: string]: string;
  } = {},
) => {
  return {
    name: "globals",
    setup({ onResolve, onLoad }) {
      onResolve({ filter: /^[^.]/ }, args => {
        if (args.path in globals) {
          return { path: args.path, namespace: "globals" };
        }
      });

      onLoad({ filter: /(?:)/, namespace: "globals" }, args => {
        return { contents: `module.exports = ${globals[args.path]}` };
      });
    },
  };
};

export default setGlobals;
