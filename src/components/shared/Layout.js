import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled, { injectGlobal } from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';
import Button from './Button';
import StyledText from '../../styles/text';
import { BORDER_WIDTH } from '../../styles/border-width';
import { FONT_SIZE_LARGE } from '../../styles/font-size';

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
    height: 100%;
    overflow: auto;
  }

  html {
    overflow: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
    border-bottom-color: inherit;
    border-bottom-style: solid;
    border-bottom-width: ${BORDER_WIDTH};
  }
`;

const scrollTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

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
        <Gutter>
          {isArticlePage && (
            <UpArrowButton onClick={scrollTop}>↑</UpArrowButton>
          )}
        </Gutter>
      </Container>
    </StyledText>
  </Background>
);

export default Layout;

const Background = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 1;
  max-width: 60em;
  margin: 0 auto;
`;

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

const UpArrowButton = Button.extend`
  position: fixed;
  z-index: 10;
  width: 100px;
  top: 45%;
  right: 0;
  font-size: ${FONT_SIZE_LARGE};
`;
