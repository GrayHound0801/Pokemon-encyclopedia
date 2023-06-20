import styled from 'styled-components';
import { typeColors } from './TypeColors';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const OnePokemon = ({ pokemonData }) => {
  const navigate = useNavigate();

  const handlePokemonClick = pokemonId => {
    navigate(`/pokemonDetail/${pokemonId}`);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokemonData) {
      setLoading(false);
    }
  }, [pokemonData]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }
  return (
    <Wrapper>
      {pokemonData?.map((pokemon, index) => {
        const firstTypeColor = typeColors[pokemon.types[0]];
        const second = typeColors[pokemon.types[1]];
        return (
          <StateWrapper key={index} onClick={() => handlePokemonClick(pokemon.id)}>
            <PokemonId>
              {'No.'}
              {pokemon.id}
            </PokemonId>
            <ImgWrapper>
              <PokemonImg src={pokemon.sprites.front_default} alt={pokemon.name} />
              <PokemonName>{pokemon.name}</PokemonName>
            </ImgWrapper>
            <PokemonType>
              <TypeFirst style={{ backgroundColor: firstTypeColor }}>{pokemon.types[0]}</TypeFirst>
              {second ? <Typesecond style={{ backgroundColor: second }}>{pokemon.types[1]}</Typesecond> : null}
            </PokemonType>
          </StateWrapper>
        );
      })}
    </Wrapper>
  );
};

export default OnePokemon;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const StateWrapper = styled.div`
  margin: 40px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px #a9a9a9a9;
  width: 180px;
  height: 200px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PokemonId = styled.div`
  margin: 10px 0 0 20px;
`;

const PokemonName = styled.div``;
const PokemonImg = styled.img`
  width: 120px;
`;

const PokemonType = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const TypeFirst = styled.div`
  width: 64px;
  border-radius: 10px;
`;
const Typesecond = styled.div`
  width: 64px;
  border-radius: 10px;
`;

const Loading = styled.h1`
  text-align: center;
  margin-top: 300px;
`;
