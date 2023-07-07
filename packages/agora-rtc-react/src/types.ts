import type { UID } from "agora-rtc-sdk-ng";

export type FetchArgs = (() => Promise<JoinOptions>) | JoinOptions;

export interface JoinOptions {
  appid: string;
  channel: string;
  token: string | null;
  uid?: UID | null;
}

/**
 * 上下行 last mile 网络质量。
 */
export interface NetworkQuality {
  /**
   * 上行网络质量。基于上行发送码率、上行丢包率、平均往返时延和网络抖动计算。0: 质量未知。1: 质量极好。2: 用户主观感觉和极好差不多，但码率可能略低于极好。3: 用户主观感受有瑕疵但不影响沟通。4: 勉强能沟通但不顺畅。5: 网络质量非常差，基本不能沟通。6: 网络连接断开，完全无法沟通。
   */
  uplink: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * 下行网络质量。基于下行发送码率、下行丢包率、平均往返时延和网络抖动计算。0: 质量未知。1: 质量极好。2: 用户主观感觉和极好差不多，但码率可能略低于极好。3: 用户主观感受有瑕疵但不影响沟通。4: 勉强能沟通但不顺畅。5: 网络质量非常差，基本不能沟通。6: 网络连接断开，完全无法沟通。
   */
  downlink: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * SDK 到声网边缘服务器的平均往返时延（Round-Trip Time)，单位 ms。
   */
  delay: number;
}
