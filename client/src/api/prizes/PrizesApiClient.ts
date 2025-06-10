import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Prize } from '@/types/prizes/Prize'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'

/**
 * Class responsible for managing the prizes.
 */
export class PrizesApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  /**
   * Create a new prize, returns the id if it was successfully created, otherwise
   * an error response if the request fails
   */
  public async create(body: { prize: Prize }): Promise<TmResponse<{ prizeId: string }>> {
    try {
      const response = await this.httpClient.post<TmResponse<{ prizeId: string }>>(
        `${API_URL}/api/v1/prizes`,
        body,
      )

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Create Prize error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in Create Prize request',
        },
      }
    }
  }

  /**
   * List the prizes saved in the system
   */
  public async list(queries: {
    /**
     * 0-based index of the first item in the current page.
     *
     * @default 0
     */
    pageIndex?: string
    /**
     * Number of items to include in the current page.
     *
     * @default 10
     */
    pageSize?: string
  }): Promise<
    TmResponse<{
      prizes: Prize[]
      metadata: {
        /**
         * Total number of items that satisfy the query.
         */
        totalCount: number
      }
    }>
  > {
    try {
      const baseUrl = `${API_URL}/api/v1/prizes`
      const urlWithQueries = this.appendQueriesToUrl(baseUrl, queries)

      type ReturnType = TmResponse<{
        prizes: Prize[]
        metadata: {
          totalCount: number
        }
      }>

      const response = await this.httpClient.get<ReturnType>(urlWithQueries)

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('List Prizes error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in List Prizes request',
        },
      }
    }
  }
}
