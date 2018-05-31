import React from 'react';
import _ from 'lodash';
import Article from '../components/current-issue/Article';
import IssueTitle from '../components/current-issue/IssueTitle';
import Layout from '../components/shared/Layout';

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;
  const issues = posts.filter(
    post => post.node.frontmatter.templateKey === 'issue',
  );

  const latestIssue = issues[0].node;
  const latestIssueNumber = issues.length;
  const latestIssueMonth = latestIssue.frontmatter.date.split(' ')[0];
  const latestIssueYear = latestIssue.frontmatter.date.split(' ')[2];
  const issueMonthYear = `${latestIssueMonth} ${latestIssueYear}`;
  const {
    textColor,
    backgroundColor,
    title: latestIssueTitle,
  } = latestIssue.frontmatter;

  const articles = posts.filter(
    post => post.node.frontmatter.templateKey === 'article',
  );

  const latestIssueArticles = _.sortBy(
    articles.filter(
      article => article.node.frontmatter.issue === latestIssueTitle,
    ),
    article => article.node.frontmatter.order,
  );

  return (
    <Layout
      issueMonthYear={issueMonthYear}
      textColor={textColor}
      backgroundColor={backgroundColor}
    >
      <section className="section">
        <IssueTitle title={latestIssueTitle} issueNumber={latestIssueNumber} />
        {latestIssueArticles.map(({ node: post }) => (
          <Article
            key={post.fields.slug}
            slug={post.fields.slug}
            title={post.frontmatter.title}
            author={post.frontmatter.author}
            subtitle={post.frontmatter.subtitle}
          />
        ))}
      </section>
    </Layout>
  );
};

export default IndexPage;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            templateKey
            date(formatString: "MMMM DD, YYYY")
            issue
            author
            order
            backgroundColor
            textColor
          }
        }
      }
    }
  }
`;
