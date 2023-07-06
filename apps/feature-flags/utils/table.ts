import { Col, Row } from "@basestack/design-system/organisms/Table/types";
import { PopupItems } from "@basestack/design-system/molecules/Popup";

export function createTable<T>(
  data: Array<T>,
  headers: Array<string>,
  cols: (item: T, index: number, length: number) => Array<Col>,
  more: (item: T, index: number, length: number) => Array<PopupItems>,
) {
  if (!!data) {
    const rows = data.map((item, index, { length }) => {
      const row: Row = {
        cols: cols(item, index, length),
        more: more(item, index, length),
      };

      return row;
    });

    return { headers, rows };
  }

  return { headers, rows: [] };
}
