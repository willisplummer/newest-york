import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import text from '../../styles/text';
import { FONT_SIZE_DEFAULT, FONT_SIZE_LARGE } from '../../styles/font-size';

const Article = ({ author, title, subtitle, slug, small }) => (
  <Container>
    <LinkItem to={slug}>
      <Title small={small}>{title}</Title>
      <Author small={small}>{author}</Author>
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
  font-size: ${FONT_SIZE_LARGE};
  ${({ small }) => small && `font-size: ${FONT_SIZE_DEFAULT};`};
`;

const Author = Title.extend`
  text-transform: uppercase;
  ${({ small }) => small && `font-size: ${FONT_SIZE_DEFAULT};`};
`;

const Subtitle = Title.extend`
  font-size: ${FONT_SIZE_DEFAULT};
`;
