import type { Display } from "../appearance/enums/display.enum"
import type { Format } from "../appearance/enums/format.enum"
import type { AnimationData } from "../appearance/interfaces/animation_data"

declare class Item {
  DISPLAY_ANIMATION: Display.DISPLAY_ANIMATION
  DISPLAY_BACKGROUND: Display.DISPLAY_BACKGROUND
  DISPLAY_BOMBOEUF: Display.DISPLAY_BOMBOEUF
  DISPLAY_BOMBOEUF_IG: Display.DISPLAY_BOMBOEUF_IG
  DISPLAY_FACE: Display.DISPLAY_FACE
  DISPLAY_HOME: Display.DISPLAY_HOME
  DISPLAY_NORMAL: Display.DISPLAY_NORMAL
  DISPLAY_REWARDPOPUP: Display.DISPLAY_REWARDPOPUP
  DISPLAY_ZOOM: Display.DISPLAY_ZOOM

  _animatable: boolean
  _animationData: AnimationData | null
  _categoryId: number
  _group: number
  _hiddenCategories: Record<string, number>
  _id: number
  _image: string
  _locked: number
  _name: string
  _renders: unknown[]
  _type: string
  _worn: boolean

  constructor(
    id: number,
    group: number,
    name: string,
    image: string,
    type: string,
    categoryId: number,
    hiddenCategories: number[],
    animationData: AnimationData | null,
    locked: number
  )

  static load(json: string): unknown[]

  _initRenders(): void
  addRender(render: unknown): void
  getImage(format: Format): string
  getType(): string
  isAnimatable(): boolean
  isMovable(): boolean
  isStrictlyUnique(): boolean
  loadAnimatedVersion(): void
  removeRender(render: unknown): void
  setAnimatable(animatable: boolean): void
  setHiddenCategories(hiddenCategories: Record<string, number>): void
  setImage(image: string): void
}
