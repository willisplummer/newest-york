import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Logo from '../components/Logo';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Newest York" />
    <LogoWrap>
      <Logo color="red" />
    </LogoWrap>
    <div>{children()}</div>
  </div>
);

export default TemplateWrapper;

const LogoWrap = styled.div`
  width: 120px;
  position: absolute;
  zindex: 10;
  transform: rotate(-90deg);
  top: 300px;
  left: 0;
`;
