import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { config } from 'config';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { IPageSettings } from 'backend-types/page-settings';
import { Layout } from 'components/Layout';

function MyApp(appProps: AppProps & { props: IPageSettings }) {
  const { Component, pageProps, props } = appProps;
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        {/* TODO: RSS feed */}
      </Head>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: config.locale,
          url: config.baseUrl,
          site_name: config.siteName,
        }}
      />

      <Layout {...props}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async function getInitialProps(context: GetServerSidePropsContext) {
  let data = {} as IPageSettings;
  try {
    const axiosResponse = await axios.get<IPageSettings>(`http://localhost:1337/page-settings`);
    data = axiosResponse.data;
  } catch (e) {
    console.log(e);
  }
  return { props: { ...data } };
};

export default MyApp;
