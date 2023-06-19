import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../../reducer/pokemon';

const MainPage = () => {
  const dispatch = useDispatch();
  const pokemonData = useSelector(state => state.pokemon.pokemon);
  const getPokemonData = async () => {
    await dispatch(getPokemon());
  };

  useEffect(() => {
    getPokemonData();
  }, [dispatch]);

  return (
    <div>
      {pokemonData?.map((pokemon, index) => {
        const koreanNameEntry = pokemon.names?.find(nameEntry => nameEntry.language.name === 'ko');
        const koreanName = koreanNameEntry ? koreanNameEntry.name : pokemon.name;

        return (
          <div key={index}>
            <div>{pokemon.id}</div>
            <div>{koreanName}</div>
            <img src={pokemon.sprites.front_default} alt={koreanName} />
          </div>
        );
      })}
    </div>
  );
};

export default MainPage;
