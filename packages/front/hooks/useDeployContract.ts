import { ethers } from "ethers";
import { useAccount } from "wagmi";

import { FormInput } from "@/pages/create-tokenpaymaster";

const useDeployContract = async ({ seed_uuid, token_symbol }: FormInput) => {
  const { address: walletAddress } = useAccount();
  const { ethereum } = window;
  const provider = new ethers.providers.JsonRpcProvider(ethereum as any);
  const signer = provider.getSigner();
  console.log(signer);
  // TODO: abi
  const contractABI = "";
  // const factory = new ethers.ContractFactory(contractABI.abi, contractABI.bytecode, signer)
  // const contract = await factory.deploy();
  // await contract.deployed(token_symbol);
  // console.log("コントラクトがデプロイされました。アドレス：", contract.address);
  // return contract;
};

export { useDeployContract };
