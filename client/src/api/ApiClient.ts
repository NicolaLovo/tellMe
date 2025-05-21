import { AuthApiClient } from './AuthApiClient'
import { TownCouncilApiClient } from './TownCouncil/TownCouncilApiClient'

interface ApiClientProps {
  jwtToken?: string | null
}

/**
 * Root API client class
 * Wraps and provides access to other API clients
 */
export class ApiClient {
  private jwtToken: string | null

  private authApiClient: AuthApiClient
  private townCouncilApiClient: TownCouncilApiClient

  constructor({ jwtToken }: ApiClientProps) {
    this.jwtToken = jwtToken || null
    this.authApiClient = new AuthApiClient({ jwtToken: this.jwtToken })
    this.townCouncilApiClient = new TownCouncilApiClient({ jwtToken: this.jwtToken })
  }

  /**
   * Provides access to the Authentication API client.
   */
  get auth() {
    return this.authApiClient
  }

  /**
   * Provides access to the API client for the Town Council
   */
  get townCouncil() {
    return this.townCouncilApiClient
  }
}
