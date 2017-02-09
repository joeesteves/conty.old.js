import { ModelHelpers, DateHelpers, ErrorHelpers, ValidationHelper } from './helpers'

export class Transaction implements iModel {
  _id?: string
  _rev?: string
  date?: string //Date ISOString
  type: string
  organizationId?: number
  description?: string
  items: Item[]
  installmentsQty?: number
  seriesQty?: number
  seriesId?: string
  errors?: iError[]
  constructor(initObj: Transaction) {
    // sets Defaults for undefined values
    initObj = Transaction.validate(initObj)
    initObj._id = initObj._id || ModelHelpers.generateId(this.constructor.name)
    initObj.date = initObj.date || DateHelpers.dateToString(new Date())
    initObj.installmentsQty = initObj.installmentsQty || 1
    initObj.seriesQty = initObj.seriesQty || 1
    return { ...initObj }
  }

  /** --- BEGIN VALIDATION SECTION --- */

  static validate = ValidationHelper.composeValidations(
    ValidationHelper.checkPresenceAndLengthOf({propertieName: 'items', minLength: 1}).fn,
    ValidationHelper.checkPresenceAndValueOf({propertieName: 'type', validValues: ['expense', 'income', 'recurrent expense', 'recurrent income', 'payment', 'collection']}).fn,
    ValidationHelper.throwErrors({origin: 'Transaction'}).fn
  )

  private static checkItems(initObj: Transaction): Transaction {
    const scope = 'Items parameter'
    if (!initObj.items || initObj.items.length < 1)
      return { ...initObj, errors: [...initObj.errors, { scope, message: 'Must have at least one item' }] }
    return initObj
    /** Here all the checks that items must acomplish */
  }

  private static checkType(initObj: Transaction): Transaction {
    const scope = 'Type parameter',
      supportedTypes = ['expense', 'income', 'recurrent expense', 'recurrent income', 'payment', 'collection']
    if (!initObj.type) {
      return { ...initObj, errors: [...initObj.errors, { scope, message: 'type is a required parameter' }] }
    } else if (!supportedTypes.includes(initObj.type)) {
      return { ...initObj, errors: [...initObj.errors, { scope, message: `only support for: ${supportedTypes.join(', ')} types` }] }
    }
    return initObj
  }

  private static finalCheck(initObj: Transaction): Transaction {
    if(initObj.errors.length > 0){
      ErrorHelpers.throwError('Transaction', ErrorHelpers.formatError(initObj.errors))
    }
    return initObj
  }
  /** --- END VALIDATION SECTION --- */

}

class Item {
  _id: string
  accountName: string
  importe: number
  organizationId: number
  dueDate: string
}