export function isEnum<T extends Record<number | string | symbol, unknown>>(
	value: unknown,
	enumeration: T,
): value is T[keyof T] {
	return Object.values(enumeration).includes(value)
}
