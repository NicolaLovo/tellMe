import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Survey } from '@/types/survey/Survey'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { TownCouncilSurveysApiClient } from './TownCouncilSurveysApiClient'

export class TownCouncilApiClient extends ApiClientChildren {
  public surveys: TownCouncilSurveysApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.surveys = new TownCouncilSurveysApiClient(props)
  }

  public async createSurvey(survey: Survey): Promise<TmResponse<{ success: boolean }>> {
    try {
      const response = await this.httpClient.post<TmResponse<{ success: boolean }>>(
        `${API_URL}/api/v1/town-council/surveys/create`,
        survey,
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
}
