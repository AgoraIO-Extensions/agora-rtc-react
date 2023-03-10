import AgoraRTC from "agora-rtc-sdk-ng";
import { CameraVideoTrack, MicrophoneAudioTrack, useAwaited } from "agora-rtc-react";
import { useMemo, useState } from "react";

AgoraRTC.setLogLevel(/* warning */ 2);

export const App = () => {
  const [micDeviceId, setMicDeviceId] = useState<string | undefined>();
  const [cameraDeviceId, setCameraDeviceId] = useState<string | undefined>();
  const devices = useAwaited(useMemo(() => AgoraRTC.getDevices(), []));
  const [audioInputs, videoInputs] = useMemo(() => {
    if (devices) {
      const audioInputs: MediaDeviceInfo[] = [];
      const videoInputs: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind === "audioinput") {
          audioInputs.push(device);
        } else if (device.kind === "videoinput") {
          videoInputs.push(device);
        }
      }
      return [audioInputs, videoInputs];
    } else {
      return [[], []];
    }
  }, [devices]);

  const [mic, setMic] = useState(false);
  const audioTrack = useMemo(
    () => (mic ? AgoraRTC.createMicrophoneAudioTrack({ ANS: true, AEC: true }) : null),
    [mic],
  );

  const [camera, setCamera] = useState(false);
  const videoTrack = useMemo(() => (camera ? AgoraRTC.createCameraVideoTrack() : null), [camera]);

  return (
    <>
      <div className="controls">
        <label>
          <input type="checkbox" checked={mic} onChange={e => setMic(e.target.checked)} />
          <span>
            Microphone:&nbsp;
            <select value={micDeviceId} onChange={e => setMicDeviceId(e.target.value)}>
              {audioInputs.map((device, i) => (
                <option key={i} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </span>
        </label>
        <label>
          <input type="checkbox" checked={camera} onChange={e => setCamera(e.target.checked)} />
          <span>
            Camera:&nbsp;
            <select value={cameraDeviceId} onChange={e => setCameraDeviceId(e.target.value)}>
              {videoInputs.map((device, i) => (
                <option key={i} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>
      <div className="tracks">
        {mic && <MicrophoneAudioTrack track={audioTrack} deviceId={micDeviceId} />}
        {camera && (
          <CameraVideoTrack
            track={videoTrack}
            width={320}
            height={180}
            play
            deviceId={cameraDeviceId}
          />
        )}
      </div>
    </>
  );
};

export default App;
