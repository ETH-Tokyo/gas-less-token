import { TokenPaymaster__factory } from '../../typechain-types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import 'dotenv/config'
import { ethers } from 'hardhat'

async function main() {
  const PAYMASTER_ADDRESS = process.env.PAYMASTER_ADDRESS
  const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS

  // account check
  const deployer = (await ethers.getSigners())[0] as SignerWithAddress
  const balance = (await deployer.getBalance()).toString()
  console.log('calling contract with the account:', deployer.address)
  console.log('account balance:', balance)

  // TokenPaymaster
  const paymaster = TokenPaymaster__factory.connect(PAYMASTER_ADDRESS!, deployer)

  // get level and rate
  const { level, rate } = await paymaster.connect(deployer).getLevelAndRate(ACCOUNT_ADDRESS!)
  console.log('account:', ACCOUNT_ADDRESS!, 'level:', level.toString(), 'rate:', rate.toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
