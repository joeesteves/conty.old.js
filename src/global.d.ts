interface iError {
  scope:string
  message: string
}

interface iModel {
  errors?: iError[]
}