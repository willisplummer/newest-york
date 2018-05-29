import React from 'react'
import {markdown} from 'markdown'
import Content, { HTMLContent } from '../components/Content'
import Navbar from '../components/Navbar'
import _ from 'lodash'

export const AboutPageTemplate = ({ title, content, contentComponent, masthead, callForSubmissions, issueMonthYear }) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <Navbar issueMonthYear={issueMonthYear} />
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-6">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  About
                </h2>
                <PageContent className="content" content={content} />
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  Submitting
                </h2>
                <PageContent className="content" content={callForSubmissions} />
              </div>
            </div>
            <div className="column is-6">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  Masthead
                </h2>
                <PageContent className="content" content={masthead} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark } = data
  const callForSubmissions = markdown.toHTML(post.frontmatter.callForSubmissions)
  const masthead = markdown.toHTML(post.frontmatter.masthead)

  const latestIssueMonthYear = _.get(allMarkdownRemark, 'edges[0].node.frontmatter.issueMonthYear')
  console.log(allMarkdownRemark.edges[0])
  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      masthead={masthead}
      callForSubmissions={callForSubmissions}
      content={post.html}
      issueMonthYear={latestIssueMonthYear}
    />
  )
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        masthead
        callForSubmissions
      }
    }
    allMarkdownRemark(
      limit: 1,
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "issue" } }}
    ) {
      edges {
        node{
          frontmatter {
            issueMonthYear: date(formatString: "MMMM YYYY")
          }
        }
      }
    }
  }
`
