export const GameMath = {
    cost: (baseCost, multiplier, numOwned) => baseCost * multiplier ** numOwned,
    production: (production, multiplier, numOwned) => (production * numOwned) * multiplier
}
