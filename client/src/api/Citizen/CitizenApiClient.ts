import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { CitizenSurveysApiClient } from './CitizenSurveysApiClient'

//api/v1/citizens/:id/survey
export class CitizenApiClient extends ApiClientChildren {
  surveys: CitizenSurveysApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.surveys = new CitizenSurveysApiClient(props)
  }
}
