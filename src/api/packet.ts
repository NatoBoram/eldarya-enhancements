import { Meta } from "./meta";
import { Result } from "./result.enum";

export interface Packet<Data> {
  result: Result;
  data: Data;
  meta: Meta;
}
