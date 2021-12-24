import Head from "next/head";
import Link from "next/link";
import client from "../../client";
import groq from "groq";

export const getServerSideProps = async (pageContext) => {
  const privatefolderSlug = pageContext.query.slug;
  if (!privatefolderSlug) {
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

    "navbar": *[_type == 'navbar'] | order(order asc),

    "footer": *[_type == 'footer'] | order(order asc),
    "contact": *[_type == 'contact'],
    "privatefolder": *[_type == 'privatefolder' && slug.current == "${privatefolderSlug}"]{...,
        "relatedDocuments": *[_type=='privatedocument' && references(^._id)]{ _id,
          title,
          "URL": document{asset->{path,url} }
      },

      }
   
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
      privatefolder: data.privatefolder,
    },
  };
};

export default function Folder({ privatefolder }) {
  console.log(privatefolder);
  if (privatefolder[0].relatedDocuments == 0) {
    return (
      <div className="py-16 xl:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <Head>
          <title>Folder | RM of Willowdale No. 153</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <p className="text-lg font-medium text-gray-900">
          No documents found. Please add documents to this folder
        </p>
      </div>
    );
  }
  return (
    <div className="py-16 xl:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <Head>
        <title>Folder | RM of Willowdale No. 153</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {privatefolder[0].relatedDocuments.map((item) => (
            <div
              key={item.title}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-file-multimedia-kiranshastry-lineal-kiranshastry-2.png" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={item.URL.asset.url}>
                  <a className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-lg font-medium text-gray-900">
                      <h1>{item.title}</h1>
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
