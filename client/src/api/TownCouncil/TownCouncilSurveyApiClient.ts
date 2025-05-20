import { Survey } from '@/types/survey/Survey'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'

//API client for the Town Council survey 
export class TownCouncilSurveyApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  /**
   * Updates a survey
   */
  public async update(
    params: { surveyId: string },
    body: { survey: Partial<Survey> },
  ): Promise<TmResponse<{ surveyId: string }>> {
    try {
      const response = await this.httpClient.put<TmResponse<{ surveyId: string }>>(
        `${API_URL}/api/v1/townCouncil/surveys/${params.surveyId}`,
        body,
      )

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Update survey error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in update survey request',
        },
      }
    }
  }
}
