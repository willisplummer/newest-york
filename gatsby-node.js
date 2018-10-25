const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { ne: null } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const { id } = edge.node;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`,
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      });

      if (edge.node.frontmatter.path) {
        createRedirect({
          fromPath: `/${edge.node.frontmatter.path}`,
          redirectInBrowser: true,
          toPath: edge.node.fields.slug,
        });
      }
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tag.js`),
        context: {
          tag,
        },
      });
    });

    return true;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.sourceNodes = ({ actions, getNodes, getNode }) => {
  const { createNodeField } = actions;
  const articlesOfIssues = {};
  getNodes()
    .filter(node => node.internal.type === 'MarkdownRemark')
    .forEach(node => {
      if (node.frontmatter.issue) {
        const issueNode = getNodes().find(
          node2 =>
            node2.internal.type === 'MarkdownRemark' &&
            node2.frontmatter.title === node.frontmatter.issue,
        );

        if (issueNode) {
          createNodeField({
            node,
            name: 'issue',
            value: issueNode.id,
          });

          // if it's first time for this issue init empty array for its articles
          if (!(issueNode.id in articlesOfIssues)) {
            articlesOfIssues[issueNode.id] = [];
          }
          // add article to this issue
          articlesOfIssues[issueNode.id].push(node.id);
        }
      }
    });

  Object.entries(articlesOfIssues).forEach(([issueNodeId, articleIds]) => {
    createNodeField({
      node: getNode(issueNodeId),
      name: 'articles',
      value: articleIds,
    });
  });

  const articlesOfAuthors = {};
  // iterate thorugh all markdown nodes to link books to author
  // and build author index
  getNodes()
    .filter(node => node.internal.type === 'MarkdownRemark')
    .forEach(node => {
      if (node.frontmatter.author) {
        const authorNode = getNodes().find(
          node2 =>
            node2.internal.type === 'MarkdownRemark' &&
            node2.frontmatter.title === node.frontmatter.author,
        );

        if (authorNode) {
          createNodeField({
            node,
            name: 'author',
            value: authorNode.id,
          });

          // if it's first time for this author init empty array for his posts
          if (!(authorNode.id in articlesOfAuthors)) {
            articlesOfAuthors[authorNode.id] = [];
          }
          // add book to this author
          articlesOfAuthors[authorNode.id].push(node.id);
        }
      }
    });

  Object.entries(articlesOfAuthors).forEach(([authorNodeId, articleIds]) => {
    createNodeField({
      node: getNode(authorNodeId),
      name: 'articles',
      value: articleIds,
    });
  });
};
