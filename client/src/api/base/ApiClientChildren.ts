import { HttpClient } from './HttpClient'

export interface ApiClientChildrenProps {
  jwtToken: string | null
}

export abstract class ApiClientChildren {
  protected jwtToken: string | null
  protected httpClient: HttpClient

  constructor({ jwtToken }: ApiClientChildrenProps) {
    this.jwtToken = jwtToken
    this.httpClient = new HttpClient({ jwtToken })
  }
}
