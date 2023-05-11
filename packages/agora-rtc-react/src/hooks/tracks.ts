import { ClientRole } from "agora-rtc-sdk-ng";
import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import type { AsyncTaskRunner } from "../utils";

import { useEffect, useRef, useState } from "react";
import { createAsyncTaskRunner, interval, joinDisposers } from "../utils";
import { listen } from "../listen";
import { useRTCClient } from "./context";
import { useIsConnected } from "./client";
import { useAsyncEffect } from "./tools";

interface massUserProps {
  user: IAgoraRTCRemoteUser;
  mediaType: "audio" | "video";
}

/**
 * Auto-subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "video",
  client?: IAgoraRTCClient | null,
): IRemoteVideoTrack | undefined;
/**
 * Auto-subscribe and get remote user audio track.
 * Unsubscribe track on unmount.
 */
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "audio",
  client?: IAgoraRTCClient | null,
): IRemoteAudioTrack | undefined;
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "video" | "audio",
  client?: IAgoraRTCClient | null,
): IRemoteVideoTrack | IRemoteAudioTrack | undefined {
  const resolvedClient = useRTCClient(client);
  const trackName = mediaType === "audio" ? "audioTrack" : "videoTrack";
  const [track, setTrack] = useState(user && user[trackName]);
  const isConnected = useIsConnected();
  const runnerRef = useRef<AsyncTaskRunner | undefined>();

  useEffect(() => {
    if (!user || !isConnected) return;

    let isUnmounted = false;

    const hasTrack = mediaType === "audio" ? "hasAudio" : "hasVideo";
    const uid = user.uid;

    const unsubscribe = async (
      user: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video",
    ): Promise<void> => {
      if (user[trackName] && resolvedClient.remoteUsers.some(({ uid }) => user.uid === uid)) {
        try {
          await resolvedClient.unsubscribe(user, mediaType);
        } catch (error) {
          console.error(error);
        }
      }
      if (!isUnmounted) {
        setTrack(void 0);
      }
    };

    const subscribe = async (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
      try {
        if (!user[trackName] && resolvedClient.remoteUsers.some(({ uid }) => user.uid === uid)) {
          await resolvedClient.subscribe(user, mediaType);
        }
        if (!isUnmounted) {
          setTrack(user[trackName]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const runner = (runnerRef.current ||= createAsyncTaskRunner());

    if (!user[trackName] && user[hasTrack]) {
      runner.run(() => subscribe(user, mediaType));
    } else {
      setTrack(user[trackName]);
    }

    return joinDisposers([
      () => {
        isUnmounted = true;
        runner.dispose();
      },
      listen(resolvedClient, "user-published", (pubUser, pubMediaType) => {
        if (pubUser.uid === uid && pubMediaType === mediaType) {
          runner.run(() => subscribe(pubUser, mediaType));
        }
      }),
      listen(resolvedClient, "user-unpublished", (pubUser, pubMediaType) => {
        if (pubUser.uid === uid && pubMediaType === mediaType) {
          runner.run(() => unsubscribe(pubUser, mediaType));
        }
      }),
    ]);
  }, [isConnected, resolvedClient, user, mediaType, trackName]);

  return track;
}

/**
 * Reports volume of a videoTrack every second.
 *
 * @param audioTrack Local/Remote audio track. `volumeLevel` is 0 if undefined.
 * @returns The volume of the track, ranging from 0 to 1
 */
export function useVolumeLevel(audioTrack?: IRemoteAudioTrack | ILocalAudioTrack): number {
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    if (audioTrack) {
      return interval(() => {
        setVolumeLevel(audioTrack.getVolumeLevel());
      }, 1000);
    }
  }, [audioTrack]);

  return volumeLevel;
}

/**
 * Auto-subscribe and get remote user audio track.
 * Unsubscribe track on unmount.
 */
export function useRemoteAudioTracks(
  users: IAgoraRTCRemoteUser[] | undefined,
  client?: IAgoraRTCClient | null,
): IRemoteAudioTrack[] {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteAudioTrack[]>([]);
  const isConnected = useIsConnected();
  const nextTracks = useRef<IRemoteAudioTrack[]>([]);

  useAsyncEffect(async () => {
    if (!users || !isConnected) return;
    let isUnmounted = false;
    const subscribe = async (user: IAgoraRTCRemoteUser) => {
      if (!user.audioTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          await resolvedClient.subscribe(user, "audio");
        } catch (error) {
          console.error(error);
        }

        if (user.audioTrack && !nextTracks.current.some(track => track.getUserId() === user.uid)) {
          nextTracks.current.push(user.audioTrack);
        }

        // when hot update mode, track will change every time, so need to update nextTracks
        nextTracks.current = nextTracks.current.map(track => {
          if (
            user.audioTrack &&
            track.getUserId() === user.uid &&
            track.getTrackId() !== user.audioTrack.getTrackId()
          ) {
            return user.audioTrack;
          } else {
            return track;
          }
        });

        if (!isUnmounted) {
          setTracks(nextTracks.current);
        }
      }
    };

    const unsubscribe = async (user: IAgoraRTCRemoteUser): Promise<void> => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmounted) {
          nextTracks.current = nextTracks.current.filter(track => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          await resolvedClient.unsubscribe(user, "audio");
        } catch (error) {
          console.error(error);
        }
      }
    };

    users.map(user => {
      if (!user.audioTrack && user.hasAudio) {
        subscribe(user);
      }
    });

    const unsubscribeList: massUserProps[] = [];
    for (let i = 0; i < nextTracks.current.length; i++) {
      const track = nextTracks.current[i];
      if (users && users.length > 0 && !users.some(user => user.uid === track.getUserId())) {
        const user = resolvedClient.remoteUsers.find(user => user.uid === track.getUserId());
        if (user) {
          unsubscribeList.push({
            user,
            mediaType: "audio",
          });
          nextTracks.current.splice(i, 1);
          i--;
        }
      }
    }
    if (unsubscribeList.length > 0) {
      await resolvedClient.massUnsubscribe(unsubscribeList);
      if (!isUnmounted) {
        setTracks(nextTracks.current.slice());
      }
    }

    return joinDisposers([
      () => {
        isUnmounted = true;
      },
      listen(resolvedClient, "user-published", (pubUser, pubMediaType) => {
        if (users.find(user => user.uid === pubUser.uid) && pubMediaType === "audio") {
          subscribe(pubUser);
        }
      }),
      listen(resolvedClient, "user-unpublished", (pubUser, pubMediaType) => {
        if (users.find(user => user.uid === pubUser.uid) && pubMediaType === "audio") {
          unsubscribe(pubUser);
        }
      }),
    ]);
  }, [isConnected, resolvedClient, users]);

  return tracks;
}

/**
 * Auto-subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
export function useRemoteVideoTracks(
  users: IAgoraRTCRemoteUser[] | undefined,
  client?: IAgoraRTCClient | null,
): IRemoteVideoTrack[] {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = useState<IRemoteVideoTrack[]>([]);
  const isConnected = useIsConnected();
  const nextTracks = useRef<IRemoteVideoTrack[]>([]);

  useAsyncEffect(async () => {
    if (!users || !isConnected) return;
    let isUnmounted = false;
    const subscribe = async (user: IAgoraRTCRemoteUser) => {
      if (!user.videoTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          await resolvedClient.subscribe(user, "video");
        } catch (error) {
          console.error(error);
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
        if (!isUnmounted) {
          setTracks(nextTracks.current);
        }
      }
    };

    const unsubscribe = async (user: IAgoraRTCRemoteUser): Promise<void> => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmounted) {
          nextTracks.current = nextTracks.current.filter(track => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          await resolvedClient.unsubscribe(user, "video");
        } catch (error) {
          console.error(error);
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
      if (users && users.length > 0 && !users.some(user => user.uid === track.getUserId())) {
        const user = resolvedClient.remoteUsers.find(user => user.uid === track.getUserId());
        if (user) {
          unsubscribeList.push({
            user,
            mediaType: "video",
          });
          nextTracks.current.splice(i, 1);
          i--;
        }
      }
    }
    if (unsubscribeList.length > 0) {
      await resolvedClient.massUnsubscribe(unsubscribeList);
      if (!isUnmounted) {
        setTracks(nextTracks.current.slice());
      }
    }

    return joinDisposers([
      () => {
        isUnmounted = true;
      },
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
  return tracks;
}

export function usePublish(
  tracks?: ILocalTrack[],
  client?: IAgoraRTCClient,
  readyToPublish = true,
): void {
  const resolvedClient = useRTCClient(client);
  const isConnected = useIsConnected(client);
  if (!tracks) {
    tracks = resolvedClient.localTracks;
  }
  useAsyncEffect(async () => {
    if (!readyToPublish || !resolvedClient) {
      return;
    }
    // let isUnmounted = false;
    const baseCheck = (track: ILocalTrack): boolean => {
      if (!isConnected) {
        return false;
      }
      // if (resolvedClient === "audience") {
      //   return false;
      // }
      // if (!track.enabled) {
      //   return false;
      // }
      if (!track.muted) {
        return false;
      }
      return true;
    };
    const canPublish = async (track: ILocalTrack): Promise<boolean> => {
      if (!baseCheck(track)) {
        return false;
      }
      if (track.enabled) {
        return false;
      }
      if (track.isPlaying) {
        return false;
      }
      return true;
    };
    const canUnPublish = async (track: ILocalTrack): Promise<boolean> => {
      if (!track.muted) {
        return false;
      }
      // if(track)
      return true;
    };
    if (tracks && tracks.length > 0) {
      console.log(resolvedClient);
      for (const track of tracks) {
        try {
          if (await canPublish(track)) {
            // await resolvedClient.setClientRole("host");
            resolvedClient.publish(track);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    // const publish = async () => {
    //   setIsPublishing(true);
    //   try {
    //     await client.publish(tracks);
    //     if (!isUnmounted) {
    //       setIsPublished(true);
    //     }
    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     if (!isUnmounted) {
    //       setIsPublishing(false);
    //     }
    //   }
    // };
    // publish();
    return joinDisposers([
      listen(resolvedClient, "user-joined", user => {
        console.log(user);
      }),
      listen(resolvedClient, "user-left", user => {
        console.log(user);
      }),
    ]);
  }, [readyToPublish, resolvedClient, tracks]);
}
