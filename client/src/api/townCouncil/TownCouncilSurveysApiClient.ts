import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Survey } from '@/types/survey/Survey'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { TownCouncilSurveyApiClient } from './TownCouncilSurveyApiClient'

/**
 * Class responsible for managing the Town Council surveys.
 */
export class TownCouncilSurveysApiClient extends ApiClientChildren {
  public survey: TownCouncilSurveyApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.survey = new TownCouncilSurveyApiClient(props)
  }

  /**
   * Create a new survey, returns the id if it was successfully created, otherwise
   * an error response if the request fails
   */
  public async create(body: { survey: Survey }): Promise<TmResponse<{ surveyId: string }>> {
    try {
      const response = await this.httpClient.post<TmResponse<{ surveyId: string }>>(
        `${API_URL}/api/v1/surveys`,
        body,
      )

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Create Survey error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in Create Survey request',
        },
      }
    }
  }

  /**
   * List the surveys saved in the system
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
      surveys: Survey[]
      metadata: {
        /**
         * Total number of items that satisfy the query.
         */
        totalCount: number
      }
    }>
  > {
    try {
      const baseUrl = `${API_URL}/api/v1/surveys`
      const urlWithQueries = this.appendQueriesToUrl(baseUrl, queries)

      type ReturnType = TmResponse<{
        surveys: Survey[]
        metadata: {
          totalCount: number
        }
      }>

      const response = await this.httpClient.get<ReturnType>(urlWithQueries)

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('List Surveys error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in List Surveys request',
        },
      }
    }
  }
}
