import { AuthApiClient } from './AuthApiClient'
import { TownCouncilApiClient } from './TownCouncil/TownCouncilApiClient'

interface ApiClientProps {
  jwtToken?: string | null
}

export class ApiClient {
  private jwtToken: string | null

  private authApiClient: AuthApiClient
  private townCouncilApiClient: TownCouncilApiClient

  constructor({ jwtToken }: ApiClientProps) {
    this.jwtToken = jwtToken || null
    this.authApiClient = new AuthApiClient({ jwtToken: this.jwtToken })
    this.townCouncilApiClient = new TownCouncilApiClient({ jwtToken: this.jwtToken })
  }

  get auth() {
    return this.authApiClient
  }

  get townCouncil() {
    return this.townCouncilApiClient
  }
}
