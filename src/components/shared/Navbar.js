import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import StyledText from '../../styles/text';

const Navbar = ({ issueMonthYear }) => (
  <Nav>
    <div>
      <StyledLink to="/">{issueMonthYear}</StyledLink>
    </div>
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
  </Nav>
);

export default Navbar;

const Nav = styled.nav`
  padding: 10px 35px;
  display: flex;
  justify-content: space-between;
`;

const StyledLink = StyledText.withComponent(Link);

const NavLink = StyledLink.extend`
  margin-left: 20px;
`;

const ExternalNavLink = NavLink.withComponent('a');
