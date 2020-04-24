import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { managerList } from '../../../../../../db'
import { incIndustryContribByName } from '../../../industry/industrySlice'

const getIndexByName = (arr, name) =>
    arr.findIndex(i => i.name === name)

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
export const setupManager = () => (dispatch, getState) => {
    // dispatch(fetchManagers())

    getState().manager.managerList.forEach(manager => {
        if (!manager.isLocked) {
            dispatch(incIndustryContribByName(manager.name))
            dispatch(updateManagerSecCounter(manager.name))
        }
    });
}

export const startManager = (name) => (dispatch) => {
    dispatch(unlockManager(name))
    dispatch(incIndustryContribByName(name))
}

export const updateManager = () => (dispatch, getState) => {
    getState().manager.managerList.forEach(manager => {
        if (!manager.isLocked) {
            dispatch(incIndustryContribByName(manager.name))
            dispatch(updateManagerSecCounter(manager.name))
        }
    })
}

// This will be used to fetch industries list from the server
// and create a save state for the industries
export const fetchManagers = createAsyncThunk(
    'manager/fetchManagers',
    async (thunkAPI) => {
        // const response = await fetch('http://localhost:3001')
        // return response.data
    }
)


// Selector Functions
export const selectManagersLocked = ({ manager }) =>
    manager.managerList.filter(manager => manager.isLocked)

export const selectManagersUnlocked = ({ manager }) =>
    manager.managerList.filter(manager => manager.isLocked)


export default managerSlice.reducer
