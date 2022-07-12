import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client';
import { GetStaticProps } from 'next'

import { getApolloClient } from '@/lib/apollo-client';
import { PageProps, PostProps } from "@/types"

interface HomeProps {
  page: PageProps;
  posts: PostProps[];
}

export default function Home({ page, posts } : HomeProps) {
  const { title, description } = page;

  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">{title}</h1>

        <p className="description">{ description }</p>

        <ul className="grid">
          {posts && posts.length > 0 && posts.map(post => {
            return (
              <li key={post.slug} className="card">
                <Link href={post.path}>
                  <a>
                    <h3 dangerouslySetInnerHTML={{
                      __html: post.title
                    }} />
                  </a>
                </Link>
                <div dangerouslySetInnerHTML={{
                  __html: post.excerpt
                }} />
              </li>
            );
          })}

          {!posts || posts.length === 0 && (
            <li>
              <p>
                Oops, no posts found!
              </p>
            </li>
          )}
        </ul>
      </main>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 10000) {
          edges {
            node {
              id
              excerpt
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges.map(({ node }: any) => node).map((post : PostProps) => {
    return {
      ...post,
      path: `/posts/${post.slug}`
    }
  });

  const page = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      page,
      posts
    }
  }
}
