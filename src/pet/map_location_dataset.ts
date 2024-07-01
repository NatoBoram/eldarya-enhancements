export interface MapLocationDataset {
	id: number
}

export function getMapLocationDataset(div: HTMLDivElement): MapLocationDataset {
	const dataset = div.dataset
	return {
		id: Number(dataset.id),
	}
}
