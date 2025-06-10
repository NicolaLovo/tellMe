import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { CitizenQuizzesApiClient } from './CitizenQuizzesApiClient'
import { CitizenSurveysApiClient } from './CitizenSurveysApiClient'

//api/v1/citizens/:id
export class CitizenApiClient extends ApiClientChildren {
  surveys: CitizenSurveysApiClient
  quizzes: CitizenQuizzesApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.surveys = new CitizenSurveysApiClient(props)
    this.quizzes = new CitizenQuizzesApiClient(props)
  }
}
