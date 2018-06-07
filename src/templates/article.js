import React from 'react';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/shared/Content';
import Layout from '../components/shared/Layout';

export const ArticleTemplate = ({
  authorName,
  authorBio,
  content,
  contentComponent,
  title,
  helmet,
  tags,
  textColor,
  issueMonthYear,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Layout issueMonthYear={issueMonthYear} textColor={textColor}>
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
                  <ul>{tags.map(t => <li key={t}>{t}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Article = ({ data }) => {
  const { markdownRemark: post } = data;
  const {
    fields: {
      issue: { frontmatter: { textColor, issueMonthYear } },
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
      textColor={textColor}
      issueMonthYear={issueMonthYear}
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
        issue {
          frontmatter {
            textColor
            issueMonthYear: date(formatString: "MMMM YYYY")
          }
        }
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
