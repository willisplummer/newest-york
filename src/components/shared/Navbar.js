import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import StyledText from '../../styles/text';
import media from '../../styles/media-queries';

const Navbar = ({ issueMonthYear, isArticlePage }) => (
  <Nav isArticlePage={isArticlePage}>
    <First isArticlePage={isArticlePage}>
      <StyledLink to="/">{issueMonthYear}</StyledLink>
    </First>
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
        <ExternalNavLink
          href="http://www.newestyork.co/blog/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Etc
        </ExternalNavLink>
      </div>
    )}
  </Nav>
);

export default Navbar;

const Nav = styled.nav`
  padding: 10px 20px;
  display: flex;
  justify-content: center;

  ${media.small`
    padding: 10px 35px;
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
  display: ${({ isArticlePage }) => (isArticlePage ? 'inline' : 'none')};

  ${media.small`
    display: inline;
  `};
`;

const StyledLink = StyledText.withComponent(Link);

const NavLink = StyledLink.extend`
  margin-left: 20px;
`;

const XLink = NavLink.extend`
  font-size: 24px;
`;

const ExternalNavLink = NavLink.withComponent('a');
