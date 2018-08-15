import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import media from '../styles/media-queries';
import { BlogPostTemplate } from '../templates/blog-post';
import Navbar from './shared/Navbar';

export const BlogPosts = ({ data }) => {
  const { edges: blogPosts } = data;

  const Posts = blogPosts.map(
    ({ node: { htmlAst, frontmatter: { title, author } } }) => (
      <BlogPostTemplate
        key={title}
        content={htmlAst}
        title={title}
        author={author}
      />
    ),
  );

  return (
    <Wrap>
      <Navbar isBlog />
      {Posts}
    </Wrap>
  );
};

export default BlogPosts;

export const blogPostsQueryFragment = graphql`
  fragment BlogPostsQueryFragment on RootQueryType {
    blogPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          htmlAst
          frontmatter {
            title
            publicationDate: date(formatString: "MMMM YYYY")
            image
            author
          }
        }
      }
    }
  }
`;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;

  ${media.small`
    left: 50%;
  `};

  overflow: scroll;
`;
