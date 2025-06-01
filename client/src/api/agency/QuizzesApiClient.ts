import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Quiz } from '@/types/quiz/Quiz'
import { QuizResults } from '@/types/quiz/QuizResults'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { QuizAnswersApiClient } from './QuizAnswersApiClient'

/**
 * API client for managing quizzes within an agency
 * /api/v1/agencies/:agencyId/quizzes
 */
export class QuizzesApiClient extends ApiClientChildren {
  private quizAnswersApiClient: QuizAnswersApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.quizAnswersApiClient = new QuizAnswersApiClient(props)
  }

  public get answers() {
    return this.quizAnswersApiClient
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

  /**
   * Read the aggregated results of completed quiz answers
   */
  public async readResults(params: {
    agencyId: string
    quizId: string
  }): Promise<TmResponse<{ results: QuizResults }>> {
    try {
      const response = await this.httpClient.get<TmResponse<{ results: QuizResults }>>(
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
