import { Context } from "hogan.js";

export interface CarouselNews extends Context {
  id?: String;
  href?: String;
  backgroundImage: String;
  h4: String;
  h5?: String;
  p: String;
}
