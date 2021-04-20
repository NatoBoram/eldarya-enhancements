declare const availableItems: {
  [id: number]: AvailableItem;
};

interface AvailableItem {
  _id: number;
  _group: number;
  _name: string;
  _image: string;
  _type: string;
  _categoryId: number;
  _animationData: AnimationData | null;
  _locked: number;
  _hiddenCategories: { [key: string]: number };
  _worn: boolean;
  _animatable: boolean;
  _renders: unknown[];
}

interface AnimationData {
  a: string[];
}
