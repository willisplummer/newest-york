import React from 'react';
import Link from 'gatsby-link';
import _ from 'lodash';
import Navbar from '../components/Navbar';

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
    // textColor,
    // backgroundColor,
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
    <div>
      <Navbar issueMonthYear={issueMonthYear} />
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">
              {`Issue ${latestIssueNumber}: ${latestIssueTitle}`}
            </h1>
          </div>
          {latestIssueArticles.map(({ node: post }) => (
            <div
              className="content"
              style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
              key={post.id}
            >
              <p>
                <Link className="has-text-primary" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
              </p>
              <p>{post.frontmatter.author}</p>
              <p>{post.frontmatter.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
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
