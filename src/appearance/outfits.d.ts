declare const outfits: Array<Outfit>;

interface Outfit {
  id: number;
  image: ImageWithoutBgClass;
  imageWithoutBg: ImageWithoutBgClass;
  name: string;
}

interface ImageWithoutBgClass {
  type: string;
  image: ImageImage;
}

interface ImageImage {
  sd: ImageDefinition;
  hd: ImageDefinition;
  xhd: ImageDefinition;
}

interface ImageDefinition {
  src: string;
  lastModification: number;
}
