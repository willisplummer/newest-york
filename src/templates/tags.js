import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import _ from 'lodash';
import Layout from '../components/shared/Layout';

const TagRoute = ({
  data: { latestIssue, allMarkdownRemark: { totalCount, edges: posts } },
  pageContext: { tag },
}) => {
  const textColor = _.get(latestIssue, 'edges[0].node.frontmatter.textColor');
  const backgroundColor = _.get(
    latestIssue,
    'edges[0].node.frontmatter.backgroundColor',
  );

  const postLinks = posts.map(post => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>
        <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
      </Link>
    </li>
  ));

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with “${tag}”`;

  return (
    <Layout textColor={textColor} backgroundColor={backgroundColor}>
      <Helmet title={`${tag}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
            <ul className="taglist">{postLinks}</ul>
            <p>
              <Link to="/tags/">Browse all tags</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    latestIssue: allMarkdownRemark(
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
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
