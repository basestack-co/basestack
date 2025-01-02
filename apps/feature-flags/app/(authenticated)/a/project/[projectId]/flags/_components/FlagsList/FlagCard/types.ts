import { PositionProps, SpaceProps } from "styled-system";
import { PopupItemsProps } from "@basestack/design-system";

export interface FlagCardProps extends SpaceProps, PositionProps {
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
  popupItems: Array<PopupItemsProps>;
  /**
   * Shows icon with tooltip alerting the flag is expired
   */
  isExpired?: boolean;
  /**
   * Shows icon with tooltip alerting the flag has payload
   */
  hasPayload?: boolean;
  /**
   * Card slug
   */
  slug: string;
  /**
   * Card project id
   */
  projectId: string;
}
