export interface ItemPalette {
  readonly url: string

  /** Hex codes for the palette */
  readonly palette: string[]
}

export enum ItemPalettesFields {
  url = "url",
  palette = "palette",
}
