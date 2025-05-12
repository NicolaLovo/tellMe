interface ApiClientProps {
  jwtToken: string | null
}

export class ApiClient {
  private jwtToken: string | null

  constructor({ jwtToken }: ApiClientProps) {
    this.jwtToken = jwtToken
  }
}
