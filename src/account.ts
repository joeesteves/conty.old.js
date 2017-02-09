import { ValidationHelper } from './helpers'
export class Account implements iModel {
  _id?: string
  _rev?: string
  type: string
  name: string
  errors?: iError[]
  constructor(initObj: Account) {
    initObj = Account.validate(initObj)
    return { ...initObj }
  }
  static validate = ValidationHelper.composeValidations(
    ValidationHelper.checkPresenceAndValueOf({propertieName: 'type', validValues: ['bank', 'creditCard', 'cash']}).fn,
    ValidationHelper.throwErrors({origin: "Account" }).fn
  )

}
