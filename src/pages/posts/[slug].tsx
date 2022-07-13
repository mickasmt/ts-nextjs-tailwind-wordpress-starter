import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";

import { getApolloClient } from "@/lib/apollo-client";
import { PageProps, PostProps } from "@/types";

interface PostDetailsProps {
  page: PageProps;
  post: PostProps;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export default function PostDetails({ post, page }: PostDetailsProps) {
  return (
    <div className="py-10">
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={`Read more about ${post.title} on ${page.title}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="f-container">
        <p className="pb-6">
          <Link href="/">
            <a>&lt; Back to home</a>
          </Link>
        </p>

        <h1 className="text-lg font-semibold pb-5">Title of the page : {post.title}</h1>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </main>

      <footer className="w-full mt-8 text-lg text-center text-gray-700">
        © 2022 By{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mickasmt"
          className="font-semibold border-b border-dotted border-black/50 hover:border-black/100"
        >
          Mickasmt
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

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
      slug: slug,
    },
  });

  const post = data?.data.postBy;

  const page = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      post,
      page,
    },
    revalidate: 60, // In seconds
  };
};

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

  const posts = data?.data.posts.edges.map(({ node }: any) => node);

  return {
    paths: posts.map(({ slug }: any) => {
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: "blocking",
  };
};
