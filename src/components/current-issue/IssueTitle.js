import React from 'react';
import styled from 'styled-components';
import text from '../../styles/text';

const IssueTitle = ({ title, issueNumber }) => (
  <Container>
    <Title>Issue {issueNumber}</Title>
    <Title>{title}</Title>
  </Container>
);

export default IssueTitle;

const Container = styled.div`
  margin: 20px 0 40px 0;
`;

const Title = text.withComponent('div').extend`
  text-align: center;
  width: 100%;
  font-size: 36px;
`;
