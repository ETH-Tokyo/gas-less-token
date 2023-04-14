import Head from "next/head";
import Image from "next/image";

import Layout from "@/components/layout/baseLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Indez</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageTitle="index">
        <main className="">
          <div className="">
            <p>
              Get started by editing&nbsp;
              <code className="">pages/index.tsx</code>
            </p>
          </div>

          <div className="">
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="">
                Docs <span>-&gt;</span>
              </h2>
              <p className="">
                Find in-depth information about Next.js features and&nbsp;API.
              </p>
            </a>

            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="">
                Learn <span>-&gt;</span>
              </h2>
              <p className="">
                Learn about Next.js in an interactive course with&nbsp;quizzes!
              </p>
            </a>

            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="">
                Templates <span>-&gt;</span>
              </h2>
              <p className="">
                Discover and deploy boilerplate example Next.js&nbsp;projects.
              </p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="">
                Deploy <span>-&gt;</span>
              </h2>
              <p className="">
                Instantly deploy your Next.js site to a shareable URL
                with&nbsp;Vercel.
              </p>
            </a>
          </div>
        </main>
      </Layout>
    </>
  );
}
