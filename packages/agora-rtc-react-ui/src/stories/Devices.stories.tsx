import { randFood, randNumber, randUuid, seed } from "@ngneat/falso";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useMemo, useState } from "react";

const meta: Meta = {
  title: "Recipes/Devices",
  tags: ["autodocs"],
};

export default meta;

/**
 * **Note**: You should call `AgoraRTC.getDevices()` to get real data.
 */
function getDevices(): Promise<MediaDeviceInfo[]> {
  const fakeDevices: MediaDeviceInfo[] = [];
  let n: number;

  n = randNumber({ min: 1, max: 10 });
  while (n--) fakeDevices.push(fakeDevice("audioinput"));
  n = randNumber({ min: 1, max: 10 });
  while (n--) fakeDevices.push(fakeDevice("audiooutput"));
  n = randNumber({ min: 1, max: 10 });
  while (n--) fakeDevices.push(fakeDevice("videoinput"));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate user denies access to media devices.
      if (Math.random() < 0.5) {
        reject(new Error("Permission denied"));
      }
      resolve(fakeDevices);
    }, 1000);
  });
}

function fakeDevice(kind: MediaDeviceKind): MediaDeviceInfo {
  seed(kind);
  const groupId = randUuid();
  seed();
  return {
    deviceId: randUuid(),
    groupId,
    kind,
    label: randFood(),
    toJSON() {
      return this.deviceId;
    },
  };
}

export const Devices: StoryObj = {
  render: function Devices() {
    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [hasError, setError] = useState(false);

    useEffect(() => {
      let isMounted = true;
      getDevices()
        .then(devices => {
          if (isMounted) setDevices(devices);
        })
        // **Note**: Make sure to handle errors that may occur when user denies access to media devices.
        .catch(() => {
          if (isMounted) setError(true);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
      return () => {
        isMounted = false;
      };
    }, []);

    const audioInputs = useMemo(() => devices.filter(e => e.kind === "audioinput"), [devices]);
    const audioOutputs = useMemo(() => devices.filter(e => e.kind === "audiooutput"), [devices]);
    const videoInputs = useMemo(() => devices.filter(e => e.kind === "videoinput"), [devices]);

    const [micDeviceId, setMicDeviceId] = useState("");
    // select first mic device if current mic device is not available
    useEffect(() => {
      if (audioInputs.length > 0 && !audioInputs.some(e => e.deviceId === micDeviceId)) {
        setMicDeviceId(audioInputs[0].deviceId);
      }
    }, [audioInputs, micDeviceId]);

    const [playbackDeviceId, setPlaybackDeviceId] = useState("");
    useEffect(() => {
      if (audioOutputs.length > 0 && !audioOutputs.some(e => e.deviceId === playbackDeviceId)) {
        setPlaybackDeviceId(audioOutputs[0].deviceId);
      }
    }, [audioOutputs, playbackDeviceId]);

    const [cameraDeviceId, setCameraDeviceId] = useState("");
    useEffect(() => {
      if (videoInputs.length > 0 && !videoInputs.some(e => e.deviceId === cameraDeviceId)) {
        setCameraDeviceId(videoInputs[0].deviceId);
      }
    }, [videoInputs, cameraDeviceId]);

    return (
      <div>
        <h1>Devices</h1>
        {hasError ? (
          <p>Failed to get devices.</p>
        ) : loading ? (
          <div>Fetching devices...</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label>
              <span>Microphone:&nbsp;</span>
              <select onChange={e => setMicDeviceId(e.target.value)}>
                {audioInputs.map(({ deviceId, label }) => (
                  <option key={deviceId} value={deviceId}>
                    {label || "default"}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Camera:&nbsp;</span>
              <select onChange={e => setCameraDeviceId(e.target.value)}>
                {videoInputs.map(({ deviceId, label }) => (
                  <option key={deviceId} value={deviceId}>
                    {label || "default"}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Playback:&nbsp;</span>
              <select onChange={e => setMicDeviceId(e.target.value)}>
                {audioOutputs.map(({ deviceId, label }) => (
                  <option key={deviceId} value={deviceId}>
                    {label || "default"}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    options: { showPanel: false },
  },
};
