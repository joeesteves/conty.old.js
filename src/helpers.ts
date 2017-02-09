export const DateHelpers = {
  dateToString: (date): string => date.toISOString().slice(0, 10)
}

export const ModelHelpers = {
  generateId: (type): string => `${type.toLowerCase()}_${DateHelpers.dateToString(new Date())}`
}

export const FunctionalHelpers = {
  compose: (...fns) => x => fns.reduce((prev, curr) => curr(prev), x),
  composeWithObjParams: <T>(...fns) => (x: T) => fns.reduce((prev, curr) => curr(prev), x)
}

export const StringHelpers = {
  capitalize: (str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const ErrorHelpers = {
  throwError: (origen: string, msg: string) => { throw new Error(`${origen} Error: ${msg}`) },
  formatError: (errors: iError[]): string => {
    return errors.map(error => `\n(${error.scope}) \n\t ${error.message}`).join('')
  }
}
interface IComposableParamObj {
  propertieName?: string
  validValues?: string[]
  minLength?: number
  scope?: string
  origin?: string
  fn?: (any) => any
}
interface IPresenceOf {
  propertieName: string
}

interface IValueIn {
  propertieName: string
  validValues: string[]
}

interface ILength {
  propertieName: string
  minLength: number
}
interface IThrowError {
  origin: string
}

const ComposableValidators = {
  preInitValidation: (paramObj: IComposableParamObj) => {    
    return {
      ...paramObj,
      fn: (target) => {
        return { ...target, errors: [] }
      }
    }
  },
  preCheckPresenceOf: (paramObj: IComposableParamObj) => {
    const scope = `${StringHelpers.capitalize(paramObj.propertieName)} parameter`
    return {
      ...paramObj,
      scope,
      fn: (target) => {
        target = paramObj.fn(target)
        if (!target[paramObj.propertieName])
          return { ...target, errors: [...target.errors, { scope, message: `${paramObj.propertieName} is a required parameter` }] }
        return { ...target }
      }
    }
  },
  preCheckValueIn: (paramObj: IComposableParamObj) => {
    return {
      ...paramObj,
      fn: (target) => {
        target = paramObj.fn(target)
        if (target[paramObj.propertieName] && !paramObj.validValues.includes(target[paramObj.propertieName])) {
          return { ...target, errors: [...target.errors, { scope: paramObj.scope, message: `only support for: ${paramObj.validValues.join(', ')} types` }] }
        }
        return { ...target }
      }
    }
  },
  preCheckLength: (paramObj: IComposableParamObj) => {
    return {
      ...paramObj,
      fn: (target) => {
        target = paramObj.fn(target)
        if (target[paramObj.propertieName] && target[paramObj.propertieName].length < paramObj.minLength) {
          return { ...target, errors: [...target.errors, { scope: paramObj.scope, message: `Must have at least ${paramObj.minLength} item` }] }
        }
        return { ...target }
      }
    }
  },
  preThrowErrors: (paramObj: IThrowError) => {
    return {
      ...paramObj,
      fn: (target) => {
        if (target.errors.length > 0) {
          ErrorHelpers.throwError(paramObj.origin, ErrorHelpers.formatError(target.errors))
        }
        return { ...target }
      }
    }
  }
}
export const ValidationHelper = (() => {
  const createValidation = <T>(...fns) => FunctionalHelpers.composeWithObjParams<T>(ComposableValidators.preInitValidation, ...fns)
  
  return {
    composeValidations: (...fns) => FunctionalHelpers.compose(...fns),
    checkPresenceOf: createValidation<IPresenceOf>(ComposableValidators.preCheckPresenceOf),
    checkPresenceAndValueOf: createValidation<IValueIn>(ComposableValidators.preCheckPresenceOf, ComposableValidators.preCheckValueIn),
    checkPresenceAndLengthOf: createValidation<ILength>(ComposableValidators.preCheckPresenceOf, ComposableValidators.preCheckLength),
    throwErrors: createValidation<IThrowError>(ComposableValidators.preThrowErrors)
  }
})()