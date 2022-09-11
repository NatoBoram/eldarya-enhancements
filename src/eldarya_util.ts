export function trimImageUrl(icon: string): string {
  const tilde = icon.lastIndexOf("~")
  const dot = icon.lastIndexOf(".")
  if (tilde === -1 || dot === -1) return icon

  return icon.substring(0, tilde) + icon.substring(dot)
}

export function toWebHd(icon: string): string {
  return trimImageUrl(icon.replace("icon", "web_hd"))
}

export function toWebFull(icon: string): string {
  return trimImageUrl(icon.replace("icon", "web_full"))
}
