import { Alert, Button, TextField } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Layout from "@/components/layout/baseLayout";

type FormInput = {
  token_symbol: string;
  eth_per_token: string;
};

const FactoryForm: FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      token_symbol: "",
      eth_per_token: "",
    },
  });

  const [sendStatus, setSendStatus] = useState<number>(0);

  const PopupAlerts = (props: { status: number }) => {
    if (props.status == 1) {
      return <Alert severity="info">Submitting request, hold on...</Alert>;
    } else if (props.status == 2) {
      return (
        <Alert
          severity="success"
          onClose={() => {
            setSendStatus(0);
            router.reload();
          }}
        >
          Success: Created token paymaster.
        </Alert>
      );
    } else if (props.status == 3) {
      return (
        <Alert
          severity="error"
          onClose={() => {
            setSendStatus(0);
            router.reload();
          }}
        >
          Failed: Could not create token master.
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (!sendStatus) {
      setSendStatus(1);
      // send to endpoint
      fetch("/api/create-tokenpaymaster", {
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

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="token_symbol"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mb: 1 }}
              variant="filled"
              label="Token symbol"
              disabled={!!sendStatus}
              {...register("token_symbol", {
                required: "token symbol is required",
              })}
              error={!!errors.token_symbol}
              helperText={
                errors?.token_symbol ? errors.token_symbol.message : "\u00a0"
              }
              {...field}
            />
          )}
        />

        <Controller
          name="eth_per_token"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mb: 1 }}
              variant="filled"
              label="ETH per token"
              disabled={!!sendStatus}
              {...register("eth_per_token", {
                required: "You must choose a rate (per unit token, in ETH)",
              })}
              error={!!errors.eth_per_token}
              helperText={
                errors?.eth_per_token ? errors.eth_per_token.message : "\u00a0"
              }
              {...field}
            />
          )}
        />

        <PopupAlerts status={sendStatus} />
        <div className="mx-auto">
          <Button
            type="submit"
            variant="outlined"
            color="inherit"
            disabled={!!sendStatus}
          >
            {!!sendStatus
              ? sendStatus == 2
                ? "Submitted"
                : "Submitting"
              : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
};

const CreateTokenPaymaster: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageTitle="createtokenpaymaster">
        <main className="p-32">
          <div className="">
            <FactoryForm />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default CreateTokenPaymaster;
