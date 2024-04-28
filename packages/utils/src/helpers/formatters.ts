export const slugify = (text: string) =>
  text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

export const truncateString = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : `${text.substring(0, maxLength - 3)}...`;
