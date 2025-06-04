import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Quiz } from '@/types/quiz/Quiz'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { QuizAnswersApiClient } from './QuizAnswersApiClient'

/**
 * API client for managing quizzes within an agency
 * /api/v1/agencies/:agencyId/quizzes/:quizId
 */
export class QuizApiClient extends ApiClientChildren {
  private quizAnswersApiClient: QuizAnswersApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.quizAnswersApiClient = new QuizAnswersApiClient(props)
  }

  public get answers() {
    return this.quizAnswersApiClient
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
      >(`/api/v1/agencies/${params.agencyId}/quizzes/${params.quizId}`)

      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Read Quiz error:', error)
      return HTTP_TMRESPONSES.error
    }
  }
}
