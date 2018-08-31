import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled, { injectGlobal } from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';
import Button from './Button';
import StyledText from '../../styles/text';
import { BORDER_WIDTH } from '../../styles/border-width';
import { FONT_SIZE_DEFAULT, FONT_SIZE_LARGE } from '../../styles/font-size';
import media from '../../styles/media-queries';
import { BlogPosts } from '../blog-posts';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  html, body {
    height: 100%;
    margin: 0;
  }

  #___gatsby {
    height: inherit
  }

  a {
    color: inherit;
    text-decoration: none;
    border-bottom-color: inherit;
    border-bottom-style: solid;
    border-bottom-width: ${BORDER_WIDTH};
  }

  h1, h2 {
    text-align: center;
    margin: 0;
    margin-bottom: -20px;
    font-weight: normal;
    color: inherit;
    text-decoration: none;
    font-size: ${FONT_SIZE_DEFAULT};
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
  blogPosts,
}) => {
  const blogHash = `#etc`;
  const showBlog =
    typeof window !== 'undefined' && window.location.hash === blogHash;

  return (
    <Fragment>
      <Helmet title="Newest York" />
      <StyledText>
        <Background
          showBlog={showBlog}
          backgroundColor={backgroundColor}
          textColor={textColor}
        >
          <Navbar
            issueMonthYear={issueMonthYear}
            isArticlePage={isArticlePage}
          />
          <Container>
            <Gutter>
              <LogoLink to="/">
                <Logo color={textColor} />
              </LogoLink>
            </Gutter>
            <Main>{children}</Main>
            <Gutter>
              {isArticlePage && (
                <UpArrowButton onClick={scrollTop}>↑</UpArrowButton>
              )}
            </Gutter>
          </Container>
        </Background>
      </StyledText>
      {showBlog && blogPosts && <BlogPosts data={blogPosts} />}
    </Fragment>
  );
};

export default Layout;

const Background = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  display: flex;
  flex-direction: column;
  min-height: 100%;
  ${({ showBlog }) => (showBlog ? 'overflow: none;' : '')};
`;

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex: 1;
`;

const Main = styled.div`
  flex: 1;
  max-width: 60em;
  margin: 0 auto;
  min-height: 100%;
`;

const LogoLink = styled(Link)`
  border-bottom: none;
  position: fixed;
  z-index: 10;
  transform: rotate(270deg);
  top: 45%;

  width: 160px;
  left: -50px;

  ${media.small`
    width: 250px;
    left: -74px;
  `};
`;

const Gutter = styled.div`
  height: 100%;
  position: relative;
  width: 100px;
`;

const UpArrowButton = Button.extend`
  position: fixed;
  z-index: 10;
  width: 100px;
  bottom: 10px;
  right: 10px;
  font-size: ${FONT_SIZE_LARGE};
`;
