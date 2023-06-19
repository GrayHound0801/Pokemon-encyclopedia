import { combineReducers } from '@reduxjs/toolkit';
import { pokemonSlice } from './pokemon';
export const rootReducer = combineReducers({
  pokemon: pokemonSlice.reducer,
});
