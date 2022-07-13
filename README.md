<div align="center">
  <h1>🔋 ts-nextjs-tailwind-wordpress-starter</h1>
  <p>Next.js + Tailwind CSS + TypeScript + Wordpress (config & types) starter</p>
  <p>Made by <a href="https://github.com/mickasmt">Mickasmt</a></p>

</div>

## Features

This repository is 🔋 battery packed with:

- ⚡️ Next.js 12
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3
- ⏳  Incremental Static Regeneration (ISR)
- 📈 Absolute Import and Path Alias — Import components using `@/` prefix


👀 More features details coming soon !

## Requirements

* [WordPress](https://wordpress.org/)
* [WPGraphQL](https://www.wpgraphql.com/)

You must have a wordpress project to follow the next steps.

## Getting Started

### 1. Clone this template using one of the two ways:

1. Use this repository as template

   **Disclosure:** by using this repository as a template, there will be an attribution on your repository.

   I'll appreciate if you do, so this template can be known by others too 😄

   ![Use as template](https://user-images.githubusercontent.com/55318172/129183039-1a61e68d-dd90-4548-9489-7b3ccbb35810.png)

2. Using `create-next-app`

   ```bash
   npx create-next-app -e https://github.com/mickasmt/ts-nextjs-tailwind-wordpress-starter project-name
   # or
   yarn create next-app -e https://github.com/mickasmt/ts-nextjs-tailwind-wordpress-starter project-name
   ```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Add an `.env.local` file to the root with the following:

```
WORDPRESS_GRAPHQL_ENDPOINT="http://yourhost.com/graphql"
```
You can copy/paste (or rename) the `.env.local.example` file.
### 4. Run the development server

You can start the server using this command:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/index.tsx`.

### 5. Enjoy !
