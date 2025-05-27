import { HTTP_TMRESPONSES } from '@/constants/HTTP_TMRESPONSES'
import { TmResponse } from '@/types/common/utils/TmResponse'
import { API_URL } from '../constants/API_URL'
import { ApiClientChildren, ApiClientChildrenProps } from './base/ApiClientChildren'

/**
 * API client class responsible for authentication
 */
export class AuthApiClient extends ApiClientChildren {
  constructor(props: ApiClientChildrenProps) {
    super(props)
  }

  /**
   * Sends a login request using a Firebase token
   */
  public async login(body: { firebaseToken: string }): Promise<TmResponse<{ token: string }>> {
    try {
      const response = await this.httpClient.post<TmResponse<{ token: string }>>(
        `${API_URL}/api/v1/auth/login`,
        body,
      )
      return response ?? HTTP_TMRESPONSES.error
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

  /**
   * Registers a new citizen user using an email and a Firebase token.
   */
  public async registerCitizen(body: {
    email: string
    firebaseToken: string
  }): Promise<TmResponse<{ token: string }>> {
    try {
      const response = await this.httpClient.post<TmResponse<{ token: string }>>(
        `${API_URL}/api/v1/auth/citizens`,
        body,
      )
      return response ?? HTTP_TMRESPONSES.error
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

  /**
   * Registers a new agency user using an email and a Firebase token.
   */
  public async registerAgency(body: {
    email: string
    firebaseToken: string
  }): Promise<TmResponse<{ token: string }>> {
    try {
      const response = await this.httpClient.post<TmResponse<{ token: string }>>(
        `${API_URL}/api/v1/auth/agencies`,
        body,
      )
      return response ?? HTTP_TMRESPONSES.error
    } catch (error) {
      console.error('Register Agency error:', error)
      return {
        status: 'error',
        data: {
          message: 'Errore nella richiesta di registrazione agenzia',
        },
      }
    }
  }
}
