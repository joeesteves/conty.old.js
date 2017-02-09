import { DateHelpers, ModelHelpers } from '../src/helpers'
import { Transaction } from '../src/transaction'
const itemMock = {
  _id: 'item1',
  accountName: 'testAccount',
  importe: 1234,
  organizationId: 1,
  dueDate: '2017-07/02'
}
describe("Transactions Defaults", () => {
  const newTransaction = new Transaction({ type: 'expense', items: [itemMock] })

  /** Helper para testear valores por de propiedades */
  const testPropValue = ({propName, propValue}) => {
    it(`${propName} defaults to ${propValue}`, () => {
      expect(newTransaction[propName]).toEqual(propValue)
    })
  }
  const defautlValuesForProps: { propName: string, propValue: any }[] = [
    { propName: '_id', propValue: ModelHelpers.generateId('transaction') },
    { propName: 'installmentsQty', propValue: 1 },
    { propName: 'seriesQty', propValue: 1 },
    { propName: 'date', propValue: DateHelpers.dateToString(new Date()) },
    { propName: 'type', propValue: 'expense' },
    { propName: 'organizacionID', propValue: undefined },
    { propName: 'description', propValue: undefined },
    { propName: 'errors', propValue: [] }
  ]

  defautlValuesForProps.forEach(defaultValue => testPropValue(defaultValue))

})

describe("Transactions Integrated Validations", () => {
  // it("Throws error if no items are passed, must have one", () => {
  //   expect(() => new Transaction({ type: 'expense' })).toThrowError(/Transaction (.|\s)* required parameter/)
  // })
  // it("Throws error if no type is passed", () => {
  //   expect(() => new Transaction({ items: [itemMock] } )).toThrowError(/Transaction Error:(.|\s)* type is a required parameter/)
  // })

  it("Throws error if type passed isn't one of these [expense, income, recurrent expense, recurrente income, payment, collection]", () => {
    expect(() => new Transaction({ type: 'foo', items: [itemMock] })).toThrowError(/Transaction Error:(.|\s)*only support for: expense, income, recurrent expense, recurrent income, payment, collection types/)
  })

  // it("Throws composed error if no items are passed and no type either", () => {
  //   expect(() => new Transaction({})).toThrowError(/Transaction (.|\s)*is a required parameter(.|\s)* /)
  // })

  // it("Throws composed error if no items are passed and no type is not supported", () => {
  //   expect(() => new Transaction({type: 'foo'})).toThrowError(/Transaction (.|\s)*is a required parameter(.|\s)*only support for:/)
  // })

})