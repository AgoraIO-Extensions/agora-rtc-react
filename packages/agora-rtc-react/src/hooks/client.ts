import type { ConnectionState, IAgoraRTCClient, IAgoraRTCError, UID } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { AgoraRTCReactError } from "../error";
import { listen } from "../misc/listen";
import { joinDisposers, timeout } from "../misc/utils";
import type { FetchArgs, NetworkQuality } from "../types";

import { useRTCClient } from "./context";
import { useAsyncEffect, useIsUnmounted } from "./tools";

export function useConnectionState(client?: IAgoraRTCClient | null): ConnectionState {
  const resolvedClient = useRTCClient(client);

  const [connectionState, setConnectionState] = useState(
    resolvedClient ? resolvedClient.connectionState : "DISCONNECTED",
  );
  useEffect(() => {
    if (resolvedClient) {
      setConnectionState(resolvedClient.connectionState);
      let dispose: (() => void) | undefined;
      return joinDisposers([
        listen(resolvedClient, "connection-state-change", state => {
          dispose?.();
          if (state === "CONNECTED") {
            // RTC is really connected after a short delay
            dispose = timeout(() => setConnectionState(state), 0);
          } else {
            setConnectionState(state);
          }
        }),
        () => dispose?.(),
      ]);
    } else {
      setConnectionState("DISCONNECTED");
    }
  }, [resolvedClient]);

  return connectionState;
}

export function useIsConnected(client?: IAgoraRTCClient | null): boolean {
  const resolvedClient = useRTCClient(client);

  const [isConnected, setConnected] = useState(
    resolvedClient ? resolvedClient.connectionState === "CONNECTED" : false,
  );
  useEffect(() => {
    if (resolvedClient) {
      setConnected(resolvedClient.connectionState === "CONNECTED");
      let dispose: (() => void) | undefined;
      return joinDisposers([
        listen(resolvedClient, "connection-state-change", state => {
          dispose?.();
          // RTC is really connected after a short delay
          dispose = timeout(() => setConnected(state === "CONNECTED"), 0);
        }),
        () => dispose?.(),
      ]);
    } else {
      setConnected(false);
    }
  }, [resolvedClient]);

  return isConnected;
}

/**
 * @returns The UID of the local user if connected to a channel, `undefined` otherwise.
 */
export function useCurrentUID(client?: IAgoraRTCClient | null): UID | undefined {
  const resolvedClient = useRTCClient(client);

  const [uid, setUID] = useState<UID | undefined>(resolvedClient?.uid);
  useEffect(() => {
    if (resolvedClient) {
      return listen(resolvedClient, "connection-state-change", state => {
        if (state === "CONNECTED") {
          // RTC is really connected after a short delay
          return timeout(() => setUID(resolvedClient.uid), 0);
        } else if (state === "DISCONNECTED") {
          setUID(void 0);
        }
      });
    }
  }, [resolvedClient]);

  return uid;
}

const initQuality = (): NetworkQuality => ({
  uplink: 0,
  downlink: 0,
  delay: 0,
});

/**
 * Reports the network quality of the local user.
 *
 * After the local user joins the channel, the SDK triggers this callback to report the uplink and downlink network conditions of the local user once every two second.
 */
export function useNetworkQuality(client?: IAgoraRTCClient | null): NetworkQuality {
  const resolvedClient = useRTCClient(client);

  const [networkQuality, setNetworkQuality] = useState<NetworkQuality>(initQuality);
  useEffect(() => {
    if (resolvedClient) {
      return listen(resolvedClient, "network-quality", q =>
        setNetworkQuality({
          uplink: q.uplinkNetworkQuality,
          downlink: q.downlinkNetworkQuality,
          delay: resolvedClient.getRTCStats().RTT ?? 0,
        }),
      );
    } else {
      setNetworkQuality(initQuality());
    }
  }, [resolvedClient]);

  return networkQuality;
}

/**
 * a hook to join rtc channel
 * unmount will leave channel and close all tracks
 * @param fetchArgs
 * @param ready
 * @param client
 */
export function useJoin(
  fetchArgs: FetchArgs,
  ready = true,
  client?: IAgoraRTCClient | null,
): { data: UID; isLoading: boolean; isConnected: boolean; error: AgoraRTCReactError | null } {
  const resolvedClient = useRTCClient(client);
  const isConnected = useIsConnected(client);

  const [isLoading, setIsLoading] = useState(false);
  const [joinResult, setJoinResult] = useState<UID>(0);
  const [error, setError] = useState<AgoraRTCReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setError(null);
      setJoinResult(0);
      setIsLoading(false);
    }

    if (ready && resolvedClient) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        const { appid, channel, token, uid } =
          typeof fetchArgs === "function" ? await fetchArgs() : fetchArgs;
        const result = await resolvedClient.join(appid, channel, token, uid);
        if (!isUnmountRef.current) {
          setJoinResult(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(new AgoraRTCReactError("IAgoraRTCClient.join", err as IAgoraRTCError));
        }
      }
      if (!isUnmountRef.current) {
        setIsLoading(false);
      }
      return () => {
        for (const track of resolvedClient.localTracks) {
          if (track.isPlaying) {
            track.stop();
          }
          track.close();
        }
        return resolvedClient.leave();
      };
    }
  }, [ready, client]);
  return {
    data: joinResult,
    isLoading: isLoading,
    isConnected: isConnected,
    error: error,
  };
}
