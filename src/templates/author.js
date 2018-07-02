import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Content, { HTMLContent } from '../components/shared/Content';

export const AuthorTemplate = ({ name, bio, contentComponent, helmet }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>
            <PostContent content={bio} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Author = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <AuthorTemplate
      contentComponent={HTMLContent}
      helmet={<Helmet title={`${post.frontmatter.name} | Author`} />}
      name={post.frontmatter.name}
      bio={post.frontmatter.bio}
    />
  );
};

export default Author;

export const pageQuery = graphql`
  query AuthorById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name: title
        bio
      }
    }
  }
`;
