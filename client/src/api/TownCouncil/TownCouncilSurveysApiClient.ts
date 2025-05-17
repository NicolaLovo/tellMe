import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'

export class TownCouncilSurveysApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  public async createSurvey(data: any): Promise<TmResponse<any>> {
    try {
      const response = await this.httpClient.post<TmResponse<any>>(`/api/v1/surveys`, data)
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
