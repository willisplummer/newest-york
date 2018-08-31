import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import text from '../../styles/text';
import { FONT_SIZE_DEFAULT } from '../../styles/font-size';

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
  :hover {
    color: white;
  }
`;

const Title = text.withComponent('div').extend`
  text-align: left;
  width: 100%;
  font-size: ${FONT_SIZE_DEFAULT};
`;

const Author = Title.extend`
  text-transform: uppercase;
`;

const Subtitle = Title;
