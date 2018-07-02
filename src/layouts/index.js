import React from 'react';
import Helmet from 'react-helmet';

require('./global-css');

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Newest York" />
    {children}
  </div>
);

export default TemplateWrapper;
