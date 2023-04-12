import { Col, Row } from "@basestack/design-system/organisms/Table/types";
import { PopupItems } from "@basestack/design-system/molecules/Popup";

export function createTable<T>(
  data: Array<T>,
  headers: Array<string>,
  cols: (item: T) => Array<Col>,
  more: (item: T) => Array<PopupItems>
) {
  if (!!data) {
    const rows = data.map((item) => {
      const row: Row = {
        cols: cols(item),
        more: more(item),
      };

      return row;
    });

    return { headers, rows };
  }

  return { headers, rows: [] };
}
