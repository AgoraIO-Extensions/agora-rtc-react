import type { ITrack } from "agora-rtc-sdk-ng";
import type { PropsWithChildren } from "react";
import type { Nullable } from "../utils";

import { createContext, useContext, useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "./tools";

export const TrackBoundaryContext = /* @__PURE__ */ createContext<Set<ITrack> | undefined>(void 0);

/**
 * Delegates track stop of descendant Track Players.
 * This prevents track stops on track players unmounting.
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
  const [tracks] = useState(() => new Set<ITrack>());

  useEffect(
    () => () => {
      for (const track of tracks) {
        track.stop();
      }
    },
    [tracks],
  );

  return <TrackBoundaryContext.Provider value={tracks}>{children}</TrackBoundaryContext.Provider>;
}

/**
 * Releases local or remote track when the component unmounts.
 */
export function useAutoStopTrack(track: Nullable<ITrack>) {
  const tracks = useContext(TrackBoundaryContext);

  useIsomorphicLayoutEffect(() => {
    if (track) {
      if (tracks) {
        tracks.add(track);
        return () => {
          tracks.delete(track);
        };
      } else {
        return () => track.stop();
      }
    }
  }, [track, tracks]);
}
