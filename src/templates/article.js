import React from 'react';
import Helmet from 'react-helmet';
import RehypeReact from 'rehype-react';
import styled from 'styled-components';
import Tags from '../components/article/Tags';
import Content, { HTMLContent } from '../components/shared/Content';
import Layout from '../components/shared/Layout';
import Columns, { Column } from '../components/shared/Columns';
import Header from '../styles/header';
import Image from '../styles/image';
import Link from '../components/shared/Link';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { img: Image },
}).Compiler;

export const ArticleTemplate = ({
  authorName,
  authorBio,
  content,
  contentComponent,
  title,
  helmet,
  tags,
  textColor,
  issueMonthYear,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Layout issueMonthYear={issueMonthYear} textColor={textColor}>
      {helmet || ''}
      <Header>{title}</Header>
      <Header>{authorName.toUpperCase()}</Header>
      {renderAst(content)}
      <Columns>
        <BottomCol>
          <Subhead>Bio</Subhead>
          <PostContent content={authorBio} />
        </BottomCol>
        <BottomCol>
          <Subhead>Tags</Subhead>
          <Tags tags={tags} />
          <div>
            <ShareLink href="https://www.twitter.com">Share ↗</ShareLink>
          </div>
        </BottomCol>
      </Columns>
    </Layout>
  );
};

const Article = ({ data }) => {
  const { markdownRemark: post } = data;
  const {
    fields: {
      issue: { frontmatter: { textColor, issueMonthYear } },
      author: {
        // fields: { slug: authorSlug },
        frontmatter: { title: authorName, bio: authorBio },
      },
    },
  } = post;

  return (
    <ArticleTemplate
      content={post.htmlAst}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`${post.frontmatter.title} | Newest York`} />}
      title={post.frontmatter.title}
      tags={post.frontmatter.tags}
      authorName={authorName}
      authorBio={authorBio}
      textColor={textColor}
      issueMonthYear={issueMonthYear}
    />
  );
};

export default Article;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query ArticleById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      htmlAst
      fields {
        issue {
          frontmatter {
            textColor
            issueMonthYear: date(formatString: "MMMM YYYY")
          }
        }
        author {
          fields {
            slug
          }
          frontmatter {
            title
            bio
          }
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;

const Subhead = styled.div`
  text-transform: uppercase;
`;

const BottomCol = Column.extend`
  margin-bottom: 50px;
`;

const ShareLink = Link.withComponent('a').extend`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
