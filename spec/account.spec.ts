import { Account } from '../src/account'

describe("Account Defaults", () => {
  const newAccount = new Account({ name: 'OrangeCard', type: 'creditCard' })
  /** Helper para testear valores por de propiedades */
  const testPropValue = ({propName, propValue}) => {
    it(`${propName} defaults to ${propValue}`, () => {
      expect(newAccount[propName]).toEqual(propValue)
    })
  }
  const defautlValuesForProps: { propName: string, propValue: any }[] = [
    // { propName: '_id', propValue: "OrangeCard"  },    
    { propName: 'name', propValue: "OrangeCard" },
    { propName: 'type', propValue: 'creditCard' }
  ]

  defautlValuesForProps.forEach(defaultValue => testPropValue(defaultValue))
})


