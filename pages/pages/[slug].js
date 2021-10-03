import Head from "next/head";
import client from "../../client";
import groq from "groq";

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  console.log(pageSlug);

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = groq`
  {
    "posts": *[_type == 'post']{...,
      'categories': categories[]->title,
      'authorName': author->name,
      'authorSlug': author-> slug,

    },
    "home": *[_type == 'homepage'],

    "navbar": *[_type == 'navbar'],

    "footer": *[_type == 'footer'],
    "contact": *[_type == 'contact'],
    "page": *[_type == 'page' && slug.current == "${pageSlug}"],

  }
  `;

  const data = await client.fetch(query);

  return {
    props: {
      posts: data.posts,
      home: data.home[0],
      footer: data.footer,
      navbar: data.navbar,
      contact: data.contact,
      page: data.page,
    },
  };
};

export default function Page({ page }) {
  console.log(page);
  return (
    <div>
      <Head>
        <title>{page[0].title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{page[0].content}</h1>
    </div>
  );
}