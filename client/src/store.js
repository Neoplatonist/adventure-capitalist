import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './components/game/gameSlice'
import industryReducer from './components/game/components/industry/industrySlice'

export default configureStore({
  reducer: {
    game: gameReducer,
    industry: industryReducer
  }
})
