import axios from 'axios'
import { Survey } from '../../types/survey/Survey'

interface CreateSurveyResponse {
  surveyId: string
}

export class TownCouncilSurveysApiClient {
  async create(survey: Survey): Promise<CreateSurveyResponse> {
    try {
      const response = await axios.post<CreateSurveyResponse>(
        'http://localhost:3000/api/town-council/surveys',
        { survey },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )

      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Unknown error'
      throw new Error(message)
    }
  }
}
