import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getIndexByName } from '../../../../../../gameUtility'
import { upgradeList } from '../../../../../../db'
import { decAntimatterAsync } from '../../../../gameSlice'
import { aggregateTheIncome } from '../../../industry/industrySlice'

export const upgradeSlice = createSlice({
    name: 'upgrade',
    initialState: {
        upgradeList
    },
    reducers: {
        unlockUpgradeMultiplier: (state, action) => {

            console.log(action.payload)
            let index = getIndexByName(state.upgradeList, action.payload)
            state.upgradeList[index].isLocked = false
        }
    },
    // extraReducers: {
    //     [fetchUpgrades.fulfilled]: (state, action) => {
    //         state.manager.upgradeList = action.payload
    //     }
    // }
})


// Actions
export const {
    unlockUpgradeMultiplier
} = upgradeSlice.actions


// Thunk Actions

// Returns an upgrade from upgradeList by name.
export const getUpgradeByName = (name) => (dispatch, getState) => {
    return getState().upgrade.upgradeList
        .filter(upgrade => upgrade.name === name)[0]
}

// Unlocks the upgrade multiplier for an industry and updates aggregate income.
export const unlockUpgradeMultiplierAsync = ({ cost, name }) => (dispatch) => {
    dispatch(unlockUpgradeMultiplier(name))
    dispatch(decAntimatterAsync(cost))
    dispatch(aggregateTheIncome(name))
}


// This will be used to fetch industries list from the server
// and create a save state for the industries
export const fetchUpgrades = createAsyncThunk(
    'manager/fetchUpgrades',
    async (thunkAPI) => {
        // const response = await fetch('http://localhost:3001')
        // return response.data
    }
)


// Selector Functions

// Creates a view of locked upgrades to be purchased.
export const selectUpgradesLocked = ({ upgrade }) =>
    upgrade.upgradeList.filter(upgrade => upgrade.isLocked)

// Creates a view of unlocked upgrades already purchased.
export const selectUpgradesUnlocked = ({ upgrade }) =>
    upgrade.upgradeList.filter(upgrade => upgrade.isLocked)

export default upgradeSlice.reducer
