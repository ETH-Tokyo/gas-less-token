import { Alert, Button, TextField } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import PaymasterCard from "@/components/card/paymasterCard";
import Layout from "@/components/layout/baseLayout";
import { Header } from "@/components/template/header";
import TokenPaymasterABI from "@/libs/abi/TokenPaymaster.json";

export type FormInput = {
  seed_uuid: string;
  token_symbol: string;
  eth_per_token_level_1: string;
  eth_per_token_level_2: string;
  eth_per_token_level_3: string;
};

const FactoryForm: FC = () => {
  const router = useRouter();
  const [paymaster, setPaymaster] = useState<string>();

  const deploy = useCallback(async (data: FormInput) => {
    const {
      token_symbol,
      eth_per_token_level_1,
      eth_per_token_level_2,
      eth_per_token_level_3,
    } = data;
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();
      const contractABI = TokenPaymasterABI;
      const factory = new ethers.ContractFactory(
        contractABI.abi,
        contractABI.bytecode,
        signer,
      );

      const ENTRY_POINT_ADDRESS = process.env.NEXT_PUBLIC_ENTRY_POINT_ADDRESS;
      const ACCOUNT_FACTORY_ADDRESS =
        process.env.NEXT_PUBLIC_SIMPLE_ACCOUNT_FACTORY_ADDRESS;

      const contract = await factory.deploy(
        ACCOUNT_FACTORY_ADDRESS!,
        token_symbol,
        ENTRY_POINT_ADDRESS!,
        Number(eth_per_token_level_1),
        Number(eth_per_token_level_2),
        Number(eth_per_token_level_3),
      );
      await contract.deployed();
      setPaymaster(contract.address);
      console.log(
        "コントラクトがデプロイされました。アドレス：",
        contract.address,
      );
    } else {
      console.log("メタマスクに接続してください");
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      token_symbol: "",
      eth_per_token_level_1: "",
      eth_per_token_level_2: "",
      eth_per_token_level_3: "",
    },
  });

  const [sendStatus, setSendStatus] = useState<number>(0);

  const PopupAlerts = (props: { status: number }) => {
    if (props.status === 1) {
      return <Alert severity="info">Submitting request, hold on...</Alert>;
    } else if (props.status === 2) {
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
    } else if (props.status === 3) {
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

      /** deploy contract */
      deploy(data)
        .then(() => setSendStatus(2))
        .catch((error) => {
          console.log("デプロイ中にエラーが発生しました。", error);
          setSendStatus(3);
          throw new Error(`${error}`);
        });
    }
  };

  return (
    <div className="flex flex-col space-y-12">
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
          name="eth_per_token_level_1"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mb: 1 }}
              variant="filled"
              label="ETH per token for level 1"
              disabled={!!sendStatus}
              {...register("eth_per_token_level_1", {
                required: "You must choose a rate (per unit token, in ETH)",
              })}
              error={!!errors.eth_per_token_level_1}
              helperText={
                errors?.eth_per_token_level_1
                  ? errors.eth_per_token_level_1.message
                  : "\u00a0"
              }
              {...field}
            />
          )}
        />
        <Controller
          name="eth_per_token_level_2"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mb: 1 }}
              variant="filled"
              label="ETH per token for level 2"
              disabled={!!sendStatus}
              {...register("eth_per_token_level_2", {
                required: "You must choose a rate (per unit token, in ETH)",
              })}
              error={!!errors.eth_per_token_level_2}
              helperText={
                errors?.eth_per_token_level_2
                  ? errors.eth_per_token_level_2.message
                  : "\u00a0"
              }
              {...field}
            />
          )}
        />
        <Controller
          name="eth_per_token_level_3"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mb: 1 }}
              variant="filled"
              label="ETH per token for level 3"
              disabled={!!sendStatus}
              {...register("eth_per_token_level_3", {
                required: "You must choose a rate (per unit token, in ETH)",
              })}
              error={!!errors.eth_per_token_level_3}
              helperText={
                errors?.eth_per_token_level_3
                  ? errors.eth_per_token_level_3.message
                  : "\u00a0"
              }
              {...field}
            />
          )}
        />
        <PopupAlerts status={sendStatus} />
        <div className="mx-auto mt-3">
          <Button
            size="large"
            type="submit"
            variant="outlined"
            color="inherit"
            disabled={!!sendStatus}
          >
            {!!sendStatus
              ? sendStatus === 2
                ? "Submitted"
                : "Submitting"
              : "Send"}
          </Button>
        </div>
      </form>

      {paymaster && <PaymasterCard address={paymaster} />}
    </div>
  );
};

const OwnerPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Owner Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageTitle="owner">
        <Header />
        <main className="">
          <div className="" style={{ width: "80%", margin: "0 auto" }}>
            <FactoryForm />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default OwnerPage;
