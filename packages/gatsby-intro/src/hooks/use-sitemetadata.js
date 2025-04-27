import { graphql, useStaticQuery } from 'gatsby';

const useStaticMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useStaticMetadata;
