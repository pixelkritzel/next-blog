import axios from 'axios';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { IPost } from 'backend-types';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

const Home: NextPage<Awaited<ReturnType<typeof getServerSideProps>>['props']> = ({ title, content }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: post } = await axios.get<IPost>(`http://localhost:1337/posts/${context.params.slug}`);
  return { props: { ...post } };
}
