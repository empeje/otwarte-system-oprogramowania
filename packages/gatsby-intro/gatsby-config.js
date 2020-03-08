module.exports = {
  siteMetadata: {
    title: 'Frontend Masters Gatsby Workshop',
    description:
      'The site we built together during the full-day Frontend Masters Gatsby workshop',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js'),
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: 'posts',
      },
    },
  ],
};
