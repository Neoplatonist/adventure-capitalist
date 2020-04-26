// Static initial state
let dataSheet = [
    {
        name: 'Farmland',
        'industry': {
            coefficient: 1.07,
            income: 1.67,
            currentIncome: 1.67,
            aggregateIncome: 1.67,
            baseCost: 3.78,
            currentCost: 3.78,
            numberOwned: 1,
            isManaged: false,
            wait: 1000,
            isLocked: false,
            isContribLocked: false
        },
        'manager': {
            wait: 1000,
            isLocked: true,
            cost: 1000,
            secCounter: 0
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 250000,
            secCounter: 0
        }
    },
    {
        name: 'Mineral Extractor',
        'industry': {
            coefficient: 1.15,
            income: 20,
            currentIncome: 20,
            aggregateIncome: 20,
            baseCost: 60,
            currentCost: 60,
            numberOwned: 0,
            isManaged: false,
            wait: 3000,
            isLocked: true,
            isContribLocked: false
        },
        'manager': {
            wait: 3000,
            isLocked: true,
            cost: 15000,
            secCounter: 0
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 500000,
            secCounter: 0
        }
    },
    {
        name: 'Particle Generator',
        'industry': {
            coefficient: 1.14,
            income: 90,
            currentIncome: 90,
            aggregateIncome: 90,
            baseCost: 720,
            currentCost: 720,
            numberOwned: 0,
            isManaged: false,
            wait: 6000,
            isLocked: true,
            isContribLocked: false
        },
        'manager': {
            wait: 6000,
            isLocked: true,
            cost: 100000,
            secCounter: 0
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 1000000,
            secCounter: 0
        }
    },
    {
        name: 'Trading Post',
        'industry': {
            coefficient: 1.13,
            income: 360,
            currentIncome: 360,
            aggregateIncome: 360,
            baseCost: 8640,
            currentCost: 8640,
            numberOwned: 0,
            isManaged: false,
            wait: 12000,
            isLocked: true,
            isContribLocked: false
        },
        'manager': {
            wait: 12000,
            isLocked: true,
            cost: 500000,
            secCounter: 0
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 5000000,
            secCounter: 0
        }
    },
    {
        name: 'Academy',
        'industry': {
            coefficient: 1.12,
            income: 2160,
            currentIncome: 2160,
            aggregateIncome: 2160,
            baseCost: 103680,
            currentCost: 103680,
            numberOwned: 0,
            isManaged: false,
            wait: 24000,
            isLocked: true,
            isContribLocked: false
        },
        'manager': {
            wait: 24000,
            isLocked: true,
            cost: 1200000,
            secCounter: 0
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 10000000,
            secCounter: 0
        }
    },
    {
        name: 'Data Silo',
        'industry': {
            coefficient: 1.11,
            income: 6480,
            currentIncome: 6480,
            aggregateIncome: 6480,
            baseCost: 1244160,
            currentCost: 1244160,
            numberOwned: 0,
            isManaged: false,
            wait: 96000,
            isLocked: true,
            isContribLocked: false
        },
        'manager': {
            wait: 96000,
            isLocked: true,
            cost: 10000000,
            secCounter: 0
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 25000000,
            secCounter: 0
        }
    },
    {
        name: 'Labratory',
        'industry': {
            coefficient: 1.10,
            income: 19440,
            currentIncome: 19440,
            aggregateIncome: 19440,
            baseCost: 149299920,
            currentCost: 149299920,
            numberOwned: 0,
            isManaged: false,
            wait: 384000,
            isLocked: true,
            isContribLocked: false
        },
        'manager': {
            wait: 384000,
            isLocked: true,
            cost: 111111111,
            secCounter: 0
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 500000000,
            secCounter: 0
        }
    },
    {
        name: 'Colony',
        'industry': {
            coefficient: 1.09,
            income: 58320,
            currentIncome: 58320,
            aggregateIncome: 58320,
            baseCost: 179159040,
            currentCost: 179159040,
            numberOwned: 0,
            isManaged: false,
            wait: 1536000,
            isLocked: true,
            isContribLocked: false
        },
        'manager': {
            wait: 1536000,
            isLocked: true,
            cost: 555555555,
            secCounter: 0
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 10000000000,
            secCounter: 0
        }
    },
    {
        name: 'Federation',
        'industry': {
            coefficient: 1.08,
            income: 174960,
            currentIncome: 174960,
            aggregateIncome: 174960,
            baseCost: 2149908480,
            currentCost: 2149908480,
            numberOwned: 0,
            isManaged: false,
            wait: 6144000,
            isLocked: true,
            isContribLocked: false
        },
        'manager': {
            wait: 6144000,
            isLocked: true,
            cost: 10000000000,
            secCounter: 0
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 50000000000,
            secCounter: 0
        }
    },
    {
        name: 'Galactic Expedition',
        'industry': {
            coefficient: 1.07,
            income: 804816,
            currentIncome: 804816,
            aggregateIncome: 804816,
            baseCost: 25798901760,
            currentCost: 25798901760,
            numberOwned: 0,
            isManaged: false,
            wait: 36864000,
            isLocked: true,
            isContribLocked: false
        },
        'manager': {
            wait: 36864000,
            isLocked: true,
            cost: 100000000000
        },
        'upgrade': {
            multiplier: 3,
            isLocked: true,
            cost: 2500000000000
        }
    }
]

module.exports = {
    // Update by hand every database revision
    // Could easy link to git tags or environment variables
    version: '1.0.0',
    dataSheet
}
