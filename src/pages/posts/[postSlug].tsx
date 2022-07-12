import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { getApolloClient } from '@/lib/apollo-client'
import { PageProps, PostProps } from "@/types"

interface PostDetailsProps {
  page: PageProps;
  post: PostProps;
}

interface IParams extends ParsedUrlQuery {
  postSlug: string
}

export default function PostDetails({ post, page } : PostDetailsProps) {
  return (
    <div className="">
      <Head>
        <title>{ post.title }</title>
        <meta name="description" content={`Read more about ${post.title} on ${page.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="">
          { post.title }
        </h1>

        <div className="">
          <div className="" dangerouslySetInnerHTML={{
            __html: post.content
          }} />
        </div>

        <p className="">
          <Link href="/">
            <a>
              &lt; Back to home
            </a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { postSlug } = context.params as IParams;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query PostBySlug($slug: String!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          id
          content
          title
          slug
        }
      }
    `,
    variables: {
      slug: postSlug
    }
  });

  const post = data?.data.postBy;

  const page = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      post,
      page
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        posts(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges.map(({ node } : any) => node);

  return {
    paths: posts.map(({ slug } : any) => {
      return {
        params: {
          postSlug: slug
        }
      }
    }),
    fallback: false
  }
}