import { ModelHelpers, DateHelpers, FunctionalHelpers } from './helpers'

export class Transaction {
  _id?: string
  _rev?: string
  date?: string //Date ISOString
  type?: string
  organizationId?: number
  description?: string
  items?: Item[]
  installmentsQty?: number
  seriesQty?: number
  seriesId?: string
  errors?:iError[]
  constructor(initObj: Transaction) {
    // sets Defaults for undefined values
    initObj.errors = []
    initObj = Transaction.validate(initObj)
    if(initObj.errors.length > 0){
      Transaction.throwError(Transaction.formatError(initObj.errors))
    }
    initObj._id = initObj._id || ModelHelpers.generateId(this.constructor.name)
    initObj.date = initObj.date || DateHelpers.dateToString(new Date())
    initObj.installmentsQty = initObj.installmentsQty || 1
    initObj.seriesQty = initObj.seriesQty || 1
    return { ...initObj }
  }

  /** --- BEGIN VALIDATION SECTION --- */

  static validate = Transaction.validationCompose(
    Transaction.checkItems,
    Transaction.checkType
  )

  private static validationCompose(...fns) {
    return FunctionalHelpers.compose(...fns)
  }

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

  private static throwError(msg: string) {
    throw new Error(`Transaction Error: ${msg}`)
  }

  private static formatError(errors: iError[]): string {
    return errors.map(error => `\n(${error.scope}) \n\t ${error.message}`).join('')
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

interface iError {
  scope:string
  message: string
}