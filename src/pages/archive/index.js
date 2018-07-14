import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../../components/shared/Layout';
import Issue from '../../components/archive/Issue';

const ArchivePage = ({
  data: { allMarkdownRemark: { edges: issues, totalCount } },
}) => {
  const latestIssue = issues[0].node;
  const { textColor, backgroundColor } = latestIssue.frontmatter;

  return (
    <Layout textColor={textColor} backgroundColor={backgroundColor}>
      <Helmet title="Newest York | Archive" />
      {issues.map((issue, index) => (
        <Issue
          key={issue.node.frontmatter.title}
          issue={issue.node}
          issueNumber={totalCount - index}
          textColor={textColor}
        />
      ))}
    </Layout>
  );
};

export default ArchivePage;

export const archivePageQuery = graphql`
  query archiveQuery {
    allMarkdownRemark(
      limit: 500
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "issue" } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
            articles {
              fields {
                slug
              }
              frontmatter {
                author
                order
                title
                subtitle
              }
            }
          }
          frontmatter {
            title
            blurb
            publicationMonthYear: date(formatString: "MMMM YYYY")
            backgroundColor
            textColor
            image
          }
        }
      }
    }
  }
`;
