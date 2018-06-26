import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabcase';

const Tags = ({ tags }) =>
  tags.map((t, i, a) => (
    <span>
      <Tag key={t} to={`/tags/${kebabCase(t)}`}>
        {t}
      </Tag>
      {i + 1 < a.length && ', '}
    </span>
  ));

export default Tags;

const Tag = styled(Link)`
  color: inherit;
`;
