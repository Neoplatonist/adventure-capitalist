// Math Functions
export const cost = (baseCost, multiplier, numOwned) => baseCost * multiplier ** numOwned
export const production = (production, multiplier, numOwned) => (production * numOwned) * multiplier

// Utility Functions
export const getIndexByName = (arr, name) => arr.findIndex(i => i.name === name)
