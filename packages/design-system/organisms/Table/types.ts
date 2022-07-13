import { SpaceProps } from "styled-system";
import { PopupItems } from "../../molecules/Popup";

export type Col = {
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

export type Row = {
  /**
   * PCols
   */
  cols: Array<Col>;
  /**
   * Popup items array
   */
  more: Array<PopupItems>;
};

export interface TableProps extends SpaceProps {
  /**
   * Table data
   */
  data: {
    headers: Array<string>;
    rows: Array<Row>;
  };
}

export interface RowProps {
  cols: Array<Col>;
  more: Array<PopupItems>;
  numberOfCols: number;
}
