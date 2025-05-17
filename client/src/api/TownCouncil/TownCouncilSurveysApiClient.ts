import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Survey } from '@/types/survey/Survey'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'

export class TownCouncilSurveysApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  public async create(survey: Survey): Promise<TmResponse<any>> {
    try {
      const response = await this.httpClient.post<TmResponse<any>>(`/api/v1/surveys`, survey)
      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Survey creation error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error during survey creation',
        },
      }
    }
  }
}
