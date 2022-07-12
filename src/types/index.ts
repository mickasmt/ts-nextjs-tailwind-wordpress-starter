type PageProps = {
  title: string;
  description: string;
}

type PostProps = {
  title: string;
  slug: string;
  path: string;
  excerpt: string;
  content: string;
}

export type {
  PageProps,
  PostProps
};