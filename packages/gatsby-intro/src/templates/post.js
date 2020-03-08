import React from 'react';

import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import Layout from '../components/layout';
import usePosts from '../hooks/use-posts';

import ReadLink from '../components/read-link';

const PostTemplate = ({ pageContext }) => {
  const posts = usePosts();
  const post = posts.find(post => (post.slug = pageContext.slug));
  return (
    <Layout>
      <h1>{post.title}</h1>
      <p
        css={css`
          font-size: 0.75rem;
        `}
      >
        Posted by {post.author}
      </p>
      <p>{post.excerpt}</p>
      <ReadLink to="/">&larr; back to all posts</ReadLink>
    </Layout>
  );
};

export default PostTemplate;
