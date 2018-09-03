import React from 'react';
import { graphql } from 'gatsby';
import { markdown } from 'markdown';
import styled from 'styled-components';
import _ from 'lodash';
import Content, { HTMLContent } from '../components/shared/Content';
import Columns, { Column } from '../components/shared/Columns';
import SubscribeCTA from '../components/shared/SubscribeCTA';
import Layout from '../components/shared/Layout';

export const AboutPageTemplate = ({
  content,
  contentComponent,
  masthead,
  callForSubmissions,
  textColor,
  backgroundColor,
  blogPosts,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <Layout
      blogPosts={blogPosts}
      textColor={textColor}
      backgroundColor={backgroundColor}
    >
      <Cols>
        <Column>
          <PageContent content={content} />
          <SubscribeCTA />
          <PageContent content={callForSubmissions} />
        </Column>
        <Column>
          <PageContent content={masthead} />
        </Column>
      </Cols>
    </Layout>
  );
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark } = data;
  const callForSubmissions = markdown.toHTML(
    post.frontmatter.callForSubmissions,
  );
  const masthead = markdown.toHTML(post.frontmatter.masthead);

  const textColor = _.get(
    allMarkdownRemark,
    'edges[0].node.frontmatter.textColor',
  );
  const backgroundColor = _.get(
    allMarkdownRemark,
    'edges[0].node.frontmatter.backgroundColor',
  );

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      masthead={masthead}
      callForSubmissions={callForSubmissions}
      content={post.html}
      textColor={textColor}
      backgroundColor={backgroundColor}
      blogPosts={data.blogPosts}
    />
  );
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        masthead
        callForSubmissions
      }
    }
    allMarkdownRemark(
      limit: 1
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "issue" } } }
    ) {
      edges {
        node {
          frontmatter {
            textColor
            backgroundColor
          }
        }
      }
    }
    ...BlogPostsQueryFragment
  }
`;

const Cols = styled(Columns)`
  padding-bottom: 50px;
`;
