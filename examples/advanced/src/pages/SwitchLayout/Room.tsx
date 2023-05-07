import type { ICameraVideoTrack, IMicrophoneAudioTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";

import {
  LocalMicrophoneAndCameraUser,
  RemoteVideoPlayer,
  useAsyncEffect,
  useAutoJoin,
  useCurrentUID,
  useIsConnected,
  usePublishedRemoteUsers,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useMemo, useState } from "react";
import { AutoLayout } from "../../components/AutoLayout";
import { Label } from "../../components/Label";
import { UsersInfo } from "../../components/UsersInfo";
import { fakeAvatar, fakeName } from "../../utils";
import { Button } from "antd";

interface RoomProps {
  micOn: boolean;
  cameraOn: boolean;
}

const appId = import.meta.env.AGORA_APPID;
const channel = import.meta.env.AGORA_CHANNEL;
const token = import.meta.env.AGORA_TOKEN;

export function Room({ micOn, cameraOn }: RoomProps) {
  useAutoJoin(appId, channel, token);

  const client = useRTCClient();
  const isConnected = useIsConnected();

  const uid = useCurrentUID() || 0;
  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(uid), [uid]);

  const remoteUsers = useRemoteUsers();
  const publishedUsers = usePublishedRemoteUsers();

  const selfPublished = micOn || cameraOn;

  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [layout, setLayout] = useState<boolean>(true);
  useAsyncEffect(async () => {
    if (isConnected && micOn && !audioTrack) {
      const track = await AgoraRTC.createMicrophoneAudioTrack({ ANS: true, AEC: true });
      await client.publish(track);
      setAudioTrack(track);
    }
  }, [isConnected, micOn, audioTrack, client]);

  const [videoTrack, setVideoTrack] = useState<ICameraVideoTrack | null>(null);
  useAsyncEffect(async () => {
    if (isConnected && cameraOn && !videoTrack) {
      const track = await AgoraRTC.createCameraVideoTrack();
      await client.publish(track);
      setVideoTrack(track);
    }
  }, [isConnected, cameraOn, videoTrack, client]);

  const {
    videoTracks,
    ready: videoTracksIsReady,
    error: videoTracksError,
  } = useRemoteVideoTracks(layout ? remoteUsers : remoteUsers.filter((_user, index) => index == 0));

  const {
    audioTracks,
    ready: audioTracksIsReady,
    error: audioTracksError,
  } = useRemoteAudioTracks(remoteUsers);

  console.log(videoTracks, videoTracksIsReady, videoTracksError);
  console.log(audioTracks, audioTracksIsReady, audioTracksError);
  audioTracks.map(track => track.play());

  return (
    <>
      <div className="p-4 text-xl">
        <Button onClick={() => setLayout(layout => !layout)} type="primary">
          {`switch to layout ${layout ? 1 : 2}`}
        </Button>
      </div>
      <UsersInfo
        published={publishedUsers.length + (selfPublished ? 1 : 0)}
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
        {layout ? <Layout1 videoTracks={videoTracks} /> : <Layout2 videoTracks={videoTracks} />}
      </AutoLayout>
    </>
  );
}

function Layout1({ videoTracks }: { videoTracks: IRemoteVideoTrack[] }) {
  return (
    <>
      {videoTracks.map((track: IRemoteVideoTrack) => (
        <AutoLayout.Item key={track.getUserId()}>
          <RemoteVideoPlayer
            cover={fakeAvatar(track.getUserId())}
            key={track.getUserId()}
            track={track}
          />
          <Label>{`Layout1 ${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
        </AutoLayout.Item>
      ))}
    </>
  );
}

function Layout2({ videoTracks }: { videoTracks: IRemoteVideoTrack[] }) {
  return (
    <>
      {videoTracks.map((track: IRemoteVideoTrack) => (
        <AutoLayout.Item key={track.getUserId()}>
          <RemoteVideoPlayer
            cover={fakeAvatar(track.getUserId())}
            key={track.getUserId()}
            track={track}
          />
          <Label>{`Layout2 ${fakeName(track.getUserId())}{${track.getUserId()}}`}</Label>
        </AutoLayout.Item>
      ))}
    </>
  );
}
