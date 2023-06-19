import styled from 'styled-components';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div``;
