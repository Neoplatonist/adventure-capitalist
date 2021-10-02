import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIndexByName } from '../../../../../../gameUtility';
import { decAntimatterAsync } from '../../../../gameSlice';
import { aggregateTheIncome } from '../../../industry/industrySlice';
import Axios from '../../../../../../Axios';

// This will be used to fetch industries list from the server
// and create a save state for the industries
export const fetchUpgrades = createAsyncThunk(
    'upgrade/fetchUpgrades',
    async (thunkAPI) => {
        try {
            let upgrade = await Axios.get('/api/v1/upgrades');

            return { list: upgrade.data, error: '' };
        } catch (error) {
            return { list: [], error: error.message };
        }
    }
);


export const upgradeSlice = createSlice({
    name: 'upgrade',
    initialState: {
        upgrades: {
            list: [],
            error: ''
        }
    },
    reducers: {
        unlockUpgradeMultiplier: (state, action) => {
            let index = getIndexByName(state.upgrades.list, action.payload);
            state.upgrades.list[index].isLocked = false;
        }
    },
    extraReducers: {
        [fetchUpgrades.fulfilled]: (state, action) => {
            state.upgrades = action.payload;
        },
        [fetchUpgrades.fulfilled]: (state, action) => {
            state.upgrades = action.payload;
        }
    }
});


// Actions
export const {
    unlockUpgradeMultiplier
} = upgradeSlice.actions;


// Thunk Actions

// Handles initializing manager data when the app first launches.
export const setupUpgrader = () => (dispatch, getState) => {
    if (getState().upgrade.upgrades.list.length === 0) {
        dispatch(fetchUpgrades());
    }
};

// Returns an upgrade from upgrades.list by name.
export const getUpgradeByName = (name) => (dispatch, getState) => {
    return getState().upgrade.upgrades.list
        .filter(upgrade => upgrade.name === name)[0];
};

// Unlocks the upgrade multiplier for an industry and updates aggregate income.
export const unlockUpgradeMultiplierAsync = ({ cost, name }) => (dispatch) => {
    dispatch(unlockUpgradeMultiplier(name));
    dispatch(decAntimatterAsync(cost));
    dispatch(aggregateTheIncome(name));
};


// Selector Functions

// Creates a view of locked upgrades to be purchased.
export const selectUpgradesLocked = ({ upgrade }) =>
    upgrade.upgrades.list.filter(upgrade => upgrade.isLocked);

// Creates a view of unlocked upgrades already purchased.
export const selectUpgradesUnlocked = ({ upgrade }) =>
    upgrade.upgrades.list.filter(upgrade => upgrade.isLocked);

export default upgradeSlice.reducer;
