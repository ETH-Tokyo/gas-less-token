import { SimpleAccountAPI } from "@account-abstraction/sdk";
import { ethers } from "ethers";
import { getSimpleAccount } from "protocol/index";
import { useState } from "react";

type Account = {
  privateKey?: string;
  publicAddress?: string;
  simpleAccountApi?: SimpleAccountAPI;
  initAccount?: (secretPhrase: string) => void;
};

const useAccount = (secretPhrase: string): Account => {
  const [privateKey, setPrivateKey] = useState<string>();
  const [publicAddress, setPublicAddress] = useState<string>();
  const [simpleAccountApi, setSimpleAccountApi] = useState<SimpleAccountAPI>();

  const initAccount = async () => {
    const _privateKey = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(secretPhrase),
    );

    const provider = new ethers.providers.JsonRpcProvider(
      `https://node.stackup.sh/v1/rpc/${process.env.NEXT_PUBLIC_STACK_UP_KEY!}`,
    );
    const accountAPI = getSimpleAccount(
      provider,
      _privateKey,
      process.env.NEXT_PUBLIC_ENTRY_POINT_ADDRESS!,
      process.env.NEXT_PUBLIC_SIMPLE_ACCOUNT_FACTORY_ADDRESS!,
    );
    const _publicAddress = await accountAPI.getCounterFactualAddress();

    setPrivateKey(_privateKey);
    setPublicAddress(_publicAddress);
    setSimpleAccountApi(accountAPI);
  };

  return {
    privateKey,
    publicAddress,
    simpleAccountApi,
    initAccount,
  };
};

export { useAccount };
