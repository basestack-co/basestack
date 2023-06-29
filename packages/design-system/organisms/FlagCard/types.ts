import { PositionProps, SpaceProps } from "styled-system";
import { PopupItems } from "../../molecules/Popup";

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
   * Environments where flag is created
   */
  environments: Array<{
    id: string;
    name: string;
    enabled: boolean;
  }>;
  /**
   * Popup items array
   */
  popupItems: Array<PopupItems>;
  /**
   * Shows icon with tooltip alerting the flag is expired
   */
  isExpired?: boolean;
  /**
   * Shows icon with tooltip alerting the flag has payload
   */
  hasPayload?: boolean;
}
