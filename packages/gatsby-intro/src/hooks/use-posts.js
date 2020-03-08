import { graphql, useStaticQuery } from 'gatsby';

const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            title
            slug
            author
          }
          excerpt
        }
      }
    }
  `);

  return data.allMdx.nodes.map(post => {
    const { title, author, slug } = post.frontmatter;
    return {
      title,
      author,
      slug,
      excerpt: post.excerpt,
    };
  });
};

export default usePosts;
