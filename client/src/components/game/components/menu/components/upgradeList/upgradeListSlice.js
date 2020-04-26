import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getIndexByName } from '../../../../../../gameUtility'
import { decAntimatterAsync } from '../../../../gameSlice'
import { aggregateTheIncome } from '../../../industry/industrySlice'

// This will be used to fetch industries list from the server
// and create a save state for the industries
export const fetchUpgrades = createAsyncThunk(
    'manager/fetchUpgrades',
    async (thunkAPI) => {
        try {
            let response = await fetch('http://localhost:3001/api/v1/upgrades')

            // check for response.status
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            let { data } = await response.json()
            console.log('upgradeSlice data: ', data)

            return data
        } catch (error) {
            console.error(error)
        }
    }
)


export const upgradeSlice = createSlice({
    name: 'upgrade',
    initialState: {
        upgradeList: []
    },
    reducers: {
        unlockUpgradeMultiplier: (state, action) => {
            let index = getIndexByName(state.upgradeList, action.payload)
            state.upgradeList[index].isLocked = false
        }
    },
    extraReducers: {
        [fetchUpgrades.fulfilled]: (state, action) => {
            state.upgradeList = action.payload
        }
    }
})


// Actions
export const {
    unlockUpgradeMultiplier
} = upgradeSlice.actions


// Thunk Actions

// Handles initializing manager data when the app first launches.
export const setupUpgrader = () => (dispatch, getState) => {
    if (getState().upgrade.upgradeList.length === 0) {
        dispatch(fetchUpgrades())
    }
}

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


// Selector Functions

// Creates a view of locked upgrades to be purchased.
export const selectUpgradesLocked = ({ upgrade }) =>
    upgrade.upgradeList.filter(upgrade => upgrade.isLocked)

// Creates a view of unlocked upgrades already purchased.
export const selectUpgradesUnlocked = ({ upgrade }) =>
    upgrade.upgradeList.filter(upgrade => upgrade.isLocked)

export default upgradeSlice.reducer
