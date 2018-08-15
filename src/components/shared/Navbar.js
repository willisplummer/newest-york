import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import StyledText from '../../styles/text';
import media from '../../styles/media-queries';
import { FONT_SIZE_LARGE } from '../../styles/font-size';

const Navbar = ({ issueMonthYear, isArticlePage, isBlog }) => (
  <Nav isArticlePage={isArticlePage}>
    <First hide={isArticlePage || isBlog}>{issueMonthYear}</First>
    {isArticlePage ? (
      <XLink to="/">✕</XLink>
    ) : (
      <div>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/archive">Archive</NavLink>
        <ExternalNavLink
          href="http://www.newestyork.co/buy-a-book/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop
        </ExternalNavLink>
        <NavLink to={isBlog ? '#' : '#etc'}>Etc</NavLink>
      </div>
    )}
  </Nav>
);

export default Navbar;

const Nav = styled.nav`
  padding: 20px 20px;
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
    padding: 10px 35px;
  `};
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

const XLink = NavLink.extend`
  font-size: ${FONT_SIZE_LARGE};
  margin-top: -10px;
`;

const ExternalNavLink = NavLink.withComponent('a');
