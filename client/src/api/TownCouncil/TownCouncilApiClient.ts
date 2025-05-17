// api/townCouncil/TownCouncilApiClient.ts
import { TownCouncilSurveysApiClient } from "./TownCouncilSurveysApiClient"

export class TownCouncilApiClient {
  private _surveys: TownCouncilSurveysApiClient

  constructor() {
    this._surveys = new TownCouncilSurveysApiClient()
  }

  get surveys(): TownCouncilSurveysApiClient {
    return this._surveys
  }
}
