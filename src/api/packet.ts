import type { Meta } from "./meta";
import type { Result } from "./result.enum";

export interface Packet<Data> {
  result: Result;
  data: Data;
  meta: Meta;
}
