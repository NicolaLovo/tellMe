import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { SurveyResult } from '@/types/survey/SuveyResult'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'

/**
 * Api client for the Town Council to get survey results.
 */
export class TownCouncilSurveyResultsApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  /**
   * Reads survey results by survey ID.
   */
  public async read(params: { surveyId: string }): Promise<TmResponse<SurveyResult>> {
    try {
      const response = await this.httpClient.get<TmResponse<SurveyResult>>(
        `${API_URL}/api/v1/surveys/${params.surveyId}/results`,
      )

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Survey result error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in read survey result request',
        },
      }
    }
  }
}
