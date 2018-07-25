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
  }

  componentDidMount() {
    window.addEventListener(
      'scroll',
      () => {
        this.setState({ hasScrolled: true });
      },
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
  }
`;

const HoverImage = styled(Image)`
  opacity: 1;
  position: absolute;
  top: 30%;
  left: 27%;
  ${({ hasScrolled }) => hasScrolled && `opacity: 0;`};
  -webkit-transition: opacity 0.75s; /* Safari */
  transition: opacity 0.75s;
`;
