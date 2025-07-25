import type { PopupItemsProps } from "@basestack/design-system";
import type { PositionProps, SpaceProps } from "styled-system";

export interface FlagRowProps extends SpaceProps, PositionProps {
  /**
   * Card title
   */
  title: string;
  /**
   * Card title
   */
  description: string;
  /**
   * Card title
   */
  date: string;
  /**
   * Popup items array
   */
  popupItems?: Array<PopupItemsProps>;
  /**
   * Card slug
   */
  slug: string;
  /**
   * Card project id
   */
  projectId: string;
  /**
   * Show icon indicating flag has payload
   */
  hasPayload?: boolean;
  /**
   * Show icon indicating flag has expired
   */
  isExpired?: boolean;
}
