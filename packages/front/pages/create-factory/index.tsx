import {
  Alert,
  Button,
  Checkbox,
  createTheme,
  FormControlLabel,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Layout from "@/components/layout/baseLayout";

type FormInput = {
  paymaster_name: string;
  token_symbol: string;
  eth_per_token: string;
};

const FactoryForm: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      paymaster_name: "",
      token_symbol: "",
      eth_per_token: "",
    },
  });

  const [sendStatus, setSendStatus] = useState<number>(0);
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (!sendStatus) {
      setSendStatus(1);
      // send to endpoint
      fetch("/api/create-factory", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.status === 201) {
          setSendStatus(2);
        } else if (res.status >= 400) {
          // unsuccessful inquiries trigger error message
          setSendStatus(3);
          throw new Error(`${res.status}, ${res.statusText}`);
        }
      });
    }
  };

  return <></>;
};

const CreateFactory: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageTitle="createfactory">
        <main className="">
          <div className=""></div>
        </main>
      </Layout>
    </>
  );
};

export default CreateFactory;
