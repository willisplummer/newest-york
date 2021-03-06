import React from 'react';
import RehypeReact from 'rehype-react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import ImageWithCaption from '../styles/image';
import StyledText from '../styles/text';
import { BORDER_WIDTH } from '../styles/border-width';

const BlogImageWithCaption = styled(ImageWithCaption)`
  max-width: 100%;
  height: auto;
`;

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { img: BlogImageWithCaption },
}).Compiler;

export const BlogPostTemplate = ({ content, title, author, isLast }) => (
  <Wrap isLast={isLast}>
    <Header>{title}</Header>
    <Header>{author.toUpperCase()}</Header>
    <div>{renderAst(content)}</div>
  </Wrap>
);

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <BlogPostTemplate
      content={post.htmlAst}
      title={post.frontmatter.title}
      author={post.frontmatter.author}
    />
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
      }
    }
  }
`;

const Wrap = StyledText.withComponent('div').extend`
  padding: 56px 0 28px;
  margin: 0 75px;
  border-bottom: ${({ isLast }) => (isLast ? 'none' : `solid ${BORDER_WIDTH}`)};
  color: black;
`;

const Header = styled.div`
  text-align: center;
`;
