import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'

export const IssueTemplate = ({
  blurb,
  title,
  slug,
  helmet,
}) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{blurb}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const Issue = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <IssueTemplate
      content={post.frontmatter.blurb}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      title={post.frontmatter.title}
      slug={post.fields.slug}
    />
  )
}

export default Issue

export const pageQuery = graphql`
  query IssueById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        blurb
      }
    }
  }
`
