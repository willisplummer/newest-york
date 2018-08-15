import React from 'react';
import RehypeReact from 'rehype-react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Header from '../styles/header';
import ImageWithCaption from '../styles/image';
import StyledText from '../styles/text';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { img: ImageWithCaption },
}).Compiler;

export const BlogPostTemplate = ({ content, title, author }) => (
  <Wrap>
    <Header>{title}</Header>
    <Header>{author.toUpperCase()}</Header>
    <StyledText>{renderAst(content)}</StyledText>
  </Wrap>
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

const Wrap = styled.div`
  padding: 24px;
`;
