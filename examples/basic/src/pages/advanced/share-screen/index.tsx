import {
  useJoin,
  useLocalScreenTrack,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import { Button } from "antd";
import { useEffect, useState } from "react";

import { Container, MediaControl, Room, ScreenShare } from "../../../components";
import { RenderRemoteUsers } from "../../../components/RemoteUsers";
import { appConfig } from "../../../utils";

export const ShareScreen = () => {
  const [calling, setCalling] = useState(false);

  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    calling,
  );

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);

  //screen share
  const [screenShareOn, setScreenShareOn] = useState(false);
  //create screen share track
  const { screenTrack, error } = useLocalScreenTrack(screenShareOn, {}, "auto");
  //if screen got error, close screen share
  useEffect(() => {
    setScreenShareOn(false);
  }, [error]);

  const remoteUsers = useRemoteUsers();
  const { videoTracks } = useRemoteVideoTracks(
    //remember to filter out screen share user to avoid duplicate payment
    remoteUsers.filter(user => user.uid !== appConfig.ShareScreenUID),
  );
  const { audioTracks } = useRemoteAudioTracks(
    //remember to filter out screen share user to avoid duplicate payment
    remoteUsers.filter(user => user.uid !== appConfig.ShareScreenUID),
  );
  audioTracks.map(track => track.play());

  return (
    <Container>
      <div className="h-screen p-3">
        {calling && (
          <>
            <Button onClick={() => setScreenShareOn(a => !a)} type="primary">
              {screenShareOn ? "stop share screen" : "start share screen"}
            </Button>
            {screenShareOn && (
              <ScreenShare
                onCloseScreenShare={() => {
                  setScreenShareOn(false);
                }}
                screenShareOn={screenShareOn}
                screenTrack={screenTrack}
              />
            )}
            <Room
              cameraOn={cameraOn}
              micOn={micOn}
              renderRemoteUsers={() => <RenderRemoteUsers videoTracks={videoTracks} />}
            />
          </>
        )}
      </div>
      <MediaControl
        calling={calling}
        cameraOn={cameraOn}
        micOn={micOn}
        setCalling={() => {
          setCalling(a => !a);
          setScreenShareOn(false);
        }}
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

export default ShareScreen;
