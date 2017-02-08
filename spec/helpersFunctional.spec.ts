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
  it("compose 2 functions that receives multiple params and returns [fns, ...params]", () => {
    const fn1 = (obj:any) => {
      return {
        ...obj,
        fn: (ary) => {
          ary.push("one")
          return ary
        }
      }
    }
    const fn2 = (obj: any) => {  
      return {
        ...obj,
        fn: (ary) => {
          ary = obj.fn(ary)
          ary.push(2)
          return ary
        }
      }
    }
    const fnComposed = FunctionalHelpers.composeWithObjParams(fn1, fn2)

    expect(fnComposed({propertieName: "Test"}).fn([])).toEqual(['one',2])
  })

})