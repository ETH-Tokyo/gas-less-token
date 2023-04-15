import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Layout from "@/components/layout/baseLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Indez</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageTitle="index" showHeader={true}>
        <main style={{ height: "100vh" }}>
          <div className={`fixed top-0 left-0 w-full h-screen z-[-1]`}>
            <Image src="/images/bg.jpg" alt="background image" fill={true} />
          </div>
          <div className="flex flex-col justify-center items-center mt-44">
            <Link href="/owner">
              <Image
                src="/logo/gasslesstoken.png"
                alt="gasslesstoken"
                width={700}
                height={100}
              />
            </Link>
            <Link href="https://github.com">Source code</Link>
          </div>
        </main>
      </Layout>
    </>
  );
}
