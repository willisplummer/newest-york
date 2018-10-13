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
import ShareArticle from '../components/shared/ShareArticle';
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
  slug,
}) => {
  const PostContent = contentComponent || Content;

  const articleUrl = `newestyork.com${slug}`;

  return (
    <Layout issueMonthYear={issueMonthYear} textColor={textColor} isArticlePage>
      {helmet || ''}
      <Wrap>
        {galleryImages && <PhotoGallery imgs={galleryImages} />}
        <Header>{title}</Header>
        <Header>{authorName.toUpperCase()}</Header>
        <Main>{renderAst(content)}</Main>
        <Cols>
          <Col>
            <Subhead>Bio</Subhead>
            <PostContent content={authorBio} />
          </Col>
          <Col>
            <Subhead>Tags</Subhead>
            <Tags tags={tags} />
            <ShareArticle articleUrl={articleUrl} />
          </Col>
        </Cols>
      </Wrap>
    </Layout>
  );
};

const Article = ({ data }) => {
  const { markdownRemark: post } = data;
  const {
    frontmatter: { title, tags, galleryImages },
    fields: {
      slug,
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
      slug={slug}
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
        slug
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
  margin-top: 20px;
  flex: 1;
`;

const Main = styled.div`
  flex: 1;
`;

const Subhead = styled.div`
  text-transform: uppercase;
`;

const Cols = Columns.extend`
  margin-top: 24px;
`;

const Col = Column.extend`
  margin-bottom: 50px;
`;
