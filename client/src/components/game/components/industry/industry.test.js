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
import { industryList, upgradeList } from '../../../../db'
import { decAntimatter, incAntimatter } from '../../gameSlice'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('industry reducer', () => {
    it('should handle initial state', () => {
        expect(industry(undefined, {})).toEqual({ industryList })
    })

    describe('industry actions', () => {
        it('should handle setCurrentCost', () => {
            expect(
                industry({
                    industryList: [{
                        name: 'Farmland',
                        cost: 1,
                        currentCost: 1
                    }]
                }, {
                    type: setCurrentCost.type,
                    payload: {
                        name: 'Farmland',
                        currentCost: 5
                    }
                })
            ).toEqual({
                industryList: [{
                    name: 'Farmland',
                    cost: 1,
                    currentCost: 5
                }]
            })
        })

        it('should handle setCurrentIncome', () => {
            expect(
                industry({
                    industryList: [{
                        name: 'Farmland',
                        income: 1,
                        currentIncome: 1
                    }]
                }, {
                    type: setCurrentIncome.type,
                    payload: {
                        name: 'Farmland',
                        currentIncome: 5
                    }
                })
            ).toEqual({
                industryList: [{
                    name: 'Farmland',
                    income: 1,
                    currentIncome: 5
                }]
            })
        })

        it('should handle incNumOwned', () => {
            expect(
                industry({
                    industryList: [{
                        name: 'Farmland',
                        numberOwned: 1
                    }]
                }, {
                    type: incNumOwned.type,
                    payload: 'Farmland'
                })
            ).toEqual({
                industryList: [{
                    name: 'Farmland',
                    numberOwned: 2
                }]
            })
        })

        it('should handle lockBuy', () => {
            expect(
                industry({
                    industryList: [{
                        name: 'Farmland',
                        isContribLocked: false
                    }]
                }, {
                    type: lockBuy.type,
                    payload: 'Farmland'
                })
            ).toEqual({
                industryList: [{
                    name: 'Farmland',
                    isContribLocked: true
                }]
            })
        })

        it('should handle unlockBuy', () => {
            expect(
                industry({
                    industryList: [{
                        name: 'Farmland',
                        isContribLocked: true
                    }]
                }, {
                    type: unlockBuy.type,
                    payload: 'Farmland'
                })
            ).toEqual({
                industryList: [{
                    name: 'Farmland',
                    isContribLocked: false
                }]
            })
        })

        it('should handle unlockIndustry', () => {
            expect(
                industry({
                    industryList: [{
                        name: 'Farmland',
                        isLocked: true
                    }]
                }, {
                    type: unlockIndustry.type,
                    payload: 'Farmland'
                })
            ).toEqual({
                industryList: [{
                    name: 'Farmland',
                    isLocked: false
                }]
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
                industryList: industry
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
                    numberOwned: 1
                }

                const store = mockStore({
                    industry: {
                        industryList
                    },
                    upgrade: {
                        upgradeList
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
                    baseCost: 1,
                    coefficient: 1,
                    income: 1,
                    numberOwned: 0
                }

                const store = mockStore({
                    industry: {
                        industryList
                    },
                    upgrade: {
                        upgradeList
                    }
                })

                const expectedActions = [
                    { type: decAntimatter.type, payload: 1 },
                    { type: incNumOwned.type, payload: 'Farmland' },
                    { type: setCurrentCost.type, payload: { name: 'Farmland', currentCost: 1 } },
                    { type: setCurrentIncome.type, payload: { name: 'Farmland', currentIncome: 1 } }, {
                        type: setAggregateIncome.type,
                        payload: { name: 'Farmland', aggregateIncome: 1.67 }
                    },
                    { type: unlockIndustry.type, payload: 'Farmland' },
                ]

                store.dispatch(buyIndustry(industry))
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
})
