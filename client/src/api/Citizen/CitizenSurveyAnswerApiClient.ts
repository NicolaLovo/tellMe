//api/v1 / citizens /: id
import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { SurveyAnswer } from '../../types/survey/answer/SurveyAnswer'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'

//api/v1/citizens/:id/surveys/:surveyId/answer
export class CitizenSurveysAnswerApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }
  /**
   * Gets a survey answer by survey and user ID.
   */
  public async read(params: {
    uid: string
    surveyId: string
  }): Promise<TmResponse<{ surveyAnswer: SurveyAnswer }>> {
    try {
      const response = await this.httpClient.get<TmResponse<{ surveyAnswer: SurveyAnswer }>>(
        `${API_URL}/api/v1/citizens/${params.uid}surveys/${params.surveyId}/answer`,
      )

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Read survey error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in reading survey answer',
        },
      }
    }
  }
}
