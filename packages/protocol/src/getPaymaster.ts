import { UserOperationStruct } from '@account-abstraction/contracts'
import { PaymasterAPI } from '@account-abstraction/sdk'

class VerifyingPaymasterAPI extends PaymasterAPI {
  private paymaster: string
  constructor(paymasterUrl: string) {
    super()
    this.paymaster = paymasterUrl
  }

  async getPaymasterAndData(userOp: Partial<UserOperationStruct>): Promise<string> {
    return this.paymaster
  }
}

export const getVerifyingPaymaster = (paymaster: string) => new VerifyingPaymasterAPI(paymaster)
