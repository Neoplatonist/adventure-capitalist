import { createSlice } from '@reduxjs/toolkit'
import { incAntimatterAsync } from '../../gameSlice'
import db from '../../../../db'

export const industrySlice = createSlice({
    name: 'industry',
    initialState: {
        industries: db,
        isBuyClicked: false
    },
    reducers: {
        toggleBuyClicked: (state, action) => {
            state.isBuyClicked = action.payload
        }
    }
})

// Actions
export const {
    toggleBuyClicked
} = industrySlice.actions

// Thunk Actions
export const incIndustryIncome = (income, wait) => (dispatch) => {
    dispatch(toggleBuyClicked(true))

    setTimeout(() => {
        dispatch(incAntimatterAsync(income))
        dispatch(toggleBuyClicked(false))
    }, wait)
}


export default industrySlice.reducer
