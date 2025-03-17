import{j as e}from"./jsx-runtime-1a9d9a93.js";import{M as t,d as a}from"./index-01974c7e.js";import{u as i}from"./index-4811e648.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-45288cab.js";import"../sb-preview/runtime.js";import"./index-a38d0dca.js";import"./index-1b441bc2.js";import"./index-8fd8397b.js";import"./index-356e4a49.js";const s=`## useLocalScreenTrack

This hook lets you create a local video track for screen-sharing.

- This hook can only create the video track once before the component is destroyed.
- After the component is unmounted, the video track created by this hook stops publishing.

#### Parameters

| Parameter                    | Type                                                                                                               | Required | Description                                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`ready\`                      | \`boolean\`                                                                                                          | No       | Whether it is ready to create the track. The default value is \`true\`.                                                                                                                                                                                                                          |
| \`screenVideoTrackInitConfig\` | [\`screenVideoTrackInitConfig\`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x//screenVideoTrackInitConfig.html) | Yes      | Screen-sharing video configuration, including encoding and capturing configurations.                                                                                                                                                                                                           |
| \`withAudio\`                  | \`string\`                                                                                                           | Yes      | Whether to share the audio of the screen-sharing input source during screen sharing. Supported values are \`"enable"\`, \`"disable"\`, and \`"auto"\`. See the parameters of [\`createScreenVideoTrack\`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x//createScreenVideoTrack.html) for details. |

#### Returns

Returns an object containing the following properties:

| Property      | Type                                                                                           | Description                                                                                                                                                                                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \`screenTrack\` | \`[ILocalVideoTrack, ILocalAudioTrack]\` &VerticalLine; \`ILocalVideoTrack\` &VerticalLine; \`null\` | Depending on the passed \`withAudio\` value, it returns either the created screen-sharing video track or both the screen-sharing video track and audio track. See the returns of [\`createScreenVideoTrack\`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x//createScreenVideoTrack.html) for details. |
| \`isLoading\`   | \`boolean\`                                                                                      | <li>\`true\`: The hook is performing operations related to publishing the tracks.</li><li>\`false\`: The hook completes operations related to publishing the tracks, but it does not indicate a successful result.</li>                                                                                    |
| \`error\`       | \`AgoraRTCReactError\` &VerticalLine; \`null\`                                                     | Returns \`null\` if the track is successfully created, otherwise throws an error. See [\`AgoraRTCReactError\`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/classes/AgoraRTCReactError.html) for details.                                                                                             |

#### Caveats

- Agora recommends wrapping the returned video track object in [\`AgoraRTCScreenShareProvider\`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/AgoraRTCScreenShareProvider.html).
- If you get the video track and audio track objects from the return value but only publish one track, you need to manually close the unpublished track using the Web SDK's [\`ILocalTrack.close\`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/ilocaltrack.html#close) method before stopping screen sharing. The other published track will be closed automatically.
- Subscribing to the local screen-sharing track will incur duplicate billing. Agora recommends that you add checks for local tracks when subscribing to video tracks.

#### Sample code

**Example 1: Wrap the screen-sharing video track in AgoraRTCScreenShareProvider**

\`\`\`jsx
import { AgoraRTCScreenShareProvider, LocalVideoTrack, useLocalScreenTrack } from "agora-rtc-react";

function App() {
  const { screenTrack, error } = useLocalScreenTrack(screenShareOn, {}, "disable");

  return (
    <AgoraRTCScreenShareProvider client={client}>
      <LocalVideoTrack play style={{ width: "300px", height: "300px" }} track={screenTrack} />
    </AgoraRTCScreenShareProvider>
  );
}
\`\`\`

**Example 2: Avoid subscribing to the local screen-sharing track**

\`\`\`jsx
import { useRemoteUsers, useRemoteVideoTracks, useRemoteAudioTracks } from "agora-rtc-react";

function App() {
  const remoteUsers = useRemoteUsers();
  const { videoTracks } = useRemoteVideoTracks(
    // Remove the local user's screen-sharing video track from the subscription list
    remoteUsers.filter(user => user.uid !== appConfig.ShareScreenUID),
  );
  const { audioTracks } = useRemoteAudioTracks(
    // Remove the local user's screen-sharing audio track from the subscription list
    remoteUsers.filter(user => user.uid !== appConfig.ShareScreenUID),
  );

  return <></>;
}
\`\`\`
`;function o(r){return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"hooks/useLocalScreenTrack"}),`
`,e.jsx(a,{options:{namedCodesToUnicode:{VerticalLine:"|"}},children:s})]})}function b(r={}){const{wrapper:n}=Object.assign({},i(),r.components);return n?e.jsx(n,Object.assign({},r,{children:e.jsx(o,r)})):o()}export{b as default};
