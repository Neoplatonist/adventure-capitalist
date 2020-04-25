import game, { incAntimatter, decAntimatter } from './gameSlice'

describe('game reducer', () => {
    it('should handle initial state', () => {
        expect(game(undefined, {})).toEqual({
            antimatter: 0,
            timeStamp: 0
        })
    })

    it('should handle incAntimatter', () => {
        expect(
            game({ antimatter: 0 }, {
                type: incAntimatter.type,
                payload: 1
            })
        ).toEqual({
            antimatter: 1
        })
    })

    it('should handle decAntimatter', () => {
        expect(
            game({ antimatter: 1 }, {
                type: decAntimatter.type,
                payload: 1
            })
        ).toEqual({
            antimatter: 0
        })
    })
})
