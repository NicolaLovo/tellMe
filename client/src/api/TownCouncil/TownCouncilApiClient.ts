import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { TownCouncilSurveysApiClient } from './TownCouncilSurveysApiClient'

//API client for the Town Council
export class TownCouncilApiClient extends ApiClientChildren {
  public surveys: TownCouncilSurveysApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.surveys = new TownCouncilSurveysApiClient(props)
  }
}
