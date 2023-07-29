import { SpaceProps } from "styled-system";
import { PopupItemsProps } from "../Popup";

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
};

export type TableRowProps = {
  /**
   * PCols
   */
  cols: Array<TableColProps>;
  /**
   * Popup items array
   */
  more: Array<PopupItemsProps>;
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
}

export interface RowProps {
  cols: Array<TableColProps>;
  more: Array<PopupItemsProps>;
  numberOfCols: number;
  tooltip?: tooltip;
}
