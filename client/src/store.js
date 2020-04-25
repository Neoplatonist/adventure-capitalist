import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import gameReducer from './components/game/gameSlice'
import industryReducer from './components/game/components/industry/industrySlice'
import managerReducer
  from './components/game/components/menu/components/managerList/managerListSlice'
import upgradeReducer
  from './components/game/components/menu/components/upgradeList/upgradeListSlice'


const rootReducer = combineReducers({
  game: gameReducer,
  industry: industryReducer,
  manager: managerReducer,
  upgrade: upgradeReducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})
export let persistor = persistStore(store)
