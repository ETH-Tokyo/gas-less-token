# account abstraction

this is a PoC repository for account abstraction

## contracts

| contract                       | address                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| EntryPoint(stack up)           | [0x0576a174D229E3cFA37253523E645A78A0C91B57](https://mumbai.polygonscan.com/address/0x0576a174D229E3cFA37253523E645A78A0C91B57#code) |
| SimpleAccountFactory(stack up) | [0x71D63edCdA95C61D6235552b5Bc74E32d8e2527B](https://mumbai.polygonscan.com/address/0x71D63edCdA95C61D6235552b5Bc74E32d8e2527B#code) |

## send transaction

1. setup config.json
   1. `yarn run init`
   2. set your stackup api key to `<API-KEY>`
2. generate your wallet account address
   1. `yarn run simpleAccount address`
   2. when the transaction is sent, contract account is deployed to this address.
3. deposit native token to your wallet account
   1. recommend to use [mumbai faucet](https://faucet.polygon.technology/) or metamask
4. deposit erc20 token to your wallet account
   1. recommend to use [mumbai faucet](https://faucet.polygon.technology/)
5. transfer native token from wallet account to another account
   1. `yarn run simpleAccount transfer --to <to-address> --amount <amount>`
   2. `yarn run simpleAccount transfer --to 0xf4aAA4b38a0E749415E37638879BeDfe47645a77 --amount 0.01`
6. transfer erc20 token from wallet account to another account
   1. `yarn run simpleAccount erc20Transfer --token <erc20-contract-address> --to <to-address> --amount <amount>`
   2. `yarn run simpleAccount erc20Transfer --token 0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1 --to 0xf4aAA4b38a0E749415E37638879BeDfe47645a77 --amount 0.01`

## send transaction with paymaster

1. set .env
   1. paramas are `ENTRY_POINT_ADDRESS`, `ACCOUNT_FACTORY_ADDRESS` and `ACCOUNT_ADDRESS`
2. deploy paymaster
   1. `yarn paymaster:deploy`
   2. set address to `PAYMASTER_ADDRESS`
3. setup paymaster included following tasks
   1. `yarn paymaster:setup`
   2. stake ETH to EntryPoint
   3. deposit ETH to EntryPoint
   4. mint ERC20 to Account for using ERC20 as gas
4. transfer native token from wallet account to another account with paymaster
   1. `yarn run simpleAccount transfer --to <to-address> --amount <amount> --withPaymaster`
   2. `yarn run simpleAccount transfer --to 0xf4aAA4b38a0E749415E37638879BeDfe47645a77 --amount 0.01 --withPaymaster`
5. transfer erc20 token from wallet account to another account with paymaster
   1. `yarn run simpleAccount erc20Transfer --token <erc20-contract-address> --to <to-address> --amount <amount> --withPaymaster`
   2. `yarn run simpleAccount erc20Transfer --token 0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1 --to 0xf4aAA4b38a0E749415E37638879BeDfe47645a77 --amount 0.01 --withPaymaster`
