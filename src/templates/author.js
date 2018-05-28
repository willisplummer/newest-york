import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'

export const AuthorTemplate = ({
  name,
  bio,
  contentComponent,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>
            <PostContent content={bio} />
          </div>
        </div>
      </div>
    </section>
  )
}

const Author = ({ data }) => {
  const { markdownRemark: author } = data

  return (
    <AuthorTemplate
      contentComponent={HTMLContent}
      helmet={<Helmet title={`${post.frontmatter.title} | Author`} />}
      name={post.frontmatter.title}
      bio={post.frontmatter.bio}
    />
  )
}

export default Author

export const pageQuery = graphql`
  query AuthorById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        bio
      }
    }
  }
`
