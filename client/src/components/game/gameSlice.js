import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setupIndustry } from './components/industry/industrySlice'
import { setupManager, updateManager }
    from './components/menu/components/managerList/managerListSlice'
import { setupUpgrader }
    from './components/menu/components/upgradeList/upgradeListSlice'
import { setAxiosInterceptor } from '../../gameUtility'

export const userSignUp = createAsyncThunk(
    'game/userSignUp',
    async (username, thunkAPI) => {
        try {
            const user = await axios.post(
                'http://localhost:3001/api/v1/auth/signup',
                { username }
            )

            localStorage.setItem('jwt_token', user.data.token)

            return { name: username, error: '' }
        } catch (error) {
            return { username: '', error: error.message }
        }
    }
)

export const userLogin = createAsyncThunk(
    'game/userLogin',
    async (username, thunkAPI) => {
        try {
            const user = await axios.post(
                'http://localhost:3001/api/v1/auth/login',
                { username }
            )

            localStorage.setItem('jwt_token', user.data.token)

            return { name: username, error: '' }
        } catch (error) {
            return { username: '', error: error.message }
        }
    }
)

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        antimatter: 0,
        timeStamp: 0,
        user: ''
    },
    reducers: {
        incAntimatter: (state, action) => {
            state.antimatter += action.payload
        },
        decAntimatter: (state, action) => {
            state.antimatter -= action.payload
        },
        setTimeStamp: (state, action) => {
            state.timeStamp = new Date() / 1000
        }
    },
    extraReducers: {
        [userSignUp.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [userSignUp.rejected]: (state, action) => {
            state.user = action.payload
        },
        [userLogin.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [userLogin.rejected]: (state, action) => {
            state.user = action.payload
        }
    }
})


// Actions
export const {
    incAntimatter,
    decAntimatter,
    setTimeStamp
} = gameSlice.actions


// Thunk Actions

export const setdbVersion = (version) => (dispatch) => {
    setAxiosInterceptor()
    console.log('version', version)
}

// When the game is first launched this runs all the setup routines.
export const setupGame = () => async (dispatch) => {
    await dispatch(setdbVersion())
    dispatch(setupIndustry())
    dispatch(setupManager())
    dispatch(setupUpgrader())
}

export const incAntimatterAsync = (amount) => (dispatch) => {
    dispatch(incAntimatter(amount))
}

export const decAntimatterAsync = (amount) => (dispatch) => {
    dispatch(decAntimatter(amount))
}

// Used in conjunction with the game loop
//  and lets everything know that an interval has passed.
export const updateAll = () => (dispatch) => {
    dispatch(updateManager())
    dispatch(setTimeStamp())
}


// Selector Functions

// // May decide to create a cummulative selector of all industry profits
// // else I will delete this
// export const selectAntiMatter = (state) => state.game.antimatter

export const selectNewAntimatter = (state) => {
    const timeNow = new Date() / 1000
    const timeStamp = state.game.timeStamp
    const industries = state.industry.industries.list.filter(industry => !industry.isLocked)

    const listTotals = industries.map(industry => {
        const diffInMS = (timeNow - timeStamp) * 1000
        const numOverInterval = diffInMS / industry.wait
        const productionRate = industry.aggregateIncome
        return numOverInterval * productionRate
    })

    return listTotals.reduce((prev, curr) => prev + curr, 0)
}

export default gameSlice.reducer
