import { UserOperationStruct } from '@account-abstraction/contracts'
import { PaymasterAPI } from '@account-abstraction/sdk'
import 'dotenv/config'

const PAYMASTER_AND_DATA = process.env.PAYMASTER_ADDRESS

class VerifyingPaymasterAPI extends PaymasterAPI {
  private paymasterUrl: string
  private entryPoint: string
  constructor(paymasterUrl: string, entryPoint: string) {
    super()
    this.paymasterUrl = paymasterUrl
    this.entryPoint = entryPoint
  }

  async getPaymasterAndData(userOp: Partial<UserOperationStruct>): Promise<string> {
    return PAYMASTER_AND_DATA!
  }
}

export const getVerifyingPaymaster = (paymasterUrl: string, entryPoint: string) =>
  new VerifyingPaymasterAPI(paymasterUrl, entryPoint)
