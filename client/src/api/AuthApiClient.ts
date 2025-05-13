import { TmResponse } from '@/types/common/utils/TmResponse'
import { API_URL } from '../constants/API_URL'
import { ApiClientChildren, ApiClientChildrenProps } from './base/ApiClientChildren'

export class AuthApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  public async login(body: { firebaseToken: string }) {
    try {
      const response = await this.httpClient.post<TmResponse<{ token: string }>>(
        `${API_URL}/auth/login`,
        body,
      )
      return response
    } catch (error) {
      console.error('Login error:', error)
      return {
        status: 'error',
        data: {
          message: 'Errow in login request',
        },
      }
    }
  }

  public async registerCitizen(body: { email: string; firebaseToken: string }) {
    try {
      const response = await this.httpClient.post<TmResponse<{ token: string }>>(
        `${API_URL}/auth/register-citizen`,
        body,
      )
      return response
    } catch (error) {
      console.error('Register Citizen error:', error)
      return {
        status: 'error',
        data: {
          message: 'Errow in registerCitizen request',
        },
      }
    }
  }
}
