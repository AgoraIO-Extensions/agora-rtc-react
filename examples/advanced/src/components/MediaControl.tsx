import { SVGCamera, SVGCameraMute, SVGMicrophone, SVGMicrophoneMute } from "agora-rtc-react-ui";
import clsx from "clsx";

interface MediaControlProps {
  calling?: boolean;
  showCallBtn?: boolean;
  micOn: boolean;
  cameraOn: boolean;
  setMic: () => void;
  setCamera: () => void;
  setCalling?: () => void;
}
/* Camera and Microphone Controls */
export const MediaControl = ({
  calling,
  micOn,
  cameraOn,
  setMic,
  setCamera,
  setCalling,
  showCallBtn = true,
}: MediaControlProps) => (
  <>
    <div className="inset-0 top-a flex justify-center items-center gap-3 px-6 py-3 bg-#21242c c-coolgray-3">
      <div className="flex-1 flex top-0 left-0 h-full items-center gap-3 px-6 py-3">
        <button className="btn" onClick={() => setMic()}>
          {micOn ? <SVGMicrophone /> : <SVGMicrophoneMute />}
        </button>
        <button className="btn" onClick={() => setCamera()}>
          {cameraOn ? <SVGCamera /> : <SVGCameraMute />}
        </button>
      </div>
      {showCallBtn && (
        <button
          className={clsx("btn btn-phone", { "btn-phone-active": calling })}
          onClick={() => setCalling && setCalling()}
        >
          {calling ? <i className="i-mdi-phone-hangup" /> : <i className="i-mdi-phone" />}
        </button>
      )}
    </div>
  </>
);
