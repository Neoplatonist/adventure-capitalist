import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './components/game/gameSlice'
import industryReducer from './components/game/components/industry/industrySlice'
import managerReducer from './components/game/components/menu/components/managerList/managerListSlice'

export default configureStore({
  reducer: {
    game: gameReducer,
    industry: industryReducer,
    manager: managerReducer
  }
})
