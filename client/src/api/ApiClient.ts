import { AuthApiClient } from './AuthApiClient'

interface ApiClientProps {
  jwtToken?: string | null
}

export class ApiClient {
  private jwtToken: string | null

  private authApiClient: AuthApiClient
  constructor({ jwtToken }: ApiClientProps) {
    this.jwtToken = jwtToken || null
    this.authApiClient = new AuthApiClient({ jwtToken: this.jwtToken })
  }

  get auth() {
    return this.authApiClient
  }
}
