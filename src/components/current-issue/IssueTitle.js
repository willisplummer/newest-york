import React from 'react';
import styled from 'styled-components';
import Header from '../../styles/header';

const IssueTitle = ({ title, issueNumber }) => (
  <Container>
    <Header>Issue {issueNumber}</Header>
    <Header>{title}</Header>
  </Container>
);

export default IssueTitle;

const Container = styled.div`
  margin: 20px 0 40px 0;
`;
