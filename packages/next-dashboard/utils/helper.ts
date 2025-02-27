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

// format datetime-local: "YYYY-MM-DDTHH:mm"
export const dbToInputDate = (utcDate: string) => {
  const date = new Date(utcDate); // Konversi string UTC menjadi objek Date

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};