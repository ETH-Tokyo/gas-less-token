import Head from "next/head";
import Link from "next/link";
import { FC, ReactNode } from "react";

import { Header } from "./templates/Header";

type Props = {
  pageTitle: string;
  children: ReactNode;
  showHeader?: boolean;
};

export const Layout: FC<Props> = ({
  pageTitle,
  children,
  showHeader = true,
}) => {
  const siteTitle = "UNCHAIN";
  const subTitle = "gm, world";

  return (
    <>
      <Head>
        <title>
          {pageTitle
            ? `${pageTitle} | ${siteTitle}`
            : `${siteTitle} | ${subTitle}`}
        </title>
      </Head>

      <main>
        <Header />
        {showHeader && (
          <div id="header" className="flex px-32 py-16 space-x-24">
            <Link href="/create-tokenpaymaster">
              <h3>(owner) create token paymaster</h3>
            </Link>
            <Link href="/create-account">
              <h3>(user) create account</h3>
            </Link>
            <Link href="/send-tx">
              <h3>(user) send tx</h3>
            </Link>
          </div>
        )}
        <div id="body" className="p-32">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
