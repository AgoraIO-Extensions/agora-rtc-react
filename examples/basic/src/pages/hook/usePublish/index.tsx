import {
  LocalMicrophoneAndCameraUser,
  RemoteVideoPlayer,
  useCurrentUID,
  useIsConnected,
  useJoin,
  useLocalAudioTrack,
  useLocalCameraTrack,
  usePublish,
  usePublishedRemoteUsers,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { useMemo, useState } from "react";

import { AutoLayout, Container, Label, MediaControl, UsersInfo } from "../../../components";
import { appConfig, fakeAvatar, fakeName } from "../../../utils";

export const UsePublish = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();

  const uid = useCurrentUID() || 0;
  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(), []);

  const publishedUsers = usePublishedRemoteUsers();

  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    calling,
  );

  //local
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const audioTrack = useLocalAudioTrack(micOn);
  const videoTrack = useLocalCameraTrack(cameraOn);
  usePublish([audioTrack, videoTrack]);

  //remote
  const remoteUsers = useRemoteUsers();
  const videoTracks = useRemoteVideoTracks(remoteUsers);
  const audioTracks = useRemoteAudioTracks(remoteUsers);
  audioTracks.map(track => track.play());

  const renderRemoteUsers = () => {
    return (
      <>
        {videoTracks.map((track: IRemoteVideoTrack) => (
          <AutoLayout.Item key={track.getUserId()}>
            <RemoteVideoPlayer cover={fakeAvatar()} key={track.getUserId()} track={track} />
            <Label>{`Layout1 ${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
          </AutoLayout.Item>
        ))}
      </>
    );
  };
  return (
    <Container>
      <>
        <UsersInfo
          published={publishedUsers.length + (micOn || cameraOn ? 1 : 0)}
          total={remoteUsers.length + 1}
        />
        <AutoLayout>
          {isConnected && (
            <AutoLayout.Item>
              <LocalMicrophoneAndCameraUser
                audioTrack={audioTrack}
                cameraOn={cameraOn}
                cover={userAvatar}
                micOn={micOn}
                videoTrack={videoTrack}
              >
                {<Label>{`${userName}{${uid}}`}</Label>}
              </LocalMicrophoneAndCameraUser>
            </AutoLayout.Item>
          )}
          {renderRemoteUsers ? renderRemoteUsers() : undefined}
        </AutoLayout>
      </>
      <MediaControl
        calling={calling}
        cameraOn={cameraOn}
        micOn={micOn}
        setCalling={() => setCalling(a => !a)}
        setCamera={() => {
          setCamera(a => !a);
        }}
        setMic={() => {
          setMic(a => !a);
        }}
      />
    </Container>
  );
};

export default UsePublish;
