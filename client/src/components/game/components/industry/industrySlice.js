import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { incAntimatterAsync } from '../../gameSlice'
import { industries } from '../../../../db'

export const industrySlice = createSlice({
    name: 'industry',
    initialState: {
        industries
        // industries: []
    },
    reducers: {
        lockBuy: (state, action) => {
            let index = state.industries.findIndex(
                industry => industry.name === action.payload
            )

            state.industries[index].isContribLocked = true
        },
        unlockBuy: (state, action) => {
            let index = state.industries.findIndex(
                industry => industry.name === action.payload
            )

            state.industries[index].isContribLocked = false
        }
    },
    // extraReducers: {
    //     [fetchIndustries.fulfilled]: (state, action) => {
    //         state.industry.industries = action.payload
    //     }
    // }
})

// Actions
export const {
    lockBuy,
    unlockBuy
} = industrySlice.actions

// Thunk Actions
export const incIndustryContrib = (industry) => (dispatch) => {
    dispatch(lockBuy(industry.name))
    dispatch(incAntimatterAsync(industry.income))

    setTimeout(() => {
        dispatch(unlockBuy(industry.name))
    }, industry.wait)
}

// This will be used to fetch industries list from the server
// and create a save state for the industries
export const fetchIndustries = createAsyncThunk(
    'industry/fetchIndustries',
    async (thunkAPI) => {
        // const response = await fetch('http://localhost:3001')
        // return response.data
    }
)

export default industrySlice.reducer
