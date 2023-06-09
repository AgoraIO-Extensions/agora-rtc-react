# Contributing to agora-rtc-react

Before to contribute to agora-rtc-react, There are a few things you need to know.

# Code of Conduct

agora-rtc-react has adopted the [Contributor Covenant][homepage] as its Code of Conduct, and we expect project participants to adhere to it. Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

# Bugs

We are using [GitHub Issues](https://github.com/AgoraIO-Extensions/agora-rtc-react/issues) for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

# Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

# Sending a Pull Request

Before submitting a pull request, please make sure the following is done:

### Contribution Prerequisites

- You have [Node](https://nodejs.org/en) installed.
- You have [pnpm](https://github.com/pnpm/pnpm) installed.
- You have [tsup](https://github.com/egoist/tsup) installed before you want to build.

### Steps

1. Fork the [repository](https://github.com/AgoraIO-Extensions/agora-rtc-react) and create your branch from `main`.
2. Run `pnpm install` in the repository root.
3. Ensure the test suite passes (`pnpm test`).
4. Make sure your code lints (`pnpm lint`).

# Development Workflow

- `pnpm start` start example app.
- `pnpm storybook` start storybook.
- `pnpm build-storybook` creates a storybook-static folder with storybook.
- `pnpm test` runs the complete test suite.
- `pnpm build` creates a dist folder with all the packages.

# Style Guide

We use an automatic code formatter called [Prettier](https://prettier.io/).

And we use [typescript](https://www.typescriptlang.org/) to make sure our code better. To make sure our code is follow the rules, we use linter called [ESlint](https://github.com/eslint/eslint).

It will find and fix some problem in our JS/TS code. Our ESlint rules is [here](.eslintrc).

The last, we use [husky](https://github.com/typicode/husky) to checks the code style before commit to git.

[homepage]: https://www.contributor-covenant.org
