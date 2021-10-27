import axios from 'axios';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

import { IPost } from 'backend-types';
import { config } from 'config';
import { HTML } from 'components/Html';
import { IPageSettings } from 'backend-types/page-settings';
import { Layout } from 'components/Layout';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

const Home: NextPage<Awaited<ReturnType<typeof getServerSideProps>>['props']> = ({
  title,
  html_content,
  meta_description,
  slug,
  header_image,
  publish_date,
  lead,
}) => {
  return (
    <>
      <NextSeo
        title={`${title} | ${config.siteName}`}
        description="This example uses more of the available config options."
        canonical={`${config.baseUrl}${slug}`}
        openGraph={{
          url: `${config.baseUrl}${slug}`,
          title: title,
          description: meta_description,
          images: header_image
            ? [
                {
                  url: `${config.baseUrl}${header_image.formats['medium'].url}`,
                  width: header_image.formats['medium'].width,
                  height: header_image.formats['medium'].height,
                  alt: header_image.alternativeText,
                  type: header_image.formats['medium'].mime,
                },
              ]
            : [],
        }}
      />
      <main role="article">
        {header_image && (
          <Image
            loader={({ src }) => src}
            src={header_image.url}
            width={header_image.width}
            height={header_image.height}
            alt={header_image.alternativeText}
          />
        )}
        <h1>{title}</h1>
        <time>{publish_date}</time>
        {lead && <div>{lead}</div>}
        <HTML html={html_content} />
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: post } = await axios.get<IPost>(`http://localhost:1337/posts/${context?.params?.slug}`);
  return { props: { ...post } };
}
