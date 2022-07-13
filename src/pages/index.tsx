import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";

import { getApolloClient } from "@/lib/apollo-client";
import { PageProps, PostProps } from "@/types";

interface HomeProps {
  page: PageProps;
  posts: PostProps[];
}

export default function Home({ page, posts }: HomeProps) {
  const { title, description } = page;

  return (
    <div className="py-10">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="f-container">
        <div className="flex flex-col space-y-4 items-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-xl">{description}</p>
        </div>

        <ul className="mt-10 space-y-5">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <li key={post.slug} className="card">
                  <Link href={post.path}>
                    <a className="hover:underline">
                      <h3
                        className="text-lg font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: post.title,
                        }}
                      />
                    </a>
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt,
                    }}
                  />
                </li>
              );
            })}

          {!posts ||
            (posts.length === 0 && (
              <li>
                <p>Oops, no posts found!</p>
              </li>
            ))}
        </ul>
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

  const posts = data?.data.posts.edges
    .map(({ node }: any) => node)
    .map((post: PostProps) => {
      return {
        ...post,
        path: `/posts/${post.slug}`,
      };
    });

  const page = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      page,
      posts,
    },
    revalidate: 60, // In seconds
  };
};
