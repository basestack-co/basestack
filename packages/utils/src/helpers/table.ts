export function createTable<TData, TCols, TMore>(
  data: Array<TData>,
  headers: Array<string>,
  cols: (item: TData, index: number, length: number) => Array<TCols>,
  more: (item: TData, index: number, length: number) => Array<TMore>,
  copy?: (item: TData) => {
    textToCopy: string;
    defaultText: string;
    successText: string;
  },
) {
  if (!!data) {
    const rows = data.map((item, index, { length }) => {
      const row: {
        more: Array<TMore>;
        cols: Array<TCols>;
        tooltip?: {
          textToCopy: string;
          defaultText: string;
          successText: string;
        };
      } = {
        cols: cols(item, index, length),
        more: more(item, index, length),
        ...(copy ? { tooltip: copy(item) } : {}),
      };

      return row;
    });

    return { headers, rows };
  }

  return { headers, rows: [] };
}
