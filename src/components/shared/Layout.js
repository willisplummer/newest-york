import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';

const Layout = ({ children, issueMonthYear, textColor, backgroundColor }) => (
  <Background backgroundColor={backgroundColor} textColor={textColor}>
    <Navbar issueMonthYear={issueMonthYear} />
    <Container>
      <Gutter>
        <LogoWrap>
          <Logo color="red" />
        </LogoWrap>
      </Gutter>
      <Main>{children}</Main>
      <Gutter />
    </Container>
  </Background>
);

export default Layout;

const Background = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
`;

const Main = styled.div`
  flex: 1;
`;

// TODO: THE WIDTH IS BEING SET BEFORE THE ROTATION
// I WANT THE HEIGHT SET TO 100% of the width of the container
const LogoWrap = styled.div`
  position: absolute;
  width: 100%;
  z-index: 10;
  transform: rotate(270deg);
  top: 30%;
`;

const Gutter = styled.div`
  width: 100px;
  height: 100%;
  position: relative;
`;
