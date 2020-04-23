import industry, { lockBuy, unlockBuy } from './industrySlice'
import { industries } from '../../../../db'

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
})
