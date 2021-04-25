declare const outfits: Outfit[];

interface Outfit {
  id: number;
  image: ImageDefinition;
  imageWithoutBg: ImageDefinition;
  name: string;
}

interface ImageDefinition {
  type: string;
  image: ImageSizes;
}

interface ImageSizes {
  sd: ImageSource;
  hd: ImageSource;
  xhd: ImageSource;
}

interface ImageSource {
  src: string;
  lastModification: number;
}
