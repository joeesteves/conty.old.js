import { ValidationHelper, StringHelpers } from '../src/helpers'

describe("CheckPrecenseOf", () => {
  const propertyToTest = 'name'
  it("Returns empty error array if validation passes", () => {
    const validObjetct = ValidationHelper.checkPresenceOf({propertieName: propertyToTest }).fn({[propertyToTest]: "Joseph"})
    expect(validObjetct.errors).toEqual([])
  })
   it("Returns error array with 1 object { scope, message }", () => {
    const validObjetct = ValidationHelper.checkPresenceOf({propertieName: 'name'}).fn({})
    expect(validObjetct.errors.length).toEqual(1)
    expect(validObjetct.errors[0].scope).toMatch(/Name parameter/)
    expect(validObjetct.errors[0].message).toMatch(/required parameter/)
    
  })
})
 
describe("CheckPrecenseAndValueOf", () => {
  const propertyToTest = 'type'
  const validator = ValidationHelper.checkPresenceAndValueOf({propertieName: propertyToTest, validValues: ['test'] })
  it("Returns empty error array if validation passes", () => {
    const validObjetct = validator.fn({[propertyToTest]: 'test'})
    expect(validObjetct.errors).toEqual([])
  })
   it("Returns error array with 1 object { scope, message } if type value is not valid", () => {
    const validObjetct = validator.fn({[propertyToTest]: "foo"})
    expect(validObjetct.errors.length).toEqual(1)
    expect(validObjetct.errors[0].scope).toMatch(`${StringHelpers.capitalize(propertyToTest)} parameter`)
    expect(validObjetct.errors[0].message).toMatch(/only support for: test types/)
  })
  it("Returns error array with 1 object { scope, message } if type isn't pass as argument", () => {
    const validObjetct = validator.fn({})
    expect(validObjetct.errors.length).toEqual(1)
    expect(validObjetct.errors[0].scope).toMatch(`${StringHelpers.capitalize(propertyToTest)} parameter`)
    expect(validObjetct.errors[0].message).toMatch(/type is a required parameter/)
  })
})

describe("CheckPrecenseAndLengthOf", () => {
  const propertyToTest = 'collection', expectedMinLength = 2
  const validator = ValidationHelper.checkPresenceAndLengthOf({propertieName: propertyToTest, minLength: expectedMinLength })
  it("Returns empty error array if validation passes", () => {
    const validObjetct = validator.fn({[propertyToTest]: [2,3]})
    expect(validObjetct.errors).toEqual([])
  })
   it(`Returns error array with 1 object { scope, message } if type value length is less than ${expectedMinLength}`, () => {
    const validObjetct = validator.fn({[propertyToTest]: [1] })
    expect(validObjetct.errors.length).toEqual(1)
    expect(validObjetct.errors[0].scope).toMatch(`${StringHelpers.capitalize(propertyToTest)} parameter`)
    expect(validObjetct.errors[0].message).toMatch(`Must have at least ${expectedMinLength}`)
  })
})
 