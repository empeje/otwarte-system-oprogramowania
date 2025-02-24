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
