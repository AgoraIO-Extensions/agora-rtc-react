# agora-rtc-react

[![Build Status](https://github.com/netless-io/agora-rtc-react/actions/workflows/build.yml/badge.svg)](https://github.com/netless-io/agora-rtc-react/actions/workflows/build.yml)

<!-- [![npm-version](https://img.shields.io/npm/v/agora-rtc-react.svg)](https://www.npmjs.com/package/agora-rtc-react)
[![Coverage Status](https://img.shields.io/coveralls/github/netless-io/agora-rtc-react/main)](https://coveralls.io/github/netless-io/agora-rtc-react?branch=main)
[![minified-size](https://img.shields.io/bundlephobia/minzip/agora-rtc-react)](https://bundlephobia.com/package/agora-rtc-react) -->

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Install

```bash
npm add agora-rtc-sdk-ng agora-rtc-react
```

## Usage

```tsx

```

## Development

1. Clone this project.
2. `pnpm i` to install dependencies.
3. `pnpm build` to build the library.

- `pnpm storybook` to start the storybook.

## Examples

To start examples, you need to fill in Agora tokens.

- You can add a `.env.local` file to each example directory and fill in the Agora account info following the format of `.env.example`.
- Or add a `.env.local` at monorepo root with `AGORA_APPID` and `AGORA_CERTIFICATE`, then `pnpm renew` to auto-renew tokens.

- `pnpm start` to start the overview example.
- `pnpm -F [package-name] run start` to start other examples.

## License

MIT © [Agora.io](https://github.com/AgoraIO)
