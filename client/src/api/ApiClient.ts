import { AuthApiClient } from './AuthApiClient'
import { TownCouncilApiClient } from './TownCouncil/TownCouncilApiClient'

interface ApiClientProps {
  jwtToken?: string | null
}

export class ApiClient {
  private jwtToken: string | null

  private authApiClient: AuthApiClient
  static townCouncil: any
  constructor({ jwtToken }: ApiClientProps) {
    this.jwtToken = jwtToken || null
    this.authApiClient = new AuthApiClient({ jwtToken: this.jwtToken })
  }

  private _townCouncil = new TownCouncilApiClient()

  get townCouncil() {
    return this._townCouncil
  }

  get auth() {
    return this.authApiClient
  }
}

