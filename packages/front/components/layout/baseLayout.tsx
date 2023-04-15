import Head from "next/head";
import { FC, ReactNode } from "react";

type Props = {
  pageTitle: string;
  children: ReactNode;
  showHeader?: boolean;
};

export const Layout: FC<Props> = ({ pageTitle, children }) => {
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
        <div id="body" className="p-16">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
