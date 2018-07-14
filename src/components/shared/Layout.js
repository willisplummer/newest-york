import React from 'react';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';
import StyledText from '../../styles/text';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    height: 100%
  }
`;

const Layout = ({
  children,
  issueMonthYear,
  textColor,
  backgroundColor,
  isArticlePage,
}) => (
  <Background backgroundColor={backgroundColor} textColor={textColor}>
    <Helmet title="Newest York" />
    <StyledText>
      <Navbar issueMonthYear={issueMonthYear} isArticlePage={isArticlePage} />
      <Container>
        <Gutter>
          <LogoWrap>
            <Logo color="red" />
          </LogoWrap>
        </Gutter>
        <Main>{children}</Main>
        <Gutter />
      </Container>
    </StyledText>
  </Background>
);

export default Layout;

const Background = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  height: 100vh;
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Main = styled.div`
  flex: 1;
  max-width: 60em;
  margin: 0 auto;
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
