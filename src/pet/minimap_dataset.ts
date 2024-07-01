export interface MinimapDataset {
	mapid: number
}

export function getMinimapDataset(div: HTMLDivElement): MinimapDataset {
	return {
		mapid: Number(div.dataset.mapid),
	}
}
