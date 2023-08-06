import { SpaceProps } from "styled-system";

export type Type =
  | "deleted"
  | "edited"
  | "created"
  | "toggledOn"
  | "toggledOff";

export interface HistoryCardProps extends SpaceProps {
  avatar: string;
  userName: string;
  description: string;
  flagName: string;
  date: string;
  environments: Array<{ name: string; enabled: boolean }>;
  type: Type;
  hasPaddingTop?: boolean;
  hasPaddingBottom?: boolean;
}
