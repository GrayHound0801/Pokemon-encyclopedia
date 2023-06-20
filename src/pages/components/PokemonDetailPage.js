import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonDetail } from '../../reducer/pokemon';
import styled from 'styled-components';
import { typeColors } from './TypeColors';

const PokemonDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector(state => state.pokemonDetail.pokemonDetail);
  console.log(pokemonDetail);

  useEffect(() => {
    dispatch(getPokemonDetail(id));
  }, [dispatch, id]);

  if (!pokemonDetail) {
    return <h1>Loading...</h1>;
  }
  const firstTypeColor = typeColors[pokemonDetail.types[0]];
  const second = typeColors[pokemonDetail.types[1]];
  return (
    <Wrapper>
      <BackgroundImg>
        <PokemonCard>
          <PokemonImg src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
          <PokemonState>
            <PokemonName>{pokemonDetail.name}</PokemonName>
            <PokemonType>
              <TypeFirst style={{ backgroundColor: firstTypeColor }}>{pokemonDetail.types[0]}</TypeFirst>
              {second ? <Typesecond style={{ backgroundColor: second }}>{pokemonDetail.types[1]}</Typesecond> : null}
            </PokemonType>
          </PokemonState>
        </PokemonCard>
      </BackgroundImg>
    </Wrapper>
  );
};

export default PokemonDetailPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const BackgroundImg = styled.div`
  background-image: url('../images/template.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vh - 120px);
  width: 1280px;
`;

const PokemonCard = styled.div`
  display: flex;
  width: 800px;
  height: 500px;
  box-shadow: 3px 3px 3px 3px #000;
  border-radius: 20px;
  background-color: #a3a3a3;
  margin: 100px auto;
`;

const PokemonState = styled.div`
  margin-left: 10px;
  margin-top: 30px;
`;

const PokemonName = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const PokemonImg = styled.img`
  height: 400px;
`;

const PokemonType = styled.div`
  display: flex;
  text-align: center;
  font-size: 50px;
  margin-left: 10px;
`;

const TypeFirst = styled.div`
  width: 120px;
  border-radius: 10px;
  margin-right: 20px;
  box-shadow: 3px 3px 3px 3px #000;
`;
const Typesecond = styled.div`
  width: 120px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px #000;
`;
