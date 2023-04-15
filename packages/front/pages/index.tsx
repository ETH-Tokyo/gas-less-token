import { Container, Tab, Tabs } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import CreateAccount from "./create-account";
import CreateTokenPaymaster from "./create-tokenpaymaster";

import Layout from "@/components/layout/baseLayout";

// import SendTx from "./send-tx";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`tabpanel-${index}`}
//       aria-labelledby={`tab-${index}`}
//       {...other}
//     >
//       {value === index && <div>{children}</div>}
//     </div>
//   );
// }

// function MyTabs() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Container maxWidth="md">
//       <Tabs value={value} onChange={handleChange}>
//         <Tab label="create token paymaster" id="tab-0" />
//         <Tab label="create account" id="tab-1" />
//         <Tab label="send tx" id="tab-2" />
//       </Tabs>
//       <TabPanel value={value} index={0}>
//         <CreateTokenPaymaster />
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <CreateAccount />
//       {/*
//         </TabPanel>
//         <TabPanel value={value} index={2}>
//         <SendTx />
//       // */}
//       </TabPanel>
//     </Container>
//   );
// }

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
