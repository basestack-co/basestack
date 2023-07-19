import { SpaceProps } from "styled-system";
import { PopupItemsProps } from "../Popup";

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
}
