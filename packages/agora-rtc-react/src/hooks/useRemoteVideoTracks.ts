import type {
  IAgoraRTCClient,
  IAgoraRTCError,
  IAgoraRTCRemoteUser,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import { useRef, useState } from "react";

import { AgoraRTCReactError } from "../error";
import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { joinDisposers } from "../misc/utils";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import type { massUserProps } from "./types";
import { useIsConnected } from "./useIsConnected";

/**
 * This hook lets you automatically subscribe to and retrieve remote users' video tracks.
 * When the component is unmounted, this hook stops subscribing to the video tracks of the specified users.
 * This hook updates the subscribed video tracks when the users parameter changes.
 *
 * @param users - The list of remote users.
 * @param client - Created using the Web SDK's [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.
 * @example
 * ```jsx
 * import { useRemoteUsers, useRemoteVideoTracks } from "agora-rtc-react";
 *
 * function App() {
 *   const remoteUsers = useRemoteUsers();
 *   const videoTracks = useRemoteVideoTracks(remoteUsers);
 *
 *   return <></>;
 * }
 * ```
 */
export function useRemoteVideoTracks(
  users: IAgoraRTCRemoteUser[] | undefined,
  client?: IAgoraRTCClient | null,
): { videoTracks: IRemoteVideoTrack[]; isLoading: boolean; error: AgoraRTCReactError | null } {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteVideoTrack[]>([]);
  const isConnected = useIsConnected();
  const nextTracks = useRef<IRemoteVideoTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRTCReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setError(null);
    }

    if (!Array.isArray(users) || !isConnected) return;
    const subscribe = async (user: IAgoraRTCRemoteUser) => {
      if (!user.videoTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          if (!isUnmountRef.current) {
            setIsLoading(true);
          }
          await resolvedClient.subscribe(user, "video");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRTCReactError("IAgoraRTCClient.subscribe", err as IAgoraRTCError));
          }
        }

        if (user.videoTrack && !nextTracks.current.some(track => track.getUserId() === user.uid)) {
          nextTracks.current.push(user.videoTrack);
        }

        // when hot update mode, track will change every time, so need to update nextTracks
        nextTracks.current = nextTracks.current.map(track => {
          if (
            user.videoTrack &&
            track.getUserId() === user.uid &&
            track.getTrackId() !== user.videoTrack.getTrackId()
          ) {
            return user.videoTrack;
          } else {
            return track;
          }
        });
        if (!isUnmountRef.current) {
          setTracks(nextTracks.current);
          setIsLoading(false);
        }
      }
    };

    const unsubscribe = async (user: IAgoraRTCRemoteUser): Promise<void> => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmountRef.current) {
          nextTracks.current = nextTracks.current.filter(track => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          if (!isUnmountRef.current) {
            setIsLoading(true);
          }
          await resolvedClient.unsubscribe(user, "video");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRTCReactError("IAgoraRTCClient.unsubscribe", err as IAgoraRTCError));
          }
        }
        if (!isUnmountRef.current) {
          setIsLoading(false);
        }
      }
    };

    users.map(user => {
      if (!user.videoTrack && user.hasVideo) {
        subscribe(user);
      }
    });

    const unsubscribeList: massUserProps[] = [];
    for (let i = 0; i < nextTracks.current.length; i++) {
      const track = nextTracks.current[i];
      if (!users.some(user => user.uid === track.getUserId())) {
        const user = resolvedClient.remoteUsers.find(user => user.uid === track.getUserId());
        if (user) {
          unsubscribeList.push({
            user,
            mediaType: "video",
          });
        }
        nextTracks.current.splice(i, 1);
        i--;
      }
    }
    if (unsubscribeList.length > 0) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        await resolvedClient.massUnsubscribe(unsubscribeList);
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRTCReactError("IAgoraRTCClient.massUnsubscribe", err as IAgoraRTCError),
          );
        }
      }
      if (!isUnmountRef.current) {
        setTracks(nextTracks.current.slice());
        setIsLoading(false);
      }
    }

    return joinDisposers([
      listen(resolvedClient, "user-published", (pubUser, pubMediaType) => {
        if (users.find(user => user.uid === pubUser.uid) && pubMediaType === "video") {
          subscribe(pubUser);
        }
      }),
      listen(resolvedClient, "user-unpublished", (pubUser, pubMediaType) => {
        if (users.find(user => user.uid === pubUser.uid) && pubMediaType === "video") {
          unsubscribe(pubUser);
        }
      }),
    ]);
  }, [isConnected, resolvedClient, users]);
  return { videoTracks: tracks, isLoading: isLoading, error: error };
}
