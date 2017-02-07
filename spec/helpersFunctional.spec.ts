import { FunctionalHelpers } from '../src/helpers'

describe("Functional Helpers", () => {
  it("compose 2 functions", () => {
    const duplicateNumber = (number) => number * 2
    const triplicateNumber = (number) => number * 3
    const sextuplicateNumber = FunctionalHelpers.compose(duplicateNumber,triplicateNumber)
    expect(sextuplicateNumber(5)).toEqual(30)
  })
  it("compose 3 functions", () => {
    const duplicateNumber = (number) => number * 2
    const triplicateNumber = (number) => number * 3
    const divideByFive = (number) => number / 5
    const sextuplicateNumber = FunctionalHelpers.compose(duplicateNumber,triplicateNumber,divideByFive)
    expect(sextuplicateNumber(5)).toEqual(6)
  })
})