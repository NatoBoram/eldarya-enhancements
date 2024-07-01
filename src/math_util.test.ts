import { describe, test } from "vitest"
import { MathUtil } from "./math_util"

describe("MathUtil", () => {
	test("randomBetween", ({ expect }) => {
		const result = MathUtil.randomBetween(0, 0)
		expect(result).toBe(0)
	})

	test("phi", ({ expect }) => {
		expect(MathUtil.phi).toBe(1.618033988749895)
	})
})
