export declare interface ImageType {
  type: string
  image: ImageQuality
}

interface ImageQuality {
  sd: ImageSource
  hd: ImageSource
  xhd: ImageSource
}

interface ImageSource {
  src: string
  lastModification: number
}
