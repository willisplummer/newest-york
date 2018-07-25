import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled, { injectGlobal } from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';
import StyledText from '../../styles/text';
import { BORDER_WIDTH } from '../../styles/border-width';

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

  a {
    color: inherit;
    text-decoration: none;
    border-bottom-color: inherit;
    border-bottom-style: solid;
    border-bottom-width: ${BORDER_WIDTH};
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
          <LogoLink to="/">
            <Logo color="red" />
          </LogoLink>
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
const LogoLink = styled(Link)`
  border-bottom: none;
  position: fixed;
  z-index: 10;
  transform: rotate(270deg);
  width: 300px;
  top: 45%;
  left: -100px;
`;

const Gutter = styled.div`
  width: 100px;
  height: 100%;
  position: relative;
`;
