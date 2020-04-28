import industry, {
    setCurrentCost,
    setCurrentIncome,
    incNumOwned,
    lockBuy,
    unlockBuy,
    unlockIndustry,
    incIndustryContrib,
    buyIndustry,
    setAggregateIncome
} from './industrySlice'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { decAntimatter, incAntimatter } from '../../gameSlice'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('industry reducer', () => {
    it('should handle initial state', () => {
        expect(industry(undefined, {})).toEqual({
            industries: {
                list: [],
                error: ''
            }
        })
    })

    describe('industry actions', () => {
        it('should handle setCurrentCost', () => {
            expect(
                industry({
                    industries: {
                        list: [{
                            name: 'Farmland',
                            cost: 1,
                            currentCost: 1
                        }],
                        error: ''
                    }
                }, {
                    type: setCurrentCost.type,
                    payload: {
                        name: 'Farmland',
                        currentCost: 5
                    }
                })
            ).toEqual({
                industries: {
                    list: [{
                        name: 'Farmland',
                        cost: 1,
                        currentCost: 5
                    }],
                    error: ''
                }
            })
        })

        it('should handle setCurrentIncome', () => {
            expect(
                industry({
                    industries: {
                        list: [{
                            name: 'Farmland',
                            income: 1,
                            currentIncome: 1
                        }],
                        error: ''
                    }
                }, {
                    type: setCurrentIncome.type,
                    payload: {
                        name: 'Farmland',
                        currentIncome: 5
                    }
                })
            ).toEqual({
                industries: {
                    list: [{
                        name: 'Farmland',
                        income: 1,
                        currentIncome: 5
                    }],
                    error: ''
                }
            })
        })

        it('should handle incNumOwned', () => {
            expect(
                industry({
                    industries: {
                        list: [{
                            name: 'Farmland',
                            numberOwned: 1
                        }],
                        error: ''
                    }
                }, {
                    type: incNumOwned.type,
                    payload: 'Farmland'
                })
            ).toEqual({
                industries: {
                    list: [{
                        name: 'Farmland',
                        numberOwned: 2
                    }],
                    error: ''
                }
            })
        })

        it('should handle lockBuy', () => {
            expect(
                industry({
                    industries: {
                        list: [{
                            name: 'Farmland',
                            isContribLocked: false
                        }],
                        error: ''
                    }
                }, {
                    type: lockBuy.type,
                    payload: 'Farmland'
                })
            ).toEqual({
                industries: {
                    list: [{
                        name: 'Farmland',
                        isContribLocked: true
                    }],
                    error: ''
                }
            })
        })

        it('should handle unlockBuy', () => {
            expect(
                industry({
                    industries: {
                        list: [{
                            name: 'Farmland',
                            isContribLocked: true
                        }],
                        error: ''
                    }
                }, {
                    type: unlockBuy.type,
                    payload: 'Farmland'
                })
            ).toEqual({
                industries: {
                    list: [{
                        name: 'Farmland',
                        isContribLocked: false
                    }],
                    error: ''
                }
            })
        })

        it('should handle unlockIndustry', () => {
            expect(
                industry({
                    industries: {
                        list: [{
                            name: 'Farmland',
                            isLocked: true
                        }],
                        error: ''
                    }
                }, {
                    type: unlockIndustry.type,
                    payload: 'Farmland'
                })
            ).toEqual({
                industries: {
                    list: [{
                        name: 'Farmland',
                        isLocked: false
                    }],
                    error: ''
                }
            })
        })
    })

    describe('industry thunk actions', () => {
        it('should handle incIndustryContrib', () => {
            let industry = {
                name: 'Farmland',
                currentIncome: 1,
                wait: 0,
                isContribLocked: false
            }

            const store = mockStore({
                industries: {
                    list: [industry],
                    error: ''
                }
            })

            const expectedActions = [
                { type: lockBuy.type, payload: 'Farmland' },
                { type: incAntimatter.type, payload: industry.currentIncome },
                { type: unlockBuy.type, payload: 'Farmland' }
            ]

            jest.useFakeTimers()
            store.dispatch(incIndustryContrib(industry))
            jest.runAllTimers()
            expect(store.getActions()).toEqual(expectedActions)
        })

        describe('should handle buyIndustry', () => {
            it('numberOwned > 0', () => {
                let industry = {
                    name: 'Farmland',
                    baseCost: 1,
                    coefficient: 1,
                    income: 1,
                    currentIncome: 1.67,
                    aggregateIncome: 1.67,
                    numberOwned: 1
                }

                let upgrade = {
                    name: 'Farmland',
                    multiplier: 3,
                    isLocked: true,
                    cost: 250000,
                    secCounter: 0
                }

                const store = mockStore({
                    industry: {
                        industries: {
                            list: [industry],
                            error: ''
                        }
                    },
                    upgrade: {
                        upgrades: {
                            list: [upgrade],
                            error: ''
                        }
                    }
                })

                const expectedActions = [
                    { type: decAntimatter.type, payload: 1 },
                    { type: incNumOwned.type, payload: 'Farmland' },
                    { type: setCurrentCost.type, payload: { name: 'Farmland', currentCost: 1 } },
                    { type: setCurrentIncome.type, payload: { name: 'Farmland', currentIncome: 2 } },
                    {
                        type: setAggregateIncome.type, payload: {
                            name: 'Farmland',
                            aggregateIncome: 1.67
                        }
                    }
                ]

                store.dispatch(buyIndustry(industry))
                expect(store.getActions()).toEqual(expectedActions)
            })

            it('numberOwned == 0', () => {
                let industry = {
                    name: 'Farmland',
                    coefficient: 1.07,
                    income: 1.67,
                    currentIncome: 1.67,
                    aggregateIncome: 1.67,
                    baseCost: 3.78,
                    currentCost: 3.78,
                    numberOwned: 0,
                    isManaged: false,
                    wait: 1000,
                    isLocked: false,
                    isContribLocked: false
                }

                let upgrade = {
                    name: 'Farmland',
                    multiplier: 3,
                    isLocked: true,
                    cost: 250000,
                    secCounter: 0
                }

                const store = mockStore({
                    industry: {
                        industries: {
                            list: [industry],
                            error: ''
                        }
                    },
                    upgrade: {
                        upgrades: {
                            list: [upgrade],
                            error: ''
                        }
                    }
                })

                const expectedActions = [
                    { type: decAntimatter.type, payload: 3.78 },
                    { type: incNumOwned.type, payload: 'Farmland' },
                    { type: setCurrentCost.type, payload: { name: 'Farmland', currentCost: 3.78 } },
                    {
                        type: setCurrentIncome.type,
                        payload: { name: 'Farmland', currentIncome: 1.7869 }
                    }, {
                        type: setAggregateIncome.type,
                        payload: { name: 'Farmland', aggregateIncome: 1.67 }
                    },
                    { type: unlockIndustry.type, payload: 'Farmland' }
                ]

                store.dispatch(buyIndustry(industry))
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
})
