import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { AgencyApiClient } from './AgencyApiClient'

/**
 * API client for managing agencies and their specific operations
 * /api/v1/agencies
 */
export class AgenciesApiClient extends ApiClientChildren {
  private agencyApiClient: AgencyApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.agencyApiClient = new AgencyApiClient(props)
  }

  public get agency() {
    return this.agencyApiClient
  }
}
