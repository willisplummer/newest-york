import React from 'react';
import { graphql } from 'gatsby';
import RehypeReact from 'rehype-react';
import ImageWithCaption from '../styles/image';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { img: ImageWithCaption },
}).Compiler;

export const BlogPosts = ({ data }) => {
  const { edges: blogPosts } = data.allMarkdownRemark;

  return blogPosts.map(
    ({ node: { htmlAst, frontmatter: { title, author } } }) => (
      <div key={title}>
        {title} by {author}
        {renderAst(htmlAst)}
      </div>
    ),
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
