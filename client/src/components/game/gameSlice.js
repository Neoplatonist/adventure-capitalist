import { createSlice } from '@reduxjs/toolkit'
import { setupIndustry } from './components/industry/industrySlice'
import { setupManager, updateManager }
    from './components/menu/components/managerList/managerListSlice'


export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        antimatter: 0,
        timeStamp: 0
    },
    reducers: {
        incAntimatter: (state, action) => {
            state.antimatter += action.payload
        },
        decAntimatter: (state, action) => {
            state.antimatter -= action.payload
        },
        setTimeStamp: (state, action) => {
            state.timeStamp = new Date() / 1000
        }
    }
})


// Actions
export const {
    incAntimatter,
    decAntimatter,
    setTimeStamp
} = gameSlice.actions


// Thunk Actions

// When the game is first launched this runs all the setup routines.
export const setupGame = () => (dispatch) => {
    dispatch(setupIndustry())
    dispatch(setupManager())
}

// Possibly update both server db and client state.
// If not, delete these and use the reducer actions.
export const incAntimatterAsync = (amount) => (dispatch) => {
    dispatch(incAntimatter(amount))
}

export const decAntimatterAsync = (amount) => (dispatch) => {
    dispatch(decAntimatter(amount))
}

// Used in conjunction with the game loop
//  and lets everything know that a 1 second interval has passed.
export const updateAll = () => (dispatch) => {
    dispatch(updateManager())
    dispatch(setTimeStamp())
}


// Selector Functions

// // May decide to create a cummulative selector of all industry profits
// // else I will delete this
// export const selectAntiMatter = (state) => state.game.antimatter

export default gameSlice.reducer
