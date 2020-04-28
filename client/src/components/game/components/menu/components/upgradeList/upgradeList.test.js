import upgrade from './upgradeListSlice'

describe('upgrade reducer', () => {
    it('should handle initial state', () => {
        expect(upgrade(undefined, {})).toEqual({
            upgrades: {
                list: [],
                error: ''
            }
        })
    })
})
