import type {
  ICameraVideoTrack,
  ILocalTrack,
  IMicrophoneAudioTrack,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import {
  LocalMicrophoneAndCameraUser,
  RemoteVideoPlayer,
  useAsyncEffect,
  useCurrentUID,
  useIsConnected,
  useJoin,
  usePublish,
  usePublishedRemoteUsers,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import { useMemo, useState } from "react";

import { AutoLayout, Container, Label, MediaControl, UsersInfo } from "../../components";
import { appConfig, fakeAvatar, fakeName } from "../../utils";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Button } from "antd";

export const UsePublish = () => {
  const client = useRTCClient();
  const isConnected = useIsConnected();

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const publishedUsers = usePublishedRemoteUsers();
  const uid = useCurrentUID() || 0;
  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(uid), [uid]);

  //local
  useJoin({ appid: appConfig.appId, channel: appConfig.channel, token: appConfig.token });
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [localTrackList, setLocalTrackList] = useState<ILocalTrack[]>([]);
  const [videoTrack, setVideoTrack] = useState<ICameraVideoTrack | null>(null);
  const [isPublished, setIsPublished] = useState<boolean>(true);

  useAsyncEffect(async () => {
    if (isConnected && micOn && !audioTrack) {
      const track = await AgoraRTC.createMicrophoneAudioTrack({ ANS: true, AEC: true });

      setLocalTrackList([...localTrackList, track]);
      setAudioTrack(track);
    }
  }, [isConnected, micOn, audioTrack, client]);

  useAsyncEffect(async () => {
    if (isConnected && cameraOn && !videoTrack) {
      const track = await AgoraRTC.createCameraVideoTrack();

      setLocalTrackList([...localTrackList, track]);

      setVideoTrack(track);
    }
  }, [isConnected, cameraOn, videoTrack, client]);
  usePublish(localTrackList);

  //remote
  const remoteUsers = useRemoteUsers();
  const videoTracks = useRemoteVideoTracks(remoteUsers);
  const audioTracks = useRemoteAudioTracks(remoteUsers);
  audioTracks.map(track => track.play());

  const unpublish = () => {
    setIsPublished(false);
    setLocalTrackList([]);
  };

  return (
    <Container>
      <>
        <div className="p-4 text-xl">
          <Button onClick={() => unpublish()} type="primary">
            {`unpublish`}
          </Button>
        </div>
        <UsersInfo
          published={publishedUsers.length + (micOn || cameraOn ? 1 : 0)}
          total={remoteUsers.length + 1}
        />
        <AutoLayout>
          {isConnected && isPublished ? (
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
          ) : null}
          <>
            {videoTracks.map((track: IRemoteVideoTrack) => (
              <AutoLayout.Item key={track.getUserId()}>
                <RemoteVideoPlayer
                  cover={fakeAvatar(track.getUserId())}
                  key={track.getUserId()}
                  track={track}
                />
                <Label>{`${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
              </AutoLayout.Item>
            ))}
          </>
        </AutoLayout>
      </>
      <MediaControl
        cameraOn={cameraOn}
        micOn={micOn}
        setCamera={() => {
          setCamera(a => !a);
        }}
        setMic={() => {
          setMic(a => !a);
        }}
        showCallBtn={false}
      />
    </Container>
  );
};

export default UsePublish;
