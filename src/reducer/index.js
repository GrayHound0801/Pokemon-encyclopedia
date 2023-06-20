import { combineReducers } from '@reduxjs/toolkit';
import { pokemonDetailSlice, pokemonSlice } from './pokemon';
export const rootReducer = combineReducers({
  pokemon: pokemonSlice.reducer,
  pokemonDetail: pokemonDetailSlice.reducer,
});
