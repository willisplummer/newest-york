import React, { Component } from 'react';
import { graphql } from 'gatsby';
import compact from 'lodash/compact';
import sortBy from 'lodash/sortBy';
import Article from '../components/current-issue/Article';
import IssueTitle from '../components/current-issue/IssueTitle';
import Layout from '../components/shared/Layout';
import { Image } from '../styles/image';
import styled from '../../node_modules/styled-components';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = { hideImage: false };
  }

  componentDidMount() {
    const blogHash = `#etc`;
    const blogIsDisplayed =
      typeof window !== 'undefined' && window.location.hash === blogHash;

    const issueTitle = this.props.data.allMarkdownRemark.edges[0].title;

    const hasSeenImageBefore = localStorage.getItem(issueTitle);

    if (hasSeenImageBefore || blogIsDisplayed) {
      // eslint-disable-next-line
      this.setState({ hideImage: true });
    } else {
      setTimeout(() => this.setState({ hideImage: true }), 500);

      localStorage.setItem(issueTitle, true);
    }
  }

  render() {
    const { data } = this.props;
    const { edges: issues, totalCount } = data.allMarkdownRemark;

    const latestIssue = issues[0].node;
    const latestIssueNumber = totalCount;

    const {
      textColor,
      backgroundColor,
      title: latestIssueTitle,
      publicationMonthYear,
      image,
    } = latestIssue.frontmatter;

    const { fields: { articles } } = latestIssue;

    const sortedArticles = compact(sortBy(articles, 'frontmatter.order'));

    return (
      <Layout
        issueMonthYear={publicationMonthYear}
        textColor={textColor}
        backgroundColor={backgroundColor}
        blogPosts={data.blogPosts}
      >
        {this.state.hideImage || <HoverImage src={image} />}
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
      </Layout>
    );
  }
}

export default IndexPage;

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
            image
          }
        }
      }
    }
    ...BlogPostsQueryFragment
  }
`;

const HoverImage = styled(Image)`
  opacity: 1;
  z-index: 1;
  position: fixed;
  top: 27%;
  left: 50%;
  transform: translateX(-50%);
  ${({ hideImage }) =>
    hideImage &&
    `
    opacity: 0;
    z-index: -1;
  `};
  -webkit-transition: opacity 0.75s, z-index 0.75s; /* Safari */
  transition: opacity 0.75s, z-index 0.75s;
`;
