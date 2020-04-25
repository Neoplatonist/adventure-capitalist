import upgrade from './upgradeListSlice'
import { upgradeList } from '../../../../../../db'

describe('upgrade reducer', () => {
    it('should handle initial state', () => {
        expect(upgrade(undefined, {})).toEqual({
            upgradeList
        })
    })
})
