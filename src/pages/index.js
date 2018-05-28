import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import maxBy from 'lodash/maxBy'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const issues = posts.filter(post => post.node.frontmatter.templateKey === 'issue');

    const latestIssue = issues[0].node
    const latestIssueNumber = issues.length
    const latestIssueMonth = latestIssue.frontmatter.date.split(' ')[0]
    const { textColor, backgroundColor, title: latestIssueTitle } = latestIssue.frontmatter

    const articles = posts.filter(post => post.node.frontmatter.templateKey === 'article')
    console.log('articles', articles)

    const latestIssueArticles = articles.filter(article => article.node.frontmatter.issue === latestIssueTitle)

    console.log(latestIssueMonth, textColor, backgroundColor)

    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">
              {`Issue ${latestIssueNumber}: ${latestIssueTitle}`}
            </h1>
          </div>
          {latestIssueArticles
            .map(({ node: post }) => (
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
                <p>
                  {console.log(post.frontmatter)}
                  {post.frontmatter.author}
                </p>
              </div>
            ))}
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

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
            templateKey
            date(formatString: "MMMM DD, YYYY")
            issue
            author
            backgroundColor
            textColor
          }
        }
      }
    }
  }
`
