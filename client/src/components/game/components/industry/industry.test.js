import industry, { lockBuy, unlockBuy, incIndustryContrib } from './industrySlice'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { industries } from '../../../../db'
import { incAntimatter } from '../../gameSlice'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('industry reducer', () => {
    it('should handle initial state', () => {
        expect(industry(undefined, {})).toEqual({ industries })
    })

    it('should handle lockBuy', () => {
        expect(
            industry({
                industries: [{
                    name: 'Farmland',
                    isContribLocked: false
                }]
            }, {
                type: lockBuy.type,
                payload: 'Farmland'
            })
        ).toEqual({
            industries: [{
                name: 'Farmland',
                isContribLocked: true
            }]
        })
    })

    it('should handle unlockBuy', () => {
        expect(
            industry({
                industries: [{
                    name: 'Farmland',
                    isContribLocked: true
                }]
            }, {
                type: unlockBuy.type,
                payload: 'Farmland'
            })
        ).toEqual({
            industries: [{
                name: 'Farmland',
                isContribLocked: false
            }]
        })
    })

    it('should handle incIndustryContrib', () => {
        let industry = {
            name: 'Farmland',
            income: 1,
            wait: 0,
            isContribLocked: false
        }

        const store = mockStore({
            industries: [industry]
        })

        const expectedActions = [
            { type: lockBuy.type, payload: 'Farmland' },
            { type: incAntimatter.type, payload: industry.income },
            { type: unlockBuy.type, payload: 'Farmland' }
        ]

        jest.useFakeTimers()
        store.dispatch(incIndustryContrib(industry))
        jest.runAllTimers()
        expect(store.getActions()).toEqual(expectedActions)
    })
})
