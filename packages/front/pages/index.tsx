import Head from "next/head";

import Layout from "@/components/layout/baseLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Indez</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageTitle="index" showHeader={true}>
        <main>{/* <MyTabs /> */}</main>
      </Layout>
    </>
  );
}
