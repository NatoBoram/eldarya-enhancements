import type { Meta } from "./meta"
import type { Result } from "./result.enum"

export type Packet<T> = PacketError | PacketSuccess<T>

interface PacketSuccess<T> {
  result: Result.success
  data: T
  meta: Meta
}

interface PacketError {
  result: Result.error
  data: string
  meta: Meta
}
