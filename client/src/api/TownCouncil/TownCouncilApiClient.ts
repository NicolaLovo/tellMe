import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { Survey } from '@/types/survey/Survey'
import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { TownCouncilSurveysApiClient } from './TownCouncilSurveysApiClient'

export class TownCouncilApiClient extends ApiClientChildren {
  public surveys: TownCouncilSurveysApiClient

  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.surveys = new TownCouncilSurveysApiClient(props)
  }

}
