import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { QuizzesApiClient } from './QuizzesApiClient'

/**
 * API client for managing agency-specific operations
 * /api/v1/agencies/:agencyId
 */
export class AgencyApiClient extends ApiClientChildren {
  private quizzesApiClient: QuizzesApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.quizzesApiClient = new QuizzesApiClient(props)
  }

  public get quizzes() {
    return this.quizzesApiClient
  }
}
