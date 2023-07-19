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
  popupItems: Array<PopupItemsProps>;
}
