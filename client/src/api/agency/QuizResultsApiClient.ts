import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { QuizResults } from '@/types/quiz/QuizResults'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'

/**
 * API client for managing quizzes within an agency
 * /api/v1/agencies/:agencyId/quizzes/:quizId
 */
export class QuizResultsApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  /**
   * Read the aggregated results of completed quiz answers
   */
  public async read(params: {
    agencyId: string
    quizId: string
  }): Promise<TmResponse<{ quizResults: QuizResults }>> {
    try {
      const response = await this.httpClient.get<TmResponse<{ quizResults: QuizResults }>>(
        `${API_URL}/api/v1/agencies/${params.agencyId}/quizzes/${params.quizId}/results`,
      )

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Read Quiz Results error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in Read Quiz Results request',
        },
      }
    }
  }
}
