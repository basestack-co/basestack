import { SpaceProps } from "styled-system";

export type Type =
  | "deleted"
  | "edited"
  | "created"
  | "toggledOn"
  | "toggledOff";

export interface HistoryCardProps extends SpaceProps {
  userName: string;
  description: string;
  flagName: string;
  date: string;
  environment: string;
  type: Type;
  hasPaddingTop?: boolean;
  hasPaddingBottom?: boolean;
}
