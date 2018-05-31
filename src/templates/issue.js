import React from 'react';
import Helmet from 'react-helmet';

export const IssueTemplate = ({ blurb, title, helmet }) => (
  <section className="section">
    {helmet || ''}
    <div className="container content">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
            {title}
          </h1>
          <p>{blurb}</p>
        </div>
      </div>
    </div>
  </section>
);

const Issue = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <IssueTemplate
      content={post.frontmatter.blurb}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      title={post.frontmatter.title}
      slug={post.fields.slug}
    />
  );
};

export default Issue;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query IssueById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        blurb
      }
    }
  }
`;
