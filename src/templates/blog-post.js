import React from 'react';
import RehypeReact from 'rehype-react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import ImageWithCaption from '../styles/image';
import StyledText from '../styles/text';

const BlogImageWithCaption = styled(ImageWithCaption)`
  max-width: 100%;
  height: auto;
`;

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { img: BlogImageWithCaption },
}).Compiler;

export const BlogPostTemplate = ({ content, title, author }) => (
  <Wrap>
    <Header>{title}</Header>
    <Header>{author.toUpperCase()}</Header>
    <div>{renderAst(content)}</div>
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

const Wrap = StyledText.withComponent('div').extend`
  padding: 28px 36px;
`;

const Header = styled.div`
  text-align: center;
`;
