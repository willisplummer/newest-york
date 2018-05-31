import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import text from '../../styles/text';

const Article = ({ author, title, subtitle, slug }) => (
  <Container>
    <LinkItem to={slug}>
      <Title>{title}</Title>
      <Author>{author}</Author>
      <Subtitle>{subtitle}</Subtitle>
    </LinkItem>
  </Container>
);

export default Article;

const Container = styled.div`
  margin: 40px 0;
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Title = text.withComponent('div').extend`
  text-align: center;
  width: 100%;
  font-size: 36px;
`;

const Author = Title.extend`
  text-transform uppercase
`;

const Subtitle = Title.extend`
  font-size: 18px;
`;
