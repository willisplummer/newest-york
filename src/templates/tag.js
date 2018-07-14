import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import _ from 'lodash';
import Columns, { Column } from '../components/shared/Columns';
import Layout from '../components/shared/Layout';
import Article from '../components/tag/Article';
import Header from '../styles/header';

const TagRoute = ({
  data: { latestIssue, allMarkdownRemark: { edges: posts } },
  pageContext: { tag },
}) => {
  const textColor = _.get(latestIssue, 'edges[0].node.frontmatter.textColor');
  const backgroundColor = _.get(
    latestIssue,
    'edges[0].node.frontmatter.backgroundColor',
  );

  const taggedArticles = posts.map(
    ({
      node: { fields: { slug }, frontmatter: { title, author, subtitle } },
    }) => (
      <Article
        key={slug}
        slug={slug}
        title={title}
        author={author}
        subtitle={subtitle}
      />
    ),
  );

  return (
    <Layout textColor={textColor} backgroundColor={backgroundColor}>
      <Helmet title={`${tag}`} />
      <Columns>
        <Column>
          <TagHeader>{tag}</TagHeader>
        </Column>
        <Column>{taggedArticles}</Column>
      </Columns>
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
      edges {
        node {
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
    }
  }
`;

const TagHeader = Header.extend`
  text-align: left;
  text-transform: capitalize;
  margin: 40px 0;
`;
