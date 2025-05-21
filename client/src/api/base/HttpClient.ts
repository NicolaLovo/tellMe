import axios, { AxiosResponse } from 'axios'

interface HttpClientProps {
  /**
   * JWT token for authentication. Set to null if not authenticated.
   */
  jwtToken?: string | null
}

/**
 * A simple HTTP client wrapper for making GET, POST, PUT, and DELETE requests using Axios.
 *
 * Handles JWT authentication by including a Bearer token in the Authorization header if provided.
 * Each method returns the response data or `null` if an error occurs.
 *
 * @example
 * ```typescript
 * const client = new HttpClient({ jwtToken: 'your-jwt-token' });
 * const data = await client.get<MyType>('https://api.example.com/resource');
 * ```
 */
export class HttpClient {
  private jwtToken: string | null
  constructor({ jwtToken }: HttpClientProps) {
    this.jwtToken = jwtToken ?? null
  }

  public async get<T>(url: string): Promise<T | null> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      if (this.jwtToken) {
        headers['Authorization'] = `Bearer ${this.jwtToken}`
      }

      const axiosRes: AxiosResponse<T> = await axios.get(url, { headers })

      return axiosRes.data
    } catch (error) {
      console.error(`Error at httpClient.GET route: ${url}`, error)
      return null
    }
  }

  public async post<T>(url: string, body: object): Promise<T | null> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (this.jwtToken) {
        headers['Authorization'] = `Bearer ${this.jwtToken}`
      }

      const axiosRes: AxiosResponse<T> = await axios.post(url, body, {
        headers,
      })

      return axiosRes.data
    } catch (error) {
      console.error(`Error at httpClient.POST route: ${url}`, error)
      return null
    }
  }

  public async put<T>(url: string, body: object): Promise<T | null> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (this.jwtToken) {
        headers['Authorization'] = `Bearer ${this.jwtToken}`
      }

      const axiosRes: AxiosResponse<T> = await axios.put(url, body, {
        headers,
      })

      return axiosRes.data
    } catch (error) {
      console.error(`Error at httpClient.PUT route: ${url}`, error)
      return null
    }
  }

  public async delete<T>(url: string): Promise<T | null> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (this.jwtToken) {
        headers['Authorization'] = `Bearer ${this.jwtToken}`
      }

      const axiosRes: AxiosResponse<T> = await axios.delete(url, {
        headers,
      })

      return axiosRes.data
    } catch (error) {
      console.error(`Error at httpClient.DELETE route: ${url}`, error)
      return null
    }
  }
}
