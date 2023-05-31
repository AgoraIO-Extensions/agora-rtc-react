import { RemoteAudioTrack, useJoin, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";
import type { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

export const RemoteAudioTrackComponent = () => {
  const [calling, setCalling] = useState(false);

  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    calling,
  );

  const [audioTrackStateList, setAudioTrackStateList] = useState<
    {
      isPlay: boolean;
      id: string;
      track: IRemoteAudioTrack;
    }[]
  >();

  const remoteUsers = useRemoteUsers();
  const audioTracks = useRemoteAudioTracks(remoteUsers);
  // audioTracks.map(track => track.play());

  useEffect(() => {
    if (audioTracks && audioTracks.length > 0) {
      const stateList: {
        isPlay: boolean;
        id: string;
        track: IRemoteAudioTrack;
      }[] = [];
      audioTracks.map(track => {
        stateList.push({ isPlay: track.isPlaying, id: track.getTrackId(), track: track });
      });
      setAudioTrackStateList(stateList);
    } else {
      setAudioTrackStateList([]);
    }
  }, [audioTracks]);

  return (
    <Container>
      <div className="h-screen p-3">
        <Title>remote audio track status</Title>
        {audioTrackStateList &&
          audioTrackStateList.length > 0 &&
          audioTrackStateList.map(item => (
            <div key={item.id}>
              <div className="p-4 text-xl">
                <Button
                  onClick={() => {
                    item.isPlay = !item.isPlay;
                    setAudioTrackStateList([...audioTrackStateList]);
                  }}
                  type="primary"
                >
                  {`switch this remote audio track play status`}
                </Button>
              </div>
              {item.isPlay}
              <RemoteAudioTrack play={item.isPlay} track={item.track} />
            </div>
          ))}
      </div>
      <MediaControl
        calling={calling}
        setCalling={() => {
          setCalling(a => !a);
        }}
      />
    </Container>
  );
};

export default RemoteAudioTrackComponent;
