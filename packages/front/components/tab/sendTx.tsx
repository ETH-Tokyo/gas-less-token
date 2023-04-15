import { Alert, Button, Link, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import TxCard from "../card/txCard";

import { useAccount } from "@/hooks/useAccount";

type FormInput = {
  secretPhrase: string;
  to: string;
};

const SendTx: FC = () => {
  const router = useRouter();
  const { paymaster } = router.query;
  const { initAccount, sendTx, getLevelAndRate } = useAccount();
  const [txHash, setTxHash] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [level, setLevel] = useState<number>();
  const [rate, setRate] = useState<number>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      secretPhrase: "",
      to: "",
    },
  });

  const [sendStatus, setSendStatus] = useState<number>(0);
  const PopupAlerts = (props: { status: number }) => {
    if (props.status === 2) {
      return <Alert severity="info">Submitting request, hold on...</Alert>;
    } else if (props.status === 3) {
      return (
        <Alert
          severity="success"
          onClose={() => {
            setSendStatus(0);
            router.reload();
          }}
        >
          Success: Sent gas less transaction, transaction is{" "}
          <Link
            href={`https://mumbai.polygonscan.com/tx/${txHash}`}
            target="_blank"
            rel="polygon scan"
          >
            {txHash}
          </Link>
        </Alert>
      );
    } else if (props.status === 4) {
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

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (sendStatus === 0) {
      setSendStatus(2);
      const address = await initAccount(data.secretPhrase);
      const { level, rate } = await getLevelAndRate(
        address,
        paymaster as string,
      );
      setAddress(address);
      setLevel(level);
      setRate(rate);
      setSendStatus(1);
    } else if (sendStatus === 1) {
      setSendStatus(2);
      const txHash = await sendTx(
        data.secretPhrase,
        data.to,
        paymaster as string,
      );
      setTxHash(txHash);
      setSendStatus(3);
    }
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="secretPhrase"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mb: 1 }}
              variant="filled"
              label="Enter a unique ID of your AA account"
              disabled={!!sendStatus}
              {...register("secretPhrase", {
                required: "secret phrase is required",
              })}
              error={!!errors.secretPhrase}
              helperText={
                errors?.secretPhrase ? errors.secretPhrase.message : "\u00a0"
              }
              {...field}
            />
          )}
        />
        <Controller
          name="to"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mb: 1 }}
              variant="filled"
              label="Send message to"
              disabled={!!sendStatus}
              {...register("to", {
                required: "address is required",
              })}
              error={!!errors.to}
              helperText={errors?.to ? errors.to.message : "\u00a0"}
              {...field}
            />
          )}
        />
        {address !== undefined && level !== undefined && rate !== undefined && (
          <TxCard address={address} level={level} rate={rate} />
        )}
        <PopupAlerts status={sendStatus} />
        <div className="mx-auto mt-10">
          <Button
            type="submit"
            size="large"
            variant="outlined"
            color="inherit"
            disabled={sendStatus !== 0 && sendStatus !== 1}
          >
            {sendStatus === 0
              ? "Check"
              : sendStatus === 1
              ? "Send"
              : sendStatus === 2
              ? "Submitting"
              : sendStatus === 3
              ? "Submitted"
              : "-"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendTx;
