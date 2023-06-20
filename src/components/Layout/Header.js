import styled from 'styled-components';

const Header = () => {
  return (
    <Wrapper>
      <HederWrapper>
        <PokeMonLogo src='\images\International_Pokémon_logo.svg.png' />
      </HederWrapper>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  height: 120px;
  background-color: #d63836;
  display: flex;
  justify-content: center;
`;

const HederWrapper = styled.div`
  display: flex;
`;

const PokeMonLogo = styled.img`
  width: 240px;
  height: 100px;
`;
