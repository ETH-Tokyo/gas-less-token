import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-solhint'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'dotenv/config'
import 'hardhat-contract-sizer'
import 'hardhat-gas-reporter'
import 'hardhat-interface-generator'
import 'solidity-coverage'

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const LOCAL_PRIVATE_KEY = process.env.LOCAL_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    local: {
      url: 'http://localhost:8545',
      accounts: [`${LOCAL_PRIVATE_KEY}`],
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
    token: 'ETH',
  },
}
