import {
  PopupItemsProps,
  TableRowProps,
  TableColProps,
} from "@basestack/design-system";

export function createTable<T>(
  data: Array<T>,
  headers: Array<string>,
  cols: (item: T, index: number, length: number) => Array<TableColProps>,
  more: (item: T, index: number, length: number) => Array<PopupItemsProps>,
  copyToClipboard: string,
) {
  if (!!data) {
    const rows = data.map((item, index, { length }) => {
      const row: TableRowProps = {
        cols: cols(item, index, length),
        more: more(item, index, length),
        copyToClipboard,
      };

      return row;
    });

    return { headers, rows };
  }

  return { headers, rows: [] };
}
