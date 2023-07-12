# agora-rtc-react

[![Build Status](https://github.com/agoraio-extensions/agora-rtc-react/actions/workflows/build.yml/badge.svg)](https://github.com/agoraio-extensions/agora-rtc-react/actions/workflows/build.yml)

[![npm-version](https://img.shields.io/npm/v/agora-rtc-react.svg)](https://www.npmjs.com/package/agora-rtc-react)
[![minified-size](https://img.shields.io/bundlephobia/minzip/agora-rtc-react)](https://bundlephobia.com/package/agora-rtc-react)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[English](./README.md) | [简体中文](./README.zh-CN.md)

agora-rtc-react 可以让你在 React 应用中更便捷的使用 [agora-rtc-sdk-ng](https://www.npmjs.com/package/agora-rtc-sdk-ng)。

# 安装方法

```bash
npm i agora-rtc-react
```

# 示例

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

# 一些例子

### [访问更多示例](https://agoraio-extensions.github.io/agora-rtc-react/basic/)

### 或者在本地运行示例,请通过下述操作步骤:

- 添加 `.env.local` 文件到每个 example 文件夹中, 并且填写 Agora 账号信息。你可以参考 `.env.example`。
- 执行 `pnpm start` 。

# Components

- [`RemoteVideoTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/RemoteVideoTrack.zh-CN.mdx) &mdash; 该组件用于播放远端用户的视频轨道，并且不支持指定播放设备。

- [`RemoteUser`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/RemoteUser.zh-CN.mdx) &mdash; 该组件用于播放远端用户的视频和音频轨道，并且仅支持指定使用的音频设备、不支持指定使用的视频设备。

- [`RemoteAudioTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/RemoteAudioTrack.zh-CN.mdx) &mdash; 该组件用于播放远端用户的音频轨道，并且支持指定播放设备。

- [`LocalVideoTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/LocalVideoTrack.zh-CN.mdx) &mdash; 该组件用于播放本地视频轨道，播放设备为用户在浏览器中选择的设备。

- [`LocalUser`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/LocalUser.zh-CN.mdx) &mdash; 该组件用于播放本地用户的摄像头视频轨道和麦克风音频轨道（不支持指定使用的媒体设备）。

- [`LocalAudioTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/LocalAudioTrack.zh-CN.mdx) &mdash; 该组件用于播放本地音频轨道，播放设备为用户在浏览器中选择的设备。

- [`AgoraRTCScreenShareProvider`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/AgoraRTCScreenShareProvider.zh-CN.mdx) &mdash; 该组件用于将传入的屏幕共享 client 对象提供给 children 内的各个组件。

- [`AgoraRTCProvider`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/components/AgoraRTCProvider.zh-CN.mdx) &mdash; 该组件用于将传入的 client 对象提供给 children 内的各个组件，即向子组件提供 <a href="https://react.dev/learn/passing-data-deeply-with-context">Context</a>。

# Hooks

- [`useVolumeLevel`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useVolumeLevel.zh-CN.mdx) &mdash; 用于自动获取音频轨道音量级别，自动获取的频率为每秒一次。

- [`useRemoteVideoTracks`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRemoteVideoTracks.zh-CN.mdx) &mdash; 用于自动订阅和获取远端用户视频轨道。

- [`useRemoteUsers`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRemoteUsers.zh-CN.mdx) &mdash; 用于获取远端用户列表。

- [`useRemoteUserTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRemoteUserTrack.zh-CN.mdx) &mdash; 用于获取远端用户音视频轨道。

- [`useRemoteAudioTracks`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRemoteAudioTracks.zh-CN.mdx) &mdash; 用于自动订阅和获取远端用户音频轨道。

- [`useRTCClient`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useRTCClient.zh-CN.mdx) &mdash; 用于获取 IAgoraRTCClient 对象。

- [`usePublish`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/usePublish.zh-CN.mdx) &mdash; 用于发布本地轨道。当组件准备好时发布，当组件卸载时取消发布。

- [`useNetworkQuality`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useNetworkQuality.zh-CN.mdx) &mdash; 用于获取本地用户网络质量。

- [`useLocalMicrophoneTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useLocalMicrophoneTrack.zh-CN.mdx) &mdash; 用于创建本地麦克风音频轨道。

- [`useLocalCameraTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useLocalCameraTrack.zh-CN.mdx) &mdash; 用于创建本地摄像头视频轨道。

- [`useJoin`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useJoin.zh-CN.mdx) &mdash; 用于加入频道。当组件准备好时加入频道，当组件卸载时自动离开频道。

- [`useIsConnected`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useIsConnected.zh-CN.mdx) &mdash; 用于获取客户端是否连接到服务器。

- [`useCurrentUID`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useCurrentUID.zh-CN.mdx) &mdash; 用于获取当前用户 UID 。

- [`useConnectionState`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useConnectionState.zh-CN.mdx) &mdash; 用于获取详细的客户端连接状态，包括与服务器连接断开、正在连接中、已连接、正在重连中、正在断开连接。

- [`useAutoPlayVideoTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useAutoPlayVideoTrack.zh-CN.mdx) &mdash; 用于控制本地或远端视频轨道。

- [`useAutoPlayAudioTrack`](https://github.com/AgoraIO-Extensions/agora-rtc-react/tree/main/packages/agora-rtc-react/docs/hooks/useAutoPlayAudioTrack.zh-CN.mdx) &mdash; 用于控制本地或远端音频轨道。

# License

MIT © [Agora.io](https://github.com/AgoraIO)
