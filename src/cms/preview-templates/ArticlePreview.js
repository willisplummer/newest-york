import React from 'react';
import { ArticleTemplate } from '../../templates/about-page';

const ArticlePreview = ({ entry, widgetFor }) => (
  <ArticleTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
);

ArticlePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default ArticlePreview;
