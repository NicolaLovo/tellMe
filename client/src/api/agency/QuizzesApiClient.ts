import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Quiz } from '@/types/quiz/Quiz'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { QuizApiClient } from './QuizApiClient'

/**
 * API client for managing quizzes within an agency
 * /api/v1/agencies/:agencyId/quizzes
 */
export class QuizzesApiClient extends ApiClientChildren {
  private quizApiClient: QuizApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.quizApiClient = new QuizApiClient(props)
  }

  public get quiz() {
    return this.quizApiClient
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
   * List the quizzes saved in the system
   */
  public async list(
    queries: {
      /**
       * 0-based index of the first item in the current page.
       *
       * @default 0
       */
      pageIndex?: string
      /**
       * Number of items to include in the current page.
       *
       * @default 10
       */
      pageSize?: string
    },
    params: { agencyId: string },
  ): Promise<
    TmResponse<{
      quizzes: Quiz[]
      metadata: {
        /**
         * Total number of items that satisfy the query.
         */
        totalCount: number
      }
    }>
  > {
    try {
      const baseUrl = `${API_URL}/api/v1/agencies/${params.agencyId}/quizzes`
      const urlWithQueries = this.appendQueriesToUrl(baseUrl, queries)

      type ReturnType = TmResponse<{
        quizzes: Quiz[]
        metadata: {
          totalCount: number
        }
      }>

      const response = await this.httpClient.get<ReturnType>(urlWithQueries)

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('List quizzes error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in List quizzes request',
        },
      }
    }
  }
}
