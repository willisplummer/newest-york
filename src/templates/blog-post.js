import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

export const BlogPostTemplate = ({ blurb, title, helmet }) => (
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

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <BlogPostTemplate
      content={post.frontmatter.blurb}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      title={post.frontmatter.title}
      slug={post.fields.slug}
    />
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
      }
    }
  }
`;
