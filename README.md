# agora-rtc-react

[![Build Status](https://github.com/agoraio-extensions/agora-rtc-react/actions/workflows/build.yml/badge.svg)](https://github.com/agoraio-extensions/agora-rtc-react/actions/workflows/build.yml)

<!-- [![npm-version](https://img.shields.io/npm/v/agora-rtc-react.svg)](https://www.npmjs.com/package/agora-rtc-react)
[![Coverage Status](https://img.shields.io/coveralls/github/agoraio-extensions/agora-rtc-react/main)](https://coveralls.io/github/agoraio-extensions/agora-rtc-react?branch=main)
[![minified-size](https://img.shields.io/bundlephobia/minzip/agora-rtc-react)](https://bundlephobia.com/package/agora-rtc-react) -->

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

agora-rtc-react makes it easier to integrate [agora-rtc-sdk-ng](https://www.npmjs.com/package/agora-rtc-sdk-ng) in React applications.

# Installation

```bash
npm i agora-rtc-react
```

# Usage

Here is the first one to get you started:

```tsx
import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraRTCProvider } from "agora-rtc-react";

const Client = ({ children }) => {
  return (
    <AgoraRTCProvider client={AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })}>
      {children}
    </AgoraRTCProvider>
  );
};
const root = createRoot(document.getElementById("container"));
root.render(<Client />);
```

This example will render Agora Client into a container on the page.

# Examples

### You can view examples [on the website](https://agoraio-extensions.github.io/agora-rtc-react/basic/).

### Or run in local by following steps:

- add a `.env.local` file to each example directory and fill in the Agora account info following the format of `.env.example`.
- `pnpm start` to start the example.

# API

<!-- # Resources -->

<!-- - changelog -->
<!-- - [documentation](https://agoraio-extensions.github.io/agora-rtc-react) -->

# License

MIT © [Agora.io](https://github.com/AgoraIO)
