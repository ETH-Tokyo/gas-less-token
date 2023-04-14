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
  seed_uuid: string;
};

const UserForm: FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      seed_uuid: "",
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
      fetch("/api/send-tx", {
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
          name="seed_uuid"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mb: 1 }}
              variant="filled"
              label="貴方しか思いつかない文字列を記入してください。貴方の固有識別子となります"
              disabled={!!sendStatus}
              {...register("seed_uuid", {
                required: "token symbol is required",
              })}
              error={!!errors.seed_uuid}
              helperText={
                errors?.seed_uuid ? errors.seed_uuid.message : "\u00a0"
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
const CreateContractWallet: NextPage = () => {
  return (
    <>
      <Head>
        <title>Send Gasless tx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageTitle="sendtx">
        <main className="">
          <div className="">
            <UserForm />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default CreateContractWallet;
