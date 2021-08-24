export function isEnum<T>(value: unknown, enumeration: T): value is T[keyof T] {
  return Object.values(enumeration).includes(value)
}
