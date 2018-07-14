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
  issueMonthYear,
  textColor,
  backgroundColor,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <Layout
      textColor={textColor}
      backgroundColor={backgroundColor}
      issueMonthYear={issueMonthYear}
    >
      <Columns>
        <Column>
          <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
            About
          </h2>
          <PageContent className="content" content={content} />
          <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
            Submitting
          </h2>
          <PageContent className="content" content={callForSubmissions} />
        </Column>
        <Column>
          <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
            Masthead
          </h2>
          <PageContent className="content" content={masthead} />
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

  const latestIssueMonthYear = _.get(
    allMarkdownRemark,
    'edges[0].node.frontmatter.issueMonthYear',
  );
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
      issueMonthYear={latestIssueMonthYear}
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
            issueMonthYear: date(formatString: "MMMM YYYY")
            textColor
            backgroundColor
          }
        }
      }
    }
  }
`;
