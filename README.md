> ⚠️ **Note**: To provide you with better and higher quality technical support services, we will no longer provide technical support through GitHub issues. If you need help, please contact us directly through [Agora Support](https://www.agora.io/en/customer-support/).

# agora-rtc-react

[![Build Status](https://github.com/agoraio-extensions/agora-rtc-react/actions/workflows/build.yml/badge.svg)](https://github.com/agoraio-extensions/agora-rtc-react/actions/workflows/build.yml)

[![npm-version](https://img.shields.io/npm/v/agora-rtc-react.svg)](https://www.npmjs.com/package/agora-rtc-react)
[![minified-size](https://img.shields.io/bundlephobia/minzip/agora-rtc-react)](https://bundlephobia.com/package/agora-rtc-react)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

English | [简体中文](./README.zh-CN.md)

agora-rtc-react makes it easier to integrate [agora-rtc-sdk-ng](https://www.npmjs.com/package/agora-rtc-sdk-ng) in React applications.

Since 2.0.0, you no longer need to add agora-rtc-sdk-ng in your own package.json.

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

# Components

- [`RemoteVideoTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/RemoteVideoTrack.en-US.mdx) &mdash; This component plays the video track of a remote user and does not support specifying the playback device.

- [`RemoteUser`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/RemoteUser.en-US.mdx) &mdash; This component plays the video and audio tracks of a remote user and supports specifying the audio device to use. Specifying the video playback device is not supported.

- [`RemoteAudioTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/RemoteAudioTrack.en-US.mdx) &mdash; This component plays the audio track of a remote user with the playback device you specify.

- [`LocalVideoTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/LocalVideoTrack.en-US.mdx) &mdash; This component plays the local video track using the playback device selected by the user in the browser.

- [`LocalUser`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/LocalUser.en-US.mdx) &mdash; This component plays the camera video track and the microphone audio track of the local user using the playback devices selected by the user in the browser.

- [`LocalAudioTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/LocalAudioTrack.en-US.mdx) &mdash; This component plays the local audio track using the playback device selected by the user in the browser.

- [`AgoraRTCScreenShareProvider`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/AgoraRTCScreenShareProvider.en-US.mdx) &mdash; This component is a <a href="https://react.dev/learn/passing-data-deeply-with-context">context provider</a>, which lets all of the components inside children read the client prop you pass for screen sharing.

- [`AgoraRTCProvider`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/AgoraRTCProvider.en-US.mdx) &mdash; This component is a <a href="https://react.dev/learn/passing-data-deeply-with-context">context provider</a>, which lets all of the components inside children read the client prop you pass.

# Hooks

- [`useVolumeLevel`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useVolumeLevel.en-US.mdx) &mdash; Returns the volume level of an audio track at a frequency of once per second.

- [`useTrackEvent`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useTrackEvent.en-US.mdx) &mdash; This hook lets you listen to specific events of the local or remote track.

- [`useRemoteVideoTracks`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRemoteVideoTracks.en-US.mdx) &mdash; This hook lets you automatically subscribe to and retrieve remote users' video tracks.

- [`useRemoteUsers`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRemoteUsers.en-US.mdx) &mdash; This hook lets you retrieve the list of remote users.

- [`useRemoteUserTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRemoteUserTrack.en-US.mdx) &mdash; This hook lets you retrieve the audio or video track of a remote user.

- [`useRemoteAudioTracks`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRemoteAudioTracks.en-US.mdx) &mdash; This hook lets you automatically subscribe to and retrieve remote users' audio tracks.

- [`useRTCClient`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRTCClient.en-US.mdx) &mdash; Returns the IAgoraRTCClient object.

- [`usePublish`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/usePublish.en-US.mdx) &mdash; This hook lets you publish the local tracks when the component is ready and unpublish them when the component is unmounted.

- [`useNetworkQuality`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useNetworkQuality.en-US.mdx) &mdash; Returns the network quality of the local user.

- [`useLocalScreenTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useLocalScreenTrack.en-US.mdx) &mdash; This hook lets you create a local video track for screen-sharing.

- [`useLocalMicrophoneTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useLocalMicrophoneTrack.en-US.mdx) &mdash; This hook lets you create a local microphone audio track. You can call this method multiple times in different components to create multiple tracks. To access the same track in multiple components, pass the same track object to those components.

- [`useLocalCameraTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useLocalCameraTrack.en-US.mdx) &mdash; This hook lets you create a local camera video track. You can call this method multiple times in different components to create multiple tracks. To access the same track in multiple components, pass the same track object to those components.

- [`useJoin`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useJoin.en-US.mdx) &mdash; This hook lets a user automatically join a channel when the component is ready and automatically leaves the channel when the component is unmounted.

- [`useIsConnected`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useIsConnected.en-US.mdx) &mdash; Returns whether the SDK is connected to Agora's server.

- [`useCurrentUID`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useCurrentUID.en-US.mdx) &mdash; Returns the current user ID.

- [`useConnectionState`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useConnectionState.en-US.mdx) &mdash; Returns the detailed connection state of the SDK.

- [`useClientEvent`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useClientEvent.en-US.mdx) &mdash; This hook lets you listen to specific events of the IAgoraRTCClient object.

- [`useAutoPlayVideoTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useAutoPlayVideoTrack.en-US.mdx) &mdash; This hook lets you automatically play a local or remote video track.

- [`useAutoPlayAudioTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useAutoPlayAudioTrack.en-US.mdx) &mdash; This hook lets you automatically play a local or remote audio track.

# License

MIT © [Agora.io](https://github.com/AgoraIO)
