import { AnimationData } from "../interfaces/animation_data";
import { Display } from "../enums/display.enum";
import { Format } from "../enums/format.enum";

declare class Item {
  constructor(
    id: number,
    group: number,
    name: string,
    image: string,
    type: string,
    categoryId: number,
    hiddenCategories: { [key: string]: number },
    animationData: AnimationData | null,
    locked: number
  );

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

  setHiddenCategories(hiddenCategories: { [key: string]: number }): void;
  getImage(format: Format): string;
  isAnimatable(): boolean;
  setAnimatable(animatable: boolean): void;
  getType(): string;
  setImage(image: string): void;
  loadAnimatedVersion(): void;
  addRender(render: unknown): void;
  removeRender(render: unknown): void;
  _initRenders(): void;
  isStrictlyUnique(): boolean;
  isMovable(): boolean;

  DISPLAY_NORMAL: Display.DISPLAY_NORMAL;
  DISPLAY_ZOOM: Display.DISPLAY_ZOOM;
  DISPLAY_ANIMATION: Display.DISPLAY_ANIMATION;
  DISPLAY_FACE: Display.DISPLAY_FACE;
  DISPLAY_HOME: Display.DISPLAY_HOME;
  DISPLAY_BOMBOEUF: Display.DISPLAY_BOMBOEUF;
  DISPLAY_BOMBOEUF_IG: Display.DISPLAY_BOMBOEUF_IG;
  DISPLAY_BACKGROUND: Display.DISPLAY_BACKGROUND;
  DISPLAY_REWARDPOPUP: Display.DISPLAY_REWARDPOPUP;

  static load(json: string): unknown[];
}
