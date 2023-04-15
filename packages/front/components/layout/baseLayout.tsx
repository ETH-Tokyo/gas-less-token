import Head from "next/head";
import { FC, ReactNode } from "react";

import { Footer } from "../template/footer";

type Props = {
  pageTitle: string;
  children: ReactNode;
  showHeader?: boolean;
};

export const Layout: FC<Props> = ({ pageTitle, children }) => {
  const siteTitle = "GassLess Token";
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
        <Footer />
      </main>
    </>
  );
};

export default Layout;
