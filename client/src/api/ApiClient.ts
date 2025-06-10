import { AgenciesApiClient } from './agency/AgenciesApiClient'
import { AuthApiClient } from './AuthApiClient'
import { CitizensApiClient } from './citizen/CitizensApiClient'
import { PrizesApiClient } from './prizes/PrizesApiClient'
import { TownCouncilApiClient } from './townCouncil/TownCouncilApiClient'

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
  private citizensApiClient: CitizensApiClient
  private agenciesApiClient: AgenciesApiClient
  private prizesApiClient: PrizesApiClient

  constructor({ jwtToken }: ApiClientProps) {
    this.jwtToken = jwtToken || null
    this.authApiClient = new AuthApiClient({ jwtToken: this.jwtToken })
    this.townCouncilApiClient = new TownCouncilApiClient({ jwtToken: this.jwtToken })
    this.citizensApiClient = new CitizensApiClient({ jwtToken: this.jwtToken })
    this.agenciesApiClient = new AgenciesApiClient({ jwtToken: this.jwtToken })
    this.prizesApiClient = new PrizesApiClient({ jwtToken: this.jwtToken })
  }

  /**
   * Provides access to the Authentication API client.
   */
  public get auth() {
    return this.authApiClient
  }

  /**
   * Provides access to the API client for the Town Council
   */
  public get townCouncil() {
    return this.townCouncilApiClient
  }

  /**
   * Provides access to the API client for Citizens
   */
  public get citizens() {
    return this.citizensApiClient
  }

  /**
   * Provides access to the API client for Agencies
   */
  public get agencies() {
    return this.agenciesApiClient
  }

  /**
   * Provides access to the API client for Prizes
   */
  public get prizes() {
    return this.prizesApiClient
  }
}
