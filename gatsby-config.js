module.exports = {
  mapping: {
    'MarkdownRemark.fields.author': 'MarkdownRemark',
    'MarkdownRemark.fields.issue': 'MarkdownRemark',
    'MarkdownRemark.fields.articles': 'MarkdownRemark',
  },
  siteMetadata: {
    title: 'Newest York',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // {
          //   resolve: `gatsby-remark-relative-images`,
          //   options: {
          //     name: 'images', // Must match the source name ^
          //   },
          // },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 650,
              showCaptions: true,
              linkImagesToOriginal: false,
              wrapperStyle: 'border-radius: 35px',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
  ],
};
