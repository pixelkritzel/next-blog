import axios from 'axios';
import type { NextPage, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { IPost } from 'backend-types';
import React from 'react';
import Link from 'next/link';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

const Home: NextPage<Awaited<ReturnType<typeof getServerSideProps>>['props']> = ({ posts }) => {
  return (
    <main>
      <ul>
        {posts.map(({ title, slug, publish_date, lead, header_image }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              <a>
                <h3>{title}</h3>
                <time>{publish_date}</time>
                {header_image && (
                  <Image
                    loader={({ src }) => src}
                    src={header_image.url}
                    width={header_image.width}
                    height={header_image.height}
                    alt={header_image.alternativeText}
                  />
                )}
                {lead && <div>{lead}</div>}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: posts } = await axios.get<IPost[]>('http://localhost:1337/posts?_sort=publish_date:DESC');
  return { props: { posts } };
}
