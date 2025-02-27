export type ClassNameType =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassNameType[];

export function classNames(...classes: ClassNameType[]): string {
  return classes.flat().filter(Boolean).join(" ");
}

export function dateFormatter(
  date: number | Date,
  locales: string,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: "short",
    year: "numeric",
  },
) {
  const formatter = new Intl.DateTimeFormat(locales, options);
  return formatter.format(date);
}