import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        antimatter: 0
    },
    reducers: {
        incAntimatter: (state, action) => {
            state.antimatter += action.payload
        },
        decAntimatter: (state, action) => {
            state.antimatter -= action.payload
        }
    }
})

// Actions
export const {
    incAntimatter,
    decAntimatter
} = gameSlice.actions

// Thunk Actions
// possibly update both server db and client state
// If not, delete these and use the reducer actions
export const incAntimatterAsync = (amount) => (dispatch) => {
    dispatch(incAntimatter(amount))
}

export const decAntimatterAsync = (amount) => (dispatch) => {
    dispatch(decAntimatter(amount))
}

// Selector Functions
// May decide to create a cummulative selector of all industry profits
// else I will delete this
export const selectAntiMatter = (state) => state.game.antimatter

export default gameSlice.reducer
