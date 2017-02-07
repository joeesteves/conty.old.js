export const DateHelpers = {
  dateToString: (date): string => date.toISOString().slice(0, 10)
}

export const ModelHelpers = {
  generateId: (type): string => `${type.toLowerCase()}_${DateHelpers.dateToString(new Date())}`
}

export const FunctionalHelpers = {
  compose: (...fns) => (x) => fns.reduce((prev,curr) => curr(prev), x)
}

