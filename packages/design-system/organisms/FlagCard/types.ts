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
    text: string;
    isFlagOn: boolean;
  }>;
  /**
   * Popup items array
   */
  popupItems: Array<PopupItems>;
}
