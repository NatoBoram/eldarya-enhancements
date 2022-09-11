export async function createImage(url: string): Promise<HTMLImageElement> {
  const image = document.createElement("img")
  image.src = url
  await new Promise(resolve => (image.onload = resolve))
  return image
}
