import axios from 'axios';
import type { GetServerSidePropsContext, NextPage } from 'next';

import { HTML } from 'components/Html';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

const Home: NextPage<Awaited<ReturnType<typeof getServerSideProps>>['props']> = ({ title, html_content }) => {
  return (
    <>
      <main>
        <h1>{title}</h1>
        <HTML html={html_content} />
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: post } = await axios.get<{ title: string; html_content: string }>(
    `http://localhost:1337/pages/${context?.params?.slug}`
  );
  return { props: { ...post } };
}
