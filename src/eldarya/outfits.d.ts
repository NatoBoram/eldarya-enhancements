import type { ImageType } from "./image_type"

declare const outfits: Outfit[]

interface Outfit {
	id: number
	image: ImageType
	imageWithoutBg: ImageType
	name: string
}
