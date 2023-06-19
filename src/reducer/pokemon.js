import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../apis/core';

const initialState = {
  pokemon: [],
  getPokemonState: {
    //pending, fullfilled, rejected
    loading: false, //T  F  F ==> true => 로딩 페이지를 보여줌(true)
    done: false, //F T T
    err: null, //F F 에러메세지
  },
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPokemon.pending, state => {
      state.getPokemonState.loading = true;
      state.getPokemonState.done = false;
      state.getPokemonState.err = null;
    });
    builder.addCase(getPokemon.fulfilled, (state, action) => {
      state.pokemon = action.payload; //데이터 담음
      state.getPokemonState.loading = false;
      state.getPokemonState.done = true;
      state.getPokemonState.err = null;
      //성공을 했을 때 => issue데이터가 잘 들어옴 => issue데이터를 넣어줘야함 => usestate x
    });
    builder.addCase(getPokemon.rejected, (state, action) => {
      state.getPokemonState.loading = false;
      state.getPokemonState.done = true;
      state.getPokemonState.err = action.payload;
    });
  },
});

export const getPokemon = createAsyncThunk('pokemon/getPokemon', async () => {
  try {
    const { data } = await axiosInstance.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const details = await Promise.all(
      data.results.map(async pokemon => {
        const { data: detail } = await axiosInstance.get(pokemon.url);
        return detail;
      }),
    );
    console.log('pokemon', details);
    return details;
  } catch (err) {
    console.log(err);
  }
});
