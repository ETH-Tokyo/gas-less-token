import { ethers } from "ethers";
import {
  getGasFee,
  getHttpRpcClient,
  getSimpleAccount,
  getVerifyingPaymaster,
  printOp,
} from "protocol/index";
import { useState } from "react";

type Account = {
  privateKey?: string;
  publicAddress?: string;
  initAccount?: (secretPhrase: string) => void;
  sendEth?: (to: string, amount: number, paymaster: string) => Promise<string>;
};

const useAccount = (secretPhrase: string): Account => {
  const RPC_ENDPOINT = `https://node.stackup.sh/v1/rpc/${process.env
    .NEXT_PUBLIC_STACK_UP_KEY!}`;

  const [privateKey, setPrivateKey] = useState<string>();
  const [publicAddress, setPublicAddress] = useState<string>();

  const initAccount = async () => {
    const _privateKey = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(secretPhrase),
    );

    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    const accountAPI = getSimpleAccount(
      provider,
      _privateKey,
      process.env.NEXT_PUBLIC_ENTRY_POINT_ADDRESS!,
      process.env.NEXT_PUBLIC_SIMPLE_ACCOUNT_FACTORY_ADDRESS!,
    );
    const _publicAddress = await accountAPI.getCounterFactualAddress();

    setPrivateKey(_privateKey);
    setPublicAddress(_publicAddress);
  };

  const sendEth = async (
    to: string,
    amount: number,
    paymaster: string,
  ): Promise<string> => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    const paymasterAPI = getVerifyingPaymaster(
      paymaster,
      process.env.NEXT_PUBLIC_ENTRY_POINT_ADDRESS!,
    );
    const accountAPI = getSimpleAccount(
      provider,
      privateKey!,
      process.env.NEXT_PUBLIC_ENTRY_POINT_ADDRESS!,
      process.env.NEXT_PUBLIC_SIMPLE_ACCOUNT_FACTORY_ADDRESS!,
      paymasterAPI,
    );

    const target = ethers.utils.getAddress(to);
    const value = ethers.utils.parseEther(amount.toString());
    const op = await accountAPI.createSignedUserOp({
      target,
      value,
      data: "0x",
      ...(await getGasFee(provider)),
    });
    console.log(`Signed UserOperation: ${await printOp(op)}`);

    const client = await getHttpRpcClient(
      provider,
      RPC_ENDPOINT,
      process.env.NEXT_PUBLIC_ENTRY_POINT_ADDRESS!,
    );
    const uoHash = await client.sendUserOpToBundler(op);
    console.log(`UserOpHash: ${uoHash}`);

    console.log("Waiting for transaction...");
    const txHash = await accountAPI.getUserOpReceipt(uoHash);
    if (txHash === null) {
      throw new Error("Transaction failed");
    } else {
      console.log(`Transaction hash: ${txHash}`);
      return txHash;
    }
  };

  return {
    privateKey,
    publicAddress,
    initAccount,
    sendEth,
  };
};

export { useAccount };
