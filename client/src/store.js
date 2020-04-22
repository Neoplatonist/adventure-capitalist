import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../../client/src/components/game/gameSlice';

export default configureStore({
  reducer: {
    game: gameReducer
  }
});
