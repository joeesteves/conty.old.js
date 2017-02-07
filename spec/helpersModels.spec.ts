import { DateHelpers } from '../src/helpers'

describe("Date Helpers", () => {
  it("parse Day to string format AAAA-MM-DD", () => {
    expect(DateHelpers.dateToString(new Date())).toMatch(/\d{4}-\d{2}-\d{2}/)
  })
  it("parse Day to string format AAAA-MM-DD", () => {
    expect(DateHelpers.dateToString(new Date('2019-01-01'))).toMatch('2019-01-01')
  })
})