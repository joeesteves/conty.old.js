export class Account {
  _id?: string
  _rev?: string
  type: string
  name: string
  constructor(initObj: Account) {
    return { ...initObj }
  }
}
