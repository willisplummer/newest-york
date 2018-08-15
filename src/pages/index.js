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
    this.state = { hasScrolled: false };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    // TODO: put this function somewhere reusable
    const blogHash = `#etc`;
    const showBlog =
      typeof window !== 'undefined' && window.location.hash === blogHash;
    if (showBlog) {
      // eslint-disable-next-line
      this.setState({ hasScrolled: true });
    } else {
      window.addEventListener('scroll', this.handleScroll, true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll(event) {
    this.setState({ hasScrolled: true });
    event.currentTarget.removeEventListener(
      event.type,
      this.handleScroll,
      true,
    );
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
        <HoverImage src={image} hasScrolled={this.state.hasScrolled} />
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
  ${({ hasScrolled }) =>
    hasScrolled &&
    `
    opacity: 0;
    z-index: -1;
  `};
  -webkit-transition: opacity 0.75s, z-index 0.75s; /* Safari */
  transition: opacity 0.75s, z-index 0.75s;
`;
