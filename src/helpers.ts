export const DateHelpers = {
  dateToString: (date): string => date.toISOString().slice(0, 10)
}

export const ModelHelpers = {
  generateId: (type): string => `${type.toLowerCase()}_${DateHelpers.dateToString(new Date())}`
}

export const FunctionalHelpers = {
  compose: (...fns) => x => fns.reduce((prev, curr) => curr(prev), x),
  composeWithObjParams: (...fns) => (x: iParamObj) => fns.reduce((prev, curr) => curr(prev), x)
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
interface iParamObj {
  propertieName: string
  validValues?: string[]
  scope?: string
  fn?: (any) => any
}

const ComposableValidators = {
  preCheckPresenceOf: (paramObj: iParamObj) => {
    const scope = `${StringHelpers.capitalize(paramObj.propertieName)} parameter`
    return {
      ...paramObj,
      scope,
      fn: (target) => {
        if (!target[paramObj.propertieName])
          return { ...target, errors: [...target.errors, { scope, message: `${paramObj.propertieName} is a required parameter` }] }
        return { ...target }
      }
    }
  },
  preCheckValueIn: (paramObj: iParamObj) => {
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
  }
}
export const ValidationHelper = {
    checkPresenceOf: FunctionalHelpers.composeWithObjParams(ComposableValidators.preCheckPresenceOf),
    checkPresenceAndValueOf: FunctionalHelpers.composeWithObjParams(ComposableValidators.preCheckPresenceOf, ComposableValidators.preCheckValueIn),
    // checkPresenceOf: (param: string) => {
    //   const scope = `${StringHelpers.capitalize(param)} parameter`
    //   return (target) => {
    //     if (!target[param])
    //       return { ...target, errors: [...target.errors, { scope, message: `${param} is a required parameter` }] }
    //     return { ...target }
    //   }
    // },
    checkValueIn: (param: string, validValued: string[]) => {
      const scope = `${StringHelpers.capitalize(param)} parameter`
      return (target) => {
        if (target[param] && !validValued.includes(target[param])) {
          return { ...target, errors: [...target.errors, { scope, message: `only support for: ${validValued.join(', ')} types` }] }
        }
        return { ...target }
      }
    }
  }