import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Survey } from '@/types/survey/Survey'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { TownCouncilSurveyResultsApiClient } from './TownCouncilSurveyResultsApiClient'

/**
 * Api client for the Town Council survey
 * api/v1/surveys/:surveyId
 */
export class TownCouncilSurveyApiClient extends ApiClientChildren {
  surveyresults: TownCouncilSurveyResultsApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.surveyresults = new TownCouncilSurveyResultsApiClient(props)
  }

  /**
   * Reads a survey
   */
  public async read(params: { surveyId: string }): Promise<TmResponse<{ survey: Survey }>> {
    try {
      const response = await this.httpClient.get<TmResponse<{survey: Survey}>>(
        `${API_URL}/api/v1/surveys/${params.surveyId}`,
      )

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Read survey error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in read survey request',
        },
      }
    }
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
        `${API_URL}/api/v1/surveys/${params.surveyId}`,
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

  /**
   * Gets survey results by survey ID
   */
}
