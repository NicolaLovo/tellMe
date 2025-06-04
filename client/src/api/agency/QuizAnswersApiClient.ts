import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { QuizAnswer } from '@/types/quiz/answer/QuizAnswer'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'

/**
 * API client for managing quizzes within an agency
 * /api/v1/agencies/:agencyId/quizzes/:quizId/answers/:uid
 */
export class QuizAnswersApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  /**
   * Create a new quiz answer for the specified user and quiz
   * returns the id if it was successfully created, otherwise
   */
  public async create(
    params: {
      agencyId: string
      quizId: string
      uid: string
    },
    body: { quizAnswer: QuizAnswer },
  ): Promise<TmResponse<{ answerId: QuizAnswer['_id'] }>> {
    try {
      const response = await this.httpClient.post<TmResponse<{ answerId: QuizAnswer['_id'] }>>(
        `${API_URL}/api/v1/agencies/${params.agencyId}/quizzes/${params.quizId}/answers/${params.uid}`,
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
