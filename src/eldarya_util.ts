export function trimIcon(icon: string): string {
	const tilde = icon.lastIndexOf("~")
	const dot = icon.lastIndexOf(".")
	if (tilde === -1 || dot === -1) return icon

	return icon.substring(0, tilde) + icon.substring(dot)
}
