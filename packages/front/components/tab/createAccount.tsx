import { Alert, Button, Link, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useAccount } from "@/hooks/useAccount";

type FormInput = {
  seed_uuid: string;
};

const CreateAccount: FC = () => {
  const router = useRouter();
  const { initAccount } = useAccount();
  const [address, setAddress] = useState<string>("");

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
          Success: Your account address is{" "}
          <Link
            href={`https://mumbai.polygonscan.com/address/${address}`}
            target="_blank"
            rel="polygon scan"
          >
            {address}
          </Link>
          .
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
          Failed: Could not create account address.
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!sendStatus) {
      setSendStatus(1);

      const address = await initAccount(data.seed_uuid);
      setAddress(address);
      setSendStatus(2);
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
              label="Enter a unique ID to generate your AA account"
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
              ? sendStatus === 2
                ? "Submitted"
                : "Submitting"
              : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
