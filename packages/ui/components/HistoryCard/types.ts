import { SpaceProps } from "styled-system";

export type HistoryType =
  | "deleted"
  | "edited"
  | "created"
  | "toggledOn"
  | "toggledOff"
  | "createdProject";

export interface HistoryCardProps extends SpaceProps {
  avatar: string;
  userName: string;
  description: string;
  flagName: string;
  date: string;
  environments: Array<{ name: string; enabled: boolean }>;
  type: HistoryType;
  hasPaddingTop?: boolean;
  hasPaddingBottom?: boolean;
  hasLeftLine?: boolean;
}
