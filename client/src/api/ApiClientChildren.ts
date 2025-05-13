export interface ApiClientChildrenProps {
  jwtToken: string | null;
}

export abstract class ApiClientChildren {
  protected jwtToken: string | null

  constructor({ jwtToken }: ApiClientChildrenProps) {
    this.jwtToken = jwtToken
  }
}
