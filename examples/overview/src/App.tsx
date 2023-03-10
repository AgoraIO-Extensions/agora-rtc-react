import AgoraRTC from "agora-rtc-sdk-ng";
import { LocalAudioTrack, LocalVideoTrack } from "agora-rtc-react";
import { useMemo, useState } from "react";

AgoraRTC.setLogLevel(/* warning */ 2);

export const App = () => {
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);

  const audioTrack = useMemo(
    () => (mic ? AgoraRTC.createMicrophoneAudioTrack({ ANS: true, AEC: true }) : null),
    [mic],
  );
  const videoTrack = useMemo(() => (camera ? AgoraRTC.createCameraVideoTrack() : null), [camera]);

  return (
    <>
      <div>
        <label>
          <input type="checkbox" checked={mic} onChange={e => setMic(e.target.checked)} />
          <span>Microphone</span>
        </label>
        <label>
          <input type="checkbox" checked={camera} onChange={e => setCamera(e.target.checked)} />
          <span>Camera</span>
        </label>
      </div>
      <div className="tracks">
        {mic && <LocalAudioTrack track={audioTrack} />}
        {camera && <LocalVideoTrack track={videoTrack} width={320} height={180} play />}
      </div>
    </>
  );
};

export default App;
