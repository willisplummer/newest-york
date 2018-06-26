import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';

const Tags = ({ tags }) =>
  tags.map((t, i, a) => (
    <span key={t}>
      <Tag to={`/tags/${kebabCase(t)}`}>{t}</Tag>
      {i + 1 < a.length && ', '}
    </span>
  ));

export default Tags;

const Tag = styled(Link)`
  color: inherit;
`;
