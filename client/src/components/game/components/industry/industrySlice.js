import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cost, production, getIndexByName } from '../../../../gameUtility';
import { incAntimatterAsync, decAntimatterAsync } from '../../gameSlice';
import { getUpgradeByName } from '../menu/components/upgradeList/upgradeListSlice';
import Axios from '../../../../Axios';

// This will be used to fetch industries list from the server
//  and create a save state for the industries.
export const fetchIndustries = createAsyncThunk(
    'industry/fetchIndustries',
    async (thunkAPI) => {
        try {
            let industry = await Axios.get('/api/v1/industries');

            return { list: industry.data, error: '' };
        } catch (error) {
            return { list: [], error: error.message };
        }
    }
);

export const industrySlice = createSlice({
    name: 'industry',
    initialState: {
        industries: {
            list: [],
            error: ''
        }
    },
    reducers: {
        setAggregateIncome: (state, action) => {
            let index = getIndexByName(state.industries.list, action.payload.name);
            state.industries.list[index].aggregateIncome = action.payload.aggregateIncome;
        },
        setCurrentCost: (state, action) => {
            let index = getIndexByName(state.industries.list, action.payload.name);
            state.industries.list[index].currentCost = action.payload.currentCost;
        },
        setCurrentIncome: (state, action) => {
            let index = getIndexByName(state.industries.list, action.payload.name);
            state.industries.list[index].currentIncome = action.payload.currentIncome;
        },
        setIsManaged: (state, action) => {
            let index = getIndexByName(state.industries.list, action.payload);
            state.industries.list[index].isManaged = true;
        },
        incNumOwned: (state, action) => {
            let index = getIndexByName(state.industries.list, action.payload);
            state.industries.list[index].numberOwned++;
        },
        lockBuy: (state, action) => {
            let index = getIndexByName(state.industries.list, action.payload);
            state.industries.list[index].isContribLocked = true;
        },
        unlockBuy: (state, action) => {
            let index = getIndexByName(state.industries.list, action.payload);
            state.industries.list[index].isContribLocked = false;
        },
        unlockIndustry: (state, action) => {
            let index = getIndexByName(state.industries.list, action.payload);
            state.industries.list[index].isLocked = false;
        },
        resetContribLocks: (state, action) => {
            state.industries.list = [...action.payload];
        }
    },
    extraReducers: {
        [fetchIndustries.fulfilled]: (state, action) => {
            state.industries = action.payload;
        },
        [fetchIndustries.rejected]: (state, action) => {
            state.industries = action.payload;
        }
    }
});


// Actions
export const {
    setAggregateIncome,
    setCurrentCost,
    setCurrentIncome,
    setIsManaged,
    incNumOwned,
    lockBuy,
    unlockBuy,
    unlockIndustry,
    resetContribLocks
} = industrySlice.actions;


// Thunk Actions

// Resets industry contribution locks.
export const resetContribLocksAsync = () => (dispatch, getState) => {
    // deep copy the state
    let list = JSON.parse(JSON.stringify(getState().industry.industries.list));

    list.forEach(industry => {
        industry.isContribLocked = false;
    });

    dispatch(resetContribLocks(list));
};

// Increments global currency from an industry
// and wraps it with a timer based mutex.
export const incIndustryContrib = ({
    currentIncome,
    name,
    wait
}) => (dispatch) => {
    dispatch(lockBuy(name));
    dispatch(incAntimatterAsync(currentIncome));

    setTimeout(() => {
        dispatch(unlockBuy(name));
    }, wait);
};

// Returns an industry from industryList by name.
export const getIndustryByName = (name) => (dispatch, getState) => {
    return getState().industry.industries.list
        .filter(industry => industry.name === name)[0];
};

// Returns the industry object with the updated total income
//  from an industry and its multipliers.
// Also stores the aggregated income in the industry.
export const aggregateTheIncome = (name) => (dispatch) => {
    const industry = dispatch(getIndustryByName(name));
    const { multiplier, isLocked } = dispatch(getUpgradeByName(name));

    let income = industry.currentIncome;
    if (!isLocked) {
        income *= multiplier;
    }

    dispatch(setAggregateIncome({
        name: industry.name,
        aggregateIncome: income
    }));

    return { ...industry, aggregateIncome: income };
};

// Increments antimatter with the aggregate income based on the industry mutex
export const incIndustryContribByName = (name) => (dispatch) => {
    const { aggregateIncome, isContribLocked, wait } = dispatch(aggregateTheIncome(name));

    if (!isContribLocked) {
        dispatch(incIndustryContrib({
            name: name,
            currentIncome: aggregateIncome,
            wait: wait
        }));
    }
};

// Manages buying an industry.
// It updates the cost of the next industry purchase.
// Calculates the industry's new production rate.
export const buyIndustry = ({
    baseCost,
    coefficient,
    income,
    name,
    numberOwned
}) => (dispatch) => {
    // calculates the cost of the next industry purchase
    const calculatedCost = cost(baseCost, coefficient, numberOwned);

    // calculates the antimatter production rate
    const calculatedProduction = production(income, coefficient, numberOwned + 1);

    dispatch(decAntimatterAsync(calculatedCost));
    dispatch(incNumOwned(name));
    dispatch(setCurrentCost({ name, currentCost: calculatedCost }));
    dispatch(setCurrentIncome({ name, currentIncome: calculatedProduction }));
    dispatch(aggregateTheIncome(name));

    if (numberOwned === 0) {
        dispatch(unlockIndustry(name));
    }
};

// Handles initializing industry data when the app first launches.
export const setupIndustry = () => (dispatch, getState) => {
    if (getState().industry.industries.list.length === 0) {
        dispatch(fetchIndustries());
    }

    // check version number of database on server
    // to make sure no changes have been made
    // do this check on gameSlice and pass version to
    // setup functions: industry, manager, upgrade
};

// Selector Functions

// Creates a managed industry view by filtering the state.
export const selectManagedIndustries = (state) => {
    return state.industry.industries.list
        .filter(industry => industry.isManaged);
};

export default industrySlice.reducer;
