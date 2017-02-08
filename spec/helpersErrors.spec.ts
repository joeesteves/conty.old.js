import { ErrorHelpers } from '../src/helpers'

describe("Error Helpers", () => {
  it("throws error", () => {
    expect(() => ErrorHelpers.throwError('test','mensage')).toThrowError()
  })

})