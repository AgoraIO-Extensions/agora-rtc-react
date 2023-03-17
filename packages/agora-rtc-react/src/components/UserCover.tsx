import "./UserCover.css";

import type { HTMLProps } from "react";

export interface UserCoverProps extends HTMLProps<HTMLDivElement> {
  /**
   * Cover image url.
   */
  cover?: string;
}

/**
 * User Cover image with blur background
 */
export function UserCover({ cover, ...props }: UserCoverProps) {
  return (
    <div {...props}>
      <div className="arr-remote-user-cover-blur" style={{ backgroundImage: `url(${cover})` }} />
      <img className="arr-remote-user-cover-img" src={cover} />
    </div>
  );
}
