import type React from "react";
import type { SpaceProps } from "styled-system";
import type { PopupItemsProps } from "../Popup";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "xxl";

export type tooltip = {
  textToCopy: string;
  defaultText: string;
  successText: string;
};

export type TableColProps = {
  /**
   * Column title
   */
  title: string;
  /**
   * Optional if to be link
   */
  link?: string;
  /**
   * Optional image before title
   */
  image?: {
    src?: string;
    userName?: string;
  };
  /**
   * Optional eye icon to show and hide text
   */
  hideText?: boolean;
  /**
   * Optional element
   */
  children?: React.ReactNode;
};

export type TableRowProps = {
  /**
   * PCols
   */
  cols: Array<TableColProps>;
  /**
   * Popup items array
   */
  more?: Array<PopupItemsProps>;
  /**
   * Optional copy at te end of the table
   */
  tooltip?: tooltip;
};

export interface TableData {
  headers: Array<string>;
  rows: Array<TableRowProps>;
}

export interface TableProps extends SpaceProps {
  /**
   * Table data
   */
  data: TableData;
  /**
   * If true changes layout on mobile
   */
  isResponsive?: boolean;
  /**
   * Changes the breakpoint where the table ui changes to mobile
   */
  breakpoint?: Breakpoint;
  backgroundColor?: string;
}

export interface RowProps {
  cols: Array<TableColProps>;
  more?: Array<PopupItemsProps>;
  numberOfCols: number;
  tooltip?: tooltip;
  headers: Array<string>;
  isResponsive: boolean;
  breakpoint: Breakpoint;
}
