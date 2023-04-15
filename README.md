# gas-less-token

https://gas-less-token.vercel.app/

## description

At the hackathon, We are excited to develop a protocol that utilizes Account Abstraction (AA) to enable community tokens to cover gas fees. This protocol is designed with Decentralized Autonomous Organizations (DAOs) in mind, particularly those that use non-marketable tokens to form their communities, as market fluctuations can sometimes negatively impact community engagement.

Within these communities, there is a demand for ways to provide utility to tokens without tying them to a market. To address this need, We plan to develop a tool that allows community members to pay gas fees using their community tokens when interacting with decentralized applications (dApps) developed within the community. The community's treasury would cover the actual gas fees on behalf of the members. By doing so, We believe we can encourage the development of dApps within the community, create incentives for obtaining community tokens, and ultimately contribute to the expansion and success of the community.

## architecture

![](/architecture.png)

## How it's made

We developed our product using the following technology stacks.

1. what we used: ERC4337

- ERC4337 made it possible to pay for gas by community token.

2. tech stacks: smart contract

- polygon chain
- solidity / hardhat / openzeppelin

3. tech stacks: front-end

- next.js / react / typescript
- ethers.js / wagmi / rainbowkit
