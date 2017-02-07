class Organizaction {
  _id?: string
  _rev?: string
  name: string
  constructor(initObj: Organizaction){
    return {...initObj}
  }
}