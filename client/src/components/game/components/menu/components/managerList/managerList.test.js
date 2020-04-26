import manager from './managerListSlice'

describe('manager reducer', () => {
    it('should handle initial state', () => {
        expect(manager(undefined, {})).toEqual({
            managerList: []
        })
    })
})
