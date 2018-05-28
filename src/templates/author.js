import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
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

BlogPostTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  helmet: PropTypes.instanceOf(Helmet),
  contentComponent: PropTypes.func,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: author } = data

  return (
    <BlogPostTemplate
      contentComponent={HTMLContent}
      helmet={<Helmet title={`${post.frontmatter.name} | Author`} />}
      name={post.frontmatter.title}
      bio={post.frontmatter.bio}
    />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query AuthorById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name: title
        bio
      }
    }
  }
`
