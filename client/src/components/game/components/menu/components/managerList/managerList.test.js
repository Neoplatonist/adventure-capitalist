import manager from './managerListSlice'
import { managerList } from '../../../../../../db'

describe('manager reducer', () => {
    it('should handle initial state', () => {
        expect(manager(undefined, {})).toEqual({
            managerList
        })
    })
})
