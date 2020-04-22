const multiplier = 1.10

const GameMath = {
    cost: (baseCost, numOwned) => baseCost * multiplier ** numOwned
}
