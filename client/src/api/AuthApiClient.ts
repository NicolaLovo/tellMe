import { ApiClientChildren, ApiClientChildrenProps } from './ApiClientChildren'

export class AuthApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  // public async login(body: { firebaseToken: string }): Promise<
  //   TmResponse<{
  //     token: string
  //   }>
  // > {
  //   return null as any
  // }
}
