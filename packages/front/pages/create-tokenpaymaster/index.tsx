import { Alert, Button, TextField } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAccount } from "wagmi";

import Layout from "@/components/layout/baseLayout";
import TokenPaymasterABI from "@/libs/abi/TokenPaymaster.json";

export type FormInput = {
  seed_uuid: string;
  token_symbol: string;
  eth_per_token: string;
};

const FactoryForm: FC = () => {
  const router = useRouter();
  const { address } = useAccount();

  const deploy = useCallback(async (tokenSymbol: string) => {
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
        tokenSymbol,
        ENTRY_POINT_ADDRESS!,
        100,
        200,
        300,
      );
      await contract.deployed();
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

      /** deploy contract */
      deploy(data.token_symbol)
        .then(() => {
          console.log("デプロイ完了");
          setSendStatus(2);
        })
        .catch((error) => {
          console.log("デプロイ中にエラーが発生しました。", error);
          setSendStatus(3);
          throw new Error(`${error}`);
        });
    }
  };

  return (
    <div className="flex flex-col space-y-24">
      <div className="flex justify-end">
        <ConnectButton />
      </div>
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
        <main className="">
          <div className="">
            <ConnectButton />
            {/* {walletAddress ? <FactoryForm /> : <ConnectButton />} */}
            <FactoryForm />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default CreateTokenPaymaster;
