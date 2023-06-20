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

const pokemonDetailInitialState = {
  entity: null,
  getPokemonDetailState: {
    loading: false,
    done: false,
    err: null,
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

export const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState: pokemonDetailInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPokemonDetail.pending, state => {
      state.getPokemonDetailState.loading = true;
      state.getPokemonDetailState.done = false;
      state.getPokemonDetailState.err = null;
    });
    builder.addCase(getPokemonDetail.fulfilled, (state, action) => {
      state.pokemonDetail = action.payload;
      state.getPokemonDetailState.loading = false;
      state.getPokemonDetailState.done = true;
      state.getPokemonDetailState.err = null;
    });
    builder.addCase(getPokemonDetail.rejected, (state, action) => {
      state.getPokemonDetailState.loading = false;
      state.getPokemonDetailState.done = true;
      state.getPokemonDetailState.err = action.payload;
    });
  },
});

export const getPokemon = createAsyncThunk('pokemon/getPokemon', async () => {
  try {
    const { data } = await axiosInstance.get(`https://pokeapi.co/api/v2/pokemon?limit=30`);
    const details = await Promise.all(
      data.results.map(async pokemon => {
        const { data: pokemonDetail } = await axiosInstance.get(pokemon.url);
        const { data: speciesDetail } = await axiosInstance.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonDetail.id}`,
        );

        const koreanNameEntry = speciesDetail.names.find(nameEntry => nameEntry.language.name === 'ko');
        const koreanName = koreanNameEntry ? koreanNameEntry.name : pokemonDetail.name;
        const types = await Promise.all(
          pokemonDetail.types.map(async typeInfo => {
            const { data: typeDetail } = await axiosInstance.get(
              `https://pokeapi.co/api/v2/type/${typeInfo.type.name}`,
            );
            const koreanTypeEntry = typeDetail.names.find(nameEntry => nameEntry.language.name === 'ko');
            return koreanTypeEntry ? koreanTypeEntry.name : typeInfo.type.name;
          }),
        );

        return {
          ...pokemonDetail,
          name: koreanName,
          types,
        };
      }),
    );
    console.log('pokemon', details);
    return details;
  } catch (err) {
    console.log(err);
  }
});

export const getPokemonDetail = createAsyncThunk('pokemonDetail/getPokemonDetail', async id => {
  try {
    const { data: pokemonDetail } = await axiosInstance.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { data: speciesDetail } = await axiosInstance.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const koreanNameEntry = speciesDetail.names.find(nameEntry => nameEntry.language.name === 'ko');
    const koreanName = koreanNameEntry ? koreanNameEntry.name : pokemonDetail.name;
    const types = await Promise.all(
      pokemonDetail.types.map(async typeInfo => {
        const { data: typeDetail } = await axiosInstance.get(`https://pokeapi.co/api/v2/type/${typeInfo.type.name}`);
        const koreanTypeEntry = typeDetail.names.find(nameEntry => nameEntry.language.name === 'ko');
        return koreanTypeEntry ? koreanTypeEntry.name : typeInfo.type.name;
      }),
    );

    return {
      ...pokemonDetail,
      name: koreanName,
      types,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
});
