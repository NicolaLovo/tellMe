import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Quiz } from '@/types/quiz/Quiz'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'

/**
 * API client for managing quizzes within an agency
 * /api/v1/agencies/:agencyId/quizzes
 */
export class QuizzesApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  /**
   * Create a new quiz, returns the id if it was successfully created, otherwise
   * an error response if the request fails
   */
  public async create(
    params: { agencyId: string },
    body: { quiz: Quiz },
  ): Promise<TmResponse<{ quizId: string }>> {
    try {
      const response = await this.httpClient.post<TmResponse<{ quizId: string }>>(
        `${API_URL}/api/v1/agencies/${params.agencyId}/quizzes`,
        body,
      )

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Create Quiz error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in Create Quiz request',
        },
      }
    }
  }
}
