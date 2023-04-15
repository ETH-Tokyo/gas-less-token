import { AlchemyProvider } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import {
  getGasFee,
  getHttpRpcClient,
  getSimpleAccount,
  getVerifyingPaymaster,
  printOp,
} from "protocol/index";

import TokenPaymasterArtifact from "@/libs/abi/TokenPaymaster.json";

type Account = {
  initAccount: (secretPhrase: string) => Promise<string>;
  sendTx: (
    secretPhrase: string,
    to: string,
    paymaster: string,
  ) => Promise<string>;
  getLevelAndRate: (
    account: string,
    paymaster: string,
  ) => Promise<{ level: number; rate: number }>;
};

const useAccount = (): Account => {
  const RPC_ENDPOINT = `https://node.stackup.sh/v1/rpc/${process.env
    .NEXT_PUBLIC_STACK_UP_KEY!}`;

  const initAccount = async (secretPhrase: string): Promise<string> => {
    const privateKey = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(secretPhrase),
    );
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    const accountAPI = getSimpleAccount(
      provider,
      privateKey,
      process.env.NEXT_PUBLIC_ENTRY_POINT_ADDRESS!,
      process.env.NEXT_PUBLIC_SIMPLE_ACCOUNT_FACTORY_ADDRESS!,
    );
    return await accountAPI.getCounterFactualAddress();
  };

  const sendTx = async (
    secretPhrase: string,
    to: string,
    paymaster: string,
  ): Promise<string> => {
    const privateKey = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(secretPhrase),
    );
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    const paymasterAPI = getVerifyingPaymaster(paymaster);
    const accountAPI = getSimpleAccount(
      provider,
      privateKey!,
      process.env.NEXT_PUBLIC_ENTRY_POINT_ADDRESS!,
      process.env.NEXT_PUBLIC_SIMPLE_ACCOUNT_FACTORY_ADDRESS!,
      paymasterAPI,
    );

    const target = ethers.utils.getAddress(to);
    const op = await accountAPI.createSignedUserOp({
      target,
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

  const getLevelAndRate = async (
    account: string,
    paymaster: string,
  ): Promise<{ level: number; rate: number }> => {
    const provider = new AlchemyProvider(
      {
        chainId: 80001,
        name: "Polygon Mumbai Testnet",
      },
      process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    );
    const tokenPaymasterContract = new Contract(
      paymaster,
      TokenPaymasterArtifact.abi,
      provider,
    );
    const res = await tokenPaymasterContract.getLevelAndRate(account);
    console.log(res);

    return { level: res.level.toNumber(), rate: res.rate.toNumber() };
  };

  return {
    initAccount,
    sendTx,
    getLevelAndRate,
  };
};

export { useAccount };
