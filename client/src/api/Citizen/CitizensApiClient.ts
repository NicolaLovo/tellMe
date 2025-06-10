import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { CitizenApiClient } from './CitizenApiClient'

//api/v1/citizens
export class CitizensApiClient extends ApiClientChildren {
  private citizenApiClient: CitizenApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.citizenApiClient = new CitizenApiClient(props)
  }

  public get citizen() {
    return this.citizenApiClient
  }

  /**
   * Fetches a citizen by their email address
   */
  public async readCitizenByEmail(queries: {
    email: string
  }): Promise<TmResponse<{ uid: string }>> {
    try {
      const baseUrl = `${API_URL}/api/v1/citizens`
      const urlWithQueries = this.appendQueriesToUrl(baseUrl, queries)

      const response = await this.httpClient.get<TmResponse<{ uid: string }>>(urlWithQueries)

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Read citizen error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in reading citizen',
        },
      }
    }
  }
}
