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
import FONT_FAMILY from '../../styles/font-family';
import { BlogPosts } from '../blog-posts';
import Carrot from './Carrot';
import favIcon from './favicon.ico';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    box-sizing: border-box;
    font-family: ${FONT_FAMILY};

    font-size: 8px;

    ${media.small`
      font-size: 16px;
    `};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
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
    margin: 12px 0;
    margin-bottom: -12px;
    font-weight: normal;
    color: inherit;
    text-decoration: none;
    font-size: ${FONT_SIZE_DEFAULT};
  }

  iframe {
    display: block;
    margin: 12px auto;
    max-width: 100%;
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
      <Helmet title="Newest York">
        <link rel="icon" type="image/x-icon" href={favIcon} sizes="16x16" />
      </Helmet>

      <Background
        showBlog={showBlog}
        backgroundColor={backgroundColor}
        textColor={textColor}
      >
        <StyledText>
          <Navbar
            issueMonthYear={issueMonthYear}
            isArticlePage={isArticlePage}
            textColor={textColor}
          />
          <Container>{children}</Container>
          <LogoLink to="/">
            <Logo color={textColor} />
          </LogoLink>
          {isArticlePage && (
            <UpArrowButton onClick={scrollTop}>
              <Carrot color={textColor} />
            </UpArrowButton>
          )}
          {showBlog && blogPosts && <BlogPosts data={blogPosts} />}
        </StyledText>
      </Background>
    </Fragment>
  );
};

export default Layout;

const Background = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  min-height: 100vh;
  ${({ showBlog }) => (showBlog ? 'overflow: none;' : '')};
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 0 45px;
  flex: 1;
  display: flex;
  flex-direction: column;
  ${media.small`
    margin: 0 100px;
  `};
`;

const LogoLink = styled(Link)`
  position: fixed;
  border-bottom: none;
  z-index: 10;
  transform: rotate(270deg);
  top: 45%;

  width: 120px;
  left: -40px;

  ${media.small`
    width: 200px;
    left: -50px;
  `};
`;

const UpArrowButton = Button.extend`
  position: fixed;
  z-index: 10;
  bottom: 20px;
  right: 0;
  padding: 0;
  width: 2.25rem;
  font-size: ${FONT_SIZE_LARGE};
  margin-right: 10px;
  ${media.small`
    margin-right: 35px;
  `};
`;
