type ClassNameValue = string | false | null | undefined;

export function cn(...inputs: ClassNameValue[]) {
  return inputs
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .join(" ");
}
