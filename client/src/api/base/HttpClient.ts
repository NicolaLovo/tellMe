import axios, { AxiosResponse } from 'axios'

interface HttpClientProps {
  jwtToken?: string | null
}

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
