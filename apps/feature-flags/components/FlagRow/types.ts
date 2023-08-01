import { SpaceProps, PositionProps } from "styled-system";
import { PopupItemsProps } from "@basestack/design-system";

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
  popupItems: Array<PopupItemsProps>;
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
