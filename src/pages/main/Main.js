import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../../reducer/pokemon';
import OnePokemon from '../components/OnePokemon';

const MainPage = () => {
  const dispatch = useDispatch();
  const pokemonData = useSelector(state => state.pokemon.pokemon);
  const getPokemonData = async () => {
    await dispatch(getPokemon());
  };

  useEffect(() => {
    getPokemonData();
  }, [dispatch]);

  return <OnePokemon pokemonData={pokemonData} />;
};

export default MainPage;
