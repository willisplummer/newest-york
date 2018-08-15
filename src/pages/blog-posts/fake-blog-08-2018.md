---
templateKey: blog-post
author: Newest York
title: Fake Blog
date: 2018-08-15T03:14:21.040Z
---
I just took a look at ReasonML's site, specifically the GuideSidebar. It looks like the pattern is to define the desired query as a fragment which is then referenced by the root node:



// in src/components/MyComponent.js

const MyComponent = () => <div/>



export default MyComponent



export const myQuery = graphql`

  fragment posts on RootQueryType {

\    allFile {

\    edges {

\    node {

\    relativePath

\    prettySize

\    extension

\    birthTime(fromNow: true)

\    }

\    }

\    }

  }

`



// in src/pages/index.js

const Homepage = ({ data }) => <div/>



export default Homepage



export const query = graphql`

  query HomepageQuery {

\    ...posts

  }

`

While I sort of understand how that is working, it is not quite the same as supporting GraphQL on any component. To elaborate, I'm trying to do something like:



// in src/provider/PostsProvider.js

const PostsProvider = ({ children, data }) => {

  const posts = data.allMarkdownRemark.edges.map((edge) => edge.node)

  return children(posts)

}



export default PostsProvider



export const query = graphql`

  query PostsQuery {

\    allMarkdownRemark {

\    totalCount

\    edges {

\    node {

\    id

\    frontmatter {

\    title

\    date

\    }

\    excerpt

\    }

\    }

\    }

  }

`



// in src/pages/index.js

import PostsProvider from '../providers/PostsProvider'



const Homepage = (props) => (

  <div>

\    <PostsProvider>

\    {(posts) => posts.map(({ title })=> (

\    <div>{title}</div>

\    ))}

\    </PostsProvider>

  </div>

)

Is such a pattern not supported here? If not, is that due to how Gatsby is meant to be used or is it something specific to GraphQL?
