import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Tags from '../components/article/Tags';
import Content, { HTMLContent } from '../components/shared/Content';
import Layout from '../components/shared/Layout';
import Columns, { Column } from '../components/shared/Columns';
import StyledText from '../styles/text';
import Header from '../styles/header';

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
      <StyledText>
        {helmet || ''}
        <Header>
          {title} by {authorName}
        </Header>
        <PostContent content={content} />
        <Columns>
          <Column>
            <Subhead>Bio</Subhead>
            <PostContent content={authorBio} />
          </Column>
          <Column>
            <Subhead>Tags</Subhead>
            <Tags tags={tags} />
          </Column>
        </Columns>
      </StyledText>
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
      content={post.html}
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
      html
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
