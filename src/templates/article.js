import React from 'react';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/shared/Content';

export const ArticleTemplate = ({
  authorName,
  authorBio,
  content,
  contentComponent,
  title,
  helmet,
  tags,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title} by {authorName}
            </h1>
            <PostContent content={content} />
            <div className="columns">
              <div className="column is-6">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                  Bio
                </h1>
                <PostContent content={authorBio} />
              </div>
              <div className="column is-6">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                  Tags
                </h1>
                <ul>{tags.map(t => <li>{t}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Article = ({ data }) => {
  const { markdownRemark: post } = data;
  const {
    fields: {
      author: {
        // fields: { slug: authorSlug },
        frontmatter: { title: authorName, bio: authorBio },
      },
    },
  } = post;

  return (
    <ArticleTemplate
      content={post.html}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      title={post.frontmatter.title}
      tags={post.frontmatter.tags}
      authorName={authorName}
      authorBio={authorBio}
    />
  );
};

export default Article;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query ArticleById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        author {
          fields {
            slug
          }
          frontmatter {
            title
            bio
          }
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;
