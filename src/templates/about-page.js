import React from 'react';
import { graphql } from 'gatsby';
import { markdown } from 'markdown';
import _ from 'lodash';
import Content, { HTMLContent } from '../components/shared/Content';
import Columns, { Column } from '../components/shared/Columns';
import Layout from '../components/shared/Layout';

export const AboutPageTemplate = ({
  content,
  contentComponent,
  masthead,
  callForSubmissions,
  textColor,
  backgroundColor,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <Layout textColor={textColor} backgroundColor={backgroundColor}>
      <Columns>
        <Column>
          <PageContent content={content} />
          <PageContent content={callForSubmissions} />
        </Column>
        <Column>
          <PageContent content={masthead} />
        </Column>
      </Columns>
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
  }
`;
