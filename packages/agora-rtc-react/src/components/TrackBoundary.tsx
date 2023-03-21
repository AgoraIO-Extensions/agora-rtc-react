import type { ITrack } from "agora-rtc-sdk-ng";
import type { PropsWithChildren } from "react";
import type { Nullable } from "../utils";

import { createContext, useContext, useEffect, useState } from "react";
import { interval } from "../utils";
import { useIsomorphicLayoutEffect } from "../hooks/tools";

interface TrackBoundaryController {
  tracks: Map<ITrack, number>;
  report: (track: ITrack) => () => void;
  start: () => () => void;
}

function createTrackBoundaryController(): TrackBoundaryController {
  const tracks = new Map<ITrack, number>();
  const CLEAR_INTERVAL = 10000;
  const REPORT_INTERVAL = 1000;

  const stopTracks = (force?: boolean) => {
    const now = Date.now();
    for (const [track, timestamp] of tracks) {
      if (force || now - timestamp > CLEAR_INTERVAL) {
        track.stop();
        tracks.delete(track);
      }
    }
  };

  return {
    tracks,
    report: track => {
      tracks.set(track, Date.now());
      return interval(() => tracks.set(track, Date.now()), REPORT_INTERVAL);
    },
    start: () => {
      const disposer = interval(stopTracks, CLEAR_INTERVAL);
      return () => {
        disposer();
        stopTracks(true);
      };
    },
  };
}

const TrackBoundaryContext = /* @__PURE__ */ createContext<TrackBoundaryController | undefined>(
  void 0,
);

/**
 * Delegates track stop of descendant Track Players.
 * This prevents track stops on Track Players unmounts due to re-layout.
 *
 * @example
 * ```jsx
 * <TrackBoundary>
 *   <RemoteUser user={user1} />
 *   <RemoteUser user={user2} />
 * </TrackBoundary>
 * ```
 *
 * @example
 * ```jsx
 * <TrackBoundary>
 *   <RemoteVideoTrack track={track1} />
 *   <RemoteVideoTrack track={track2} />
 * </TrackBoundary>
 * ```
 */
export function TrackBoundary({ children }: PropsWithChildren) {
  const [controller] = useState(createTrackBoundaryController);

  useEffect(() => controller.start(), [controller]);

  return (
    <TrackBoundaryContext.Provider value={controller}>{children}</TrackBoundaryContext.Provider>
  );
}

/**
 * Stops local or remote track when the component unmounts.
 * If `<TrackBoundary />` exists in ancestor it will not stop track on unmount but delegates to TrackBoundary.
 */
export function useAutoStopTrack(track: Nullable<ITrack>) {
  const controller = useContext(TrackBoundaryContext);

  useIsomorphicLayoutEffect(() => {
    if (track) {
      if (controller) {
        return controller.report(track);
      } else {
        return () => track.stop();
      }
    }
  }, [track, controller]);
}
