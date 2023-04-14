import fs from 'fs/promises'
import path from 'path'
import prettier from 'prettier'
import { ethers } from 'ethers'

const INIT_CONFIG = {
  bundlerUrl: 'https://node.stackup.sh/v1/rpc/<API-KEY>',
  rpcUrl: 'https://node.stackup.sh/v1/rpc/<API-KEY>',
  signingKey: new ethers.Wallet(ethers.utils.randomBytes(32)).privateKey,
  entryPoint: '0x0576a174D229E3cFA37253523E645A78A0C91B57',
  simpleAccountFactory: '0x71D63edCdA95C61D6235552b5Bc74E32d8e2527B',
  paymasterUrl: 'https://app.stackup.sh/api/v2/paymaster/payg/<API-KEY>',
}
const CONFIG_PATH = path.resolve(__dirname, '../config.json')

async function main() {
  return fs.writeFile(CONFIG_PATH, prettier.format(JSON.stringify(INIT_CONFIG, null, 2), { parser: 'json' }))
}

main()
  .then(() => console.log(`Config written to ${CONFIG_PATH}`))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
