import industry, { toggleBuyClicked } from './industrySlice'
import db from '../../../../db'

describe('industry reducer', () => {
    it('should handle initial state', () => {
        expect(industry(undefined, {})).toEqual({
            industries: db,
            isBuyClicked: false
        })
    })

    it('should handle toggleBuyClicked true', () => {
        expect(
            industry({}, {
                type: toggleBuyClicked.type,
                payload: true
            })
        ).toEqual({
            isBuyClicked: true
        })
    })

    it('should handle toggleBuyClicked false', () => {
        expect(
            industry({}, {
                type: toggleBuyClicked.type,
                payload: false
            })
        ).toEqual({
            isBuyClicked: false
        })
    })
})
