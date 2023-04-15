import { Box, Tab, Tabs } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import Layout from "@/components/layout/baseLayout";
import CreateAccount from "@/components/tab/createAccount";
import SendTx from "@/components/tab/sendTx";
import { Header } from "@/components/template/header";

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const UserPage: NextPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Head>
        <title>User Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageTitle="user">
        <Header />
        <div className="">
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="Create Account" />
            <Tab label="Send Tx" />
          </Tabs>
          <div className="pt-8">
            <TabPanel value={tabIndex} index={0}>
              <CreateAccount />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <SendTx />
            </TabPanel>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserPage;
