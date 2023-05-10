import type { ConnectionState, IAgoraRTCClient, UID } from "agora-rtc-sdk-ng";

import { useEffect, useState } from "react";
import { listen } from "../listen";
import { joinDisposers, timeout } from "../utils";
import { useRTCClient } from "./context";
import { useAsyncEffect } from "./tools";

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

export interface NetworkQuality {
  /**
   * The uplink network quality.
   *
   * It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.
   *
   * - 0: The quality is unknown.
   * - 1: The quality is excellent.
   * - 2: The quality is good, but the bitrate is less than optimal.
   * - 3: Users experience slightly impaired communication.
   * - 4: Users can communicate with each other, but not very smoothly.
   * - 5: The quality is so poor that users can barely communicate.
   * - 6: The network is disconnected and users cannot communicate.
   */
  uplink: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * The downlink network quality.
   *
   * It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.
   *
   * - 0: The quality is unknown.
   * - 1: The quality is excellent.
   * - 2: The quality is good, but the bitrate is less than optimal.
   * - 3: Users experience slightly impaired communication.
   * - 4: Users can communicate with each other, but not very smoothly.
   * - 5: The quality is so poor that users can barely communicate.
   * - 6: The network is disconnected and users cannot communicate.
   */
  downlink: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * RTT (Round-Trip Time) between the SDK and Agora's edge server, in ms.
   */
  delay: number;
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

export function useAutoJoin(
  appid: string,
  channel: string,
  token: string | null,
  uid?: UID | null,
  client?: IAgoraRTCClient | null,
): void {
  const resolvedClient = useRTCClient(client);

  useAsyncEffect(async () => {
    if (resolvedClient) {
      await resolvedClient.join(appid, channel, token, uid);
      return () => {
        for (const track of resolvedClient.localTracks) {
          if (track.isPlaying) {
            track.stop();
          }
          console.log(11);
          track.close();
        }
        return resolvedClient.leave();
      };
    }
  }, [appid, channel, token, uid, resolvedClient]);
}

export interface joinOptions {
  appid: string;
  channel: string;
  token: string | null;
  uid?: UID | null;
}

export type FetchArgs = (() => Promise<joinOptions>) | joinOptions;

export function useJoin(fetchArgs: FetchArgs, ready = true, client?: IAgoraRTCClient | null): void {
  const resolvedClient = useRTCClient(client);

  useAsyncEffect(async () => {
    if (ready && resolvedClient) {
      try {
        const { appid, channel, token, uid } =
          typeof fetchArgs === "function" ? await fetchArgs() : fetchArgs;
        await resolvedClient.join(appid, channel, token, uid);
      } catch (error) {
        console.error(error);
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
}
