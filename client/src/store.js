import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import gameReducer from './components/game/gameSlice'
import industryReducer from './components/game/components/industry/industrySlice'
import managerReducer from './components/game/components/menu/components/managerList/managerListSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// export default configureStore({
//   reducer: {
//     game: gameReducer,
//     industry: industryReducer,
//     manager: managerReducer
//   }
// })

const rootReducer = combineReducers({
  game: gameReducer,
  industry: industryReducer,
  manager: managerReducer
})

const persistConfig = {
  key: 'root',
  storage,
  // stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})
export let persistor = persistStore(store)
