import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getIndexByName } from '../../../../../../gameUtility'
import { incIndustryContribByName, setIsManaged } from '../../../industry/industrySlice'
import { decAntimatterAsync } from '../../../../gameSlice'

// This will be used to fetch industries list from the server
//  and create a save state for the industries.
export const fetchManagers = createAsyncThunk(
    'manager/fetchManagers',
    async (thunkAPI) => {
        try {
            let manager = await axios.get('http://localhost:3001/api/v1/managers')

            return { list: manager.data, error: '' }
        } catch (error) {
            return { list: [], error: error.message }
        }
    }
)


// Reducer
export const managerSlice = createSlice({
    name: 'manager',
    initialState: {
        managers: {
            list: [],
            error: ''
        }
    },
    reducers: {
        unlockManager: (state, action) => {
            let index = getIndexByName(state.managers.list, action.payload)
            state.managers.list[index].isLocked = false
        },
        updateManagerSecCounter: (state, action) => {
            let index = getIndexByName(state.managers.list, action.payload)
            state.managers.list[index].secCounter++
        },
    },
    extraReducers: {
        [fetchManagers.fulfilled]: (state, action) => {
            state.managers = action.payload
        },
        [fetchManagers.rejected]: (state, action) => {
            state.managers = action.payload
        }
    }
})


// Actions
export const {
    unlockManager,
    updateManagerSecCounter
} = managerSlice.actions


// Thunk Actions

// Handles initializing manager data when the app first launches.
export const setupManager = () => (dispatch, getState) => {
    if (getState().manager.managers.list.length === 0) {
        dispatch(fetchManagers())
    }

    getState().manager.managers.list.forEach(manager => {
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
    dispatch(setIsManaged(name))
}

// Keeps track of the manager mutex and timer for each individual manager.
export const updateManager = () => (dispatch, getState) => {
    getState().manager.managers.list.forEach(manager => {
        if (!manager.isLocked) {
            dispatch(incIndustryContribByName(manager.name))
            dispatch(updateManagerSecCounter(manager.name))
        }
    })
}


// Selector Functions

// Creates a view of locked managers to be purchased.
export const selectManagersLocked = ({ manager }) =>
    manager.managers.list.filter(manager => manager.isLocked)

// Creates a view of unlocked managers already purchased.
export const selectManagersUnlocked = ({ manager }) =>
    manager.managers.list.filter(manager => manager.isLocked)


export default managerSlice.reducer
