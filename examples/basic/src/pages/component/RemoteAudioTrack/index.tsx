import type { IRemoteAudioTrack } from "agora-rtc-react";
import { RemoteAudioTrack, useJoin, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";

import { Container, MediaControl } from "../../../components";
import { appConfig } from "../../../utils";
const { Title } = Typography;

interface audioTrackStateList {
  isPlay: boolean;
  id: string;
  track: IRemoteAudioTrack;
}

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

  const [audioTrackStateList, setAudioTrackStateList] = useState<audioTrackStateList[]>();

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  useEffect(() => {
    if (audioTracks && audioTracks.length > 0) {
      const stateList: audioTrackStateList[] = [];
      audioTracks.map(track => {
        stateList.push({ isPlay: track.isPlaying, id: track.getTrackId(), track: track });
      });
      setAudioTrackStateList(stateList);
    } else {
      setAudioTrackStateList([]);
    }
  }, [audioTracks]);

  useEffect(() => {
    if (!calling) {
      setAudioTrackStateList([]);
    }
  }, [calling]);

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
