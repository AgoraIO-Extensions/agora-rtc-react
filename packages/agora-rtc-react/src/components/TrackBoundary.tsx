import type { ITrack } from "agora-rtc-sdk-ng";
import type { PropsWithChildren } from "react";
import type { Nullable } from "../utils";

import { createContext, useContext, useEffect, useState } from "react";
import { timeout } from "../utils";
import { useIsomorphicLayoutEffect } from "../hooks/tools";

interface TrackBoundaryController {
  onMount: (track: ITrack) => void;
  onUnmount: (track: ITrack) => void;
  dispose: () => void;
}

function createTrackBoundaryController(): TrackBoundaryController {
  const cancelStops = new Map<ITrack, () => void>();
  const STOP_TIMEOUT = 1500;

  return {
    onMount: track => {
      const cancel = cancelStops.get(track);
      if (cancel) {
        cancel();
        cancelStops.delete(track);
      }
    },
    onUnmount: track => {
      const cancel = cancelStops.get(track);
      if (cancel) {
        cancel();
      }
      cancelStops.set(
        track,
        timeout(() => {
          if (track.isPlaying) {
            track.stop();
          }
          cancelStops.delete(track);
        }, STOP_TIMEOUT),
      );
    },
    dispose: () => {
      for (const [track, cancel] of cancelStops) {
        if (track.isPlaying) {
          track.stop();
        }
        if (cancel) {
          cancel();
        }
      }
      cancelStops.clear();
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

  useEffect(() => controller.dispose, [controller]);

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
        controller.onMount(track);
        return () => controller.onUnmount(track);
      } else {
        return () => track.stop();
      }
    }
  }, [track, controller]);
}
