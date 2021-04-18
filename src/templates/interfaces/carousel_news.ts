import { Context } from "hogan.js";

export interface CarouselNews extends Context {
  id?: string;
  href?: string;
  backgroundImage: string;
  h4: string;
  h5?: string;
  p: string;
}
