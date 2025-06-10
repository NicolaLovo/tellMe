import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { QuizAnswer } from '@/types/quiz/answer/QuizAnswer'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'

//api/v1 / citizens /: id / quizzes
export class CitizenQuizzesApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
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
    params: { citizenId: string },
  ): Promise<
    TmResponse<{
      quizzes: QuizAnswer[]
      metadata: {
        totalCount: number
      }
    }>
  > {
    try {
      const baseUrl = `${API_URL}/api/v1/citizens/${params.citizenId}/quizzes`
      const urlWithQueries = this.appendQueriesToUrl(baseUrl, queries)

      type ReturnType = TmResponse<{
        quizzes: QuizAnswer[]
        metadata: {
          totalCount: number
        }
      }>

      const response = await this.httpClient.get<ReturnType>(urlWithQueries)

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('List Quizzes error:', error)
      return {
        status: 'error',
        data: {
          message: 'Error in List Quizzes request',
        },
      }
    }
  }
}
