import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { incAntimatterAsync, decAntimatterAsync } from '../../gameSlice'
import { GameMath } from '../../../../gameMath'
import { industryList } from '../../../../db'

const getIndexByName = (arr, name) =>
    arr.findIndex(i => i.name === name)

export const industrySlice = createSlice({
    name: 'industry',
    initialState: {
        industryList
        // industries: []
    },
    reducers: {
        setCurrentCost: (state, action) => {
            let index = getIndexByName(state.industryList, action.payload.name)
            state.industryList[index].currentCost = action.payload.cost
        },
        setCurrentIncome: (state, action) => {
            let index = getIndexByName(state.industryList, action.payload.name)
            state.industryList[index].currentIncome = action.payload.income
        },
        incNumOwned: (state, action) => {
            let index = getIndexByName(state.industryList, action.payload)
            state.industryList[index].numberOwned++
        },
        lockBuy: (state, action) => {
            let index = getIndexByName(state.industryList, action.payload)
            state.industryList[index].isContribLocked = true
        },
        unlockBuy: (state, action) => {
            let index = getIndexByName(state.industryList, action.payload)
            state.industryList[index].isContribLocked = false
        },
        unlockIndustry: (state, action) => {
            let index = getIndexByName(state.industryList, action.payload)
            state.industryList[index].isLocked = false
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
    setCurrentCost,
    setCurrentIncome,
    incNumOwned,
    lockBuy,
    unlockBuy,
    unlockIndustry
} = industrySlice.actions

// Thunk Actions
export const incIndustryContrib = ({
    currentIncome,
    name,
    wait
}) => (dispatch) => {
    dispatch(lockBuy(name))
    dispatch(incAntimatterAsync(currentIncome))

    setTimeout(() => {
        dispatch(unlockBuy(name))
    }, wait)
}

export const incIndustryContribByName = (name) => (dispatch, getState) => {
    const industry = getState().industry.industryList
        .filter(industry => industry.name === name)

    const { currentIncome, isContribLocked, wait } = industry[0]

    if (!isContribLocked) {
        dispatch(lockBuy(name))
        dispatch(incAntimatterAsync(currentIncome))

        setTimeout(() => {
            dispatch(unlockBuy(name))
        }, wait)
    }
}

export const buyIndustry = ({ baseCost, coefficient, income, name, numberOwned }) => (dispatch) => {
    // calculates the cost of the next industry purchase
    const cost = GameMath.cost(baseCost, coefficient, numberOwned)
    // calculates the antimatter production rate
    const production = GameMath.production(income, coefficient, numberOwned + 1)

    dispatch(decAntimatterAsync(cost))
    dispatch(incNumOwned(name))
    dispatch(setCurrentCost({ name, cost }))
    dispatch(setCurrentIncome({ name, income: production }))

    if (numberOwned === 0) {
        dispatch(unlockIndustry(name))
    }

    // recalculate currentCost using an algorithm
}

export const setupIndustry = () => (dispatch) => {
    // dispatch(fetchIndustries())
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

// export const selectIndustry()

export const selectManagedIndustries = (state) => {
    return state.industry.industryList.filter(industry => industry.isManaged)
}

export default industrySlice.reducer
