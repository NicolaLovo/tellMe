//api/v1 / citizens /: id
import { API_URL } from '@/constants/API_URL'
import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'

import { ApiClientChildren, ApiClientChildrenProps } from '../base/ApiClientChildren'
import { CitizenSurveysApiClient } from './CitizenSurveysApiClient'

//api/v1/citizens/:id
export class CitizenApiClient extends ApiClientChildren {
  surveys: CitizenSurveysApiClient
  
  constructor(props: ApiClientChildrenProps) {
    super(props)
    this.surveys = new CitizenSurveysApiClient(props)
  }
  
  


}
