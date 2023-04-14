import { Inter } from "next/font/google";

import Layout from "@/components/layout/baseLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Layout pageTitle="Create Paymaster">
        <div className="py-4 flex">
          <h1 className="text-7xl text-center">Create Paymaster</h1>
        </div>
      </Layout>
    </>
  );
}
