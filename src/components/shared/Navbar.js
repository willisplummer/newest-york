import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import X from './X';
import StyledText from '../../styles/text';
import media from '../../styles/media-queries';
import { FONT_SIZE_DEFAULT } from '../../styles/font-size';

const Navbar = ({ issueMonthYear, isArticlePage, isBlog, textColor }) => (
  <Nav isArticlePage={isArticlePage}>
    <First hide={isArticlePage || isBlog}>{issueMonthYear}</First>
    {isArticlePage ? (
      <XLink onClick={() => window.history.back()}>
        <StyledX color={textColor} />
      </XLink>
    ) : (
      <NavItems>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/archive">Archive</NavLink>
        <ExternalNavLink
          href="http://www.newestyork.co/buy-a-book/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop
        </ExternalNavLink>
        <ExternalNavLink href={isBlog ? '#' : '#etc'}>Etc</ExternalNavLink>
      </NavItems>
    )}
  </Nav>
);

export default Navbar;

const Nav = styled.nav`
  padding: 20px;
  display: flex;
  justify-content: center;

  ${media.small`
    padding: 20px 35px;
    justify-content: space-between;
  `};

  ${({ isArticlePage }) =>
    isArticlePage &&
    `
    justify-content: space-between;
    padding: 20px 10px;
  `};
`;

const NavItems = styled.div`
  margin-left: -20px;
  font-size: ${FONT_SIZE_DEFAULT};
`;

const First = styled.div`
  display: ${({ hide }) => (hide ? 'inline' : 'none')};

  ${media.small`
    display: inline;
  `};
`;

const StyledLink = StyledText.withComponent(Link);

const NavLink = StyledLink.extend`
  margin-left: 20px;
  border-bottom: none;
`;

const ExternalNavLink = NavLink.withComponent('a');

const StyledX = styled(X)`
  stroke-width: 6px;
`;

const XLink = ExternalNavLink.extend`
  width: 2.25rem;
  height: auto;
  cursor: pointer;
`;
