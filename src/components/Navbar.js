import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import StyledText from '../styles/text';

const Navbar = ({ issueMonthYear, textColor }) => (
  <Nav color={textColor}>
    <div>
      <StyledText className="navbar-item">{issueMonthYear}</StyledText>
    </div>
    <div>
      <NavLink className="navbar-item" to="/about">
        About
      </NavLink>
      <NavLink className="navbar-item" to="/archive">
        Archive
      </NavLink>
      <ExternalNavLink
        className="navbar-item"
        href="http://www.newestyork.co/buy-a-book/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Shop
      </ExternalNavLink>
      <ExternalNavLink
        className="navbar-item"
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
  color: ${({ color }) => color};
  padding: 10px 35px;
  display: flex;
  justify-content: space-between;
`;

const NavLink = StyledText.withComponent(Link).extend`
  margin-left: 20px;
`;

const ExternalNavLink = NavLink.withComponent('a');
