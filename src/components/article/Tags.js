import React from 'react';
import kebabCase from 'lodash/kebabCase';
import Link from '../shared/Link';

const Tags = ({ tags }) =>
  tags.map((t, i, a) => (
    <span key={t}>
      <Link to={`/tags/${kebabCase(t)}`}>{t}</Link>
      {i + 1 < a.length && ', '}
    </span>
  ));

export default Tags;
