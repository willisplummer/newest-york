import React from 'react';
import sortBy from 'lodash/sortBy';
import Article from '../components/current-issue/Article';
import IssueTitle from '../components/current-issue/IssueTitle';
import Layout from '../components/shared/Layout';

const IndexPage = ({ data }) => {
  const { edges: issues } = data.allMarkdownRemark;

  const latestIssue = issues[0].node;
  const latestIssueNumber = issues.totalCount;

  const {
    textColor,
    backgroundColor,
    title: latestIssueTitle,
    publicationMonthYear,
  } = latestIssue.frontmatter;

  const { fields: { articles } } = latestIssue;

  const sortedArticles = sortBy(articles, 'frontmatter.order');

  return (
    <Layout
      issueMonthYear={publicationMonthYear}
      textColor={textColor}
      backgroundColor={backgroundColor}
    >
      <section className="section">
        <IssueTitle title={latestIssueTitle} issueNumber={latestIssueNumber} />
        {sortedArticles.map(
          ({ fields: { slug }, frontmatter: { title, author, subtitle } }) => (
            <Article
              key={slug}
              slug={slug}
              title={title}
              author={author}
              subtitle={subtitle}
            />
          ),
        )}
      </section>
    </Layout>
  );
};

export default IndexPage;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 1
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
            publicationMonthYear: date(formatString: "MMMM YYYY")
            backgroundColor
            textColor
          }
        }
      }
    }
  }
`;
