import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Quiz } from '@/types/quiz/Quiz'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { QuizAnswersApiClient } from './QuizAnswersApiClient'
import { QuizResultsApiClient } from './QuizResultsApiClient'

/**
 * API client for managing quizzes within an agency
 * /api/v1/agencies/:agencyId/quizzes/:quizId
 */
export class QuizApiClient extends ApiClientChildren {
  private quizAnswersApiClient: QuizAnswersApiClient
  private quizResultsApiClient: QuizResultsApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.quizAnswersApiClient = new QuizAnswersApiClient(props)
    this.quizResultsApiClient = new QuizResultsApiClient(props)
  }

  public get answers() {
    return this.quizAnswersApiClient
  }

  public get results() {
    return this.quizResultsApiClient
  }

  public async read(params: { agencyId: string; quizId: string }): Promise<
    TmResponse<{
      quiz: Quiz
    }>
  > {
    try {
      const response = await this.httpClient.get<
        TmResponse<{
          quiz: Quiz
        }>
      >(`${API_URL}/api/v1/agencies/${params.agencyId}/quizzes/${params.quizId}`)

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Read Quiz error:', error)
      return HTTP_TMRESPONSES.error
    }
  }
}
