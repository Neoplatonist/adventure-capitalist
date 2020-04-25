import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getIndexByName } from '../../../../../../gameUtility'
import { managerList } from '../../../../../../db'
import { incIndustryContribByName } from '../../../industry/industrySlice'
import { decAntimatterAsync } from '../../../../gameSlice'

// Reducer
export const managerSlice = createSlice({
    name: 'manager',
    initialState: {
        managerList
    },
    reducers: {
        unlockManager: (state, action) => {
            let index = getIndexByName(state.managerList, action.payload)
            state.managerList[index].isLocked = false
        },
        updateManagerSecCounter: (state, action) => {
            let index = getIndexByName(state.managerList, action.payload)
            state.managerList[index].secCounter++
        },
    },
    // extraReducers: {
    //     [fetchManagers.fulfilled]: (state, action) => {
    //         state.manager.managerList = action.payload
    //     }
    // }
})


// Actions
export const {
    unlockManager,
    updateManagerSecCounter
} = managerSlice.actions


// Thunk Actions

// Handles initializing manager data when the app first launches.
export const setupManager = () => (dispatch, getState) => {
    // dispatch(fetchManagers())

    getState().manager.managerList.forEach(manager => {
        if (!manager.isLocked) {
            dispatch(incIndustryContribByName(manager.name))
            dispatch(updateManagerSecCounter(manager.name))
        }
    });
}

// When a manager is unlocked, this starts the manager duties.
export const startManager = ({ cost, name }) => (dispatch) => {
    dispatch(unlockManager(name))
    dispatch(decAntimatterAsync(cost))
    dispatch(incIndustryContribByName(name))
}

// Keeps track of the manager mutex and timer for each individual manager.
export const updateManager = () => (dispatch, getState) => {
    getState().manager.managerList.forEach(manager => {
        if (!manager.isLocked) {
            dispatch(incIndustryContribByName(manager.name))
            dispatch(updateManagerSecCounter(manager.name))
        }
    })
}

// This will be used to fetch industries list from the server
//  and create a save state for the industries.
export const fetchManagers = createAsyncThunk(
    'manager/fetchManagers',
    async (thunkAPI) => {
        // const response = await fetch('http://localhost:3001')
        // return response.data
    }
)


// Selector Functions

// Creates a view of locked managers to be purchased.
export const selectManagersLocked = ({ manager }) =>
    manager.managerList.filter(manager => manager.isLocked)

// Creates a view of unlocked managers already purchased.
export const selectManagersUnlocked = ({ manager }) =>
    manager.managerList.filter(manager => manager.isLocked)


export default managerSlice.reducer
