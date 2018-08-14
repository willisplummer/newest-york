import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import RehypeReact from 'rehype-react';
import styled from 'styled-components';
import Tags from '../components/article/Tags';
import Content, { HTMLContent } from '../components/shared/Content';
import Layout from '../components/shared/Layout';
import Columns, { Column } from '../components/shared/Columns';
import Header from '../styles/header';
import ImageWithCaption from '../styles/image';
import Link from '../components/shared/Link';
import PhotoGallery from '../components/shared/PhotoGallery';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { img: ImageWithCaption },
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
  galleryImages,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Layout issueMonthYear={issueMonthYear} textColor={textColor} isArticlePage>
      {helmet || ''}
      <Wrap>
        {galleryImages && <PhotoGallery imgs={galleryImages} />}
        <Header>{title}</Header>
        <Header>{authorName.toUpperCase()}</Header>
        <Main>{renderAst(content)}</Main>
        <Columns>
          <Col>
            <Subhead>Bio</Subhead>
            <PostContent content={authorBio} />
          </Col>
          <Col>
            <Subhead>Tags</Subhead>
            <Tags tags={tags} />
            <ShareWrap>
              <ShareLink href="https://www.twitter.com">Share ↗</ShareLink>
            </ShareWrap>
          </Col>
        </Columns>
      </Wrap>
    </Layout>
  );
};

const Article = ({ data }) => {
  const { markdownRemark: post } = data;
  const {
    frontmatter: { title, tags, galleryImages },
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
      helmet={<Helmet title={`${title} | Newest York`} />}
      title={title}
      tags={tags}
      authorName={authorName}
      authorBio={authorBio}
      textColor={textColor}
      issueMonthYear={issueMonthYear}
      galleryImages={galleryImages}
    />
  );
};

export default Article;

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
        galleryImages
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Main = styled.div`
  flex: 1;
`;

const Subhead = styled.div`
  text-transform: uppercase;
`;

const Col = Column.extend`
  margin-bottom: 50px;
`;

const ShareWrap = styled('div')`
  margin-top: 8px;
`;

const ShareLink = Link.withComponent('a').extend`
  text-decoration: none;
  border-bottom: none;
`;
