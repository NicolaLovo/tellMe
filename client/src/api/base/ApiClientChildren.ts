import { HttpClient } from './HttpClient'

export interface ApiClientChildrenProps {
  /**
   * JWT token for authentication. Set to null if not authenticated.
   */
  jwtToken: string | null
}

/**
 * Abstract base class for API client children that provides common functionality
 * such as JWT token management and HTTP client instantiation.
 *
 * @remarks
 * Extend this class to implement specific API clients that require authentication
 * and HTTP request handling.
 *
 * @example
 * ```typescript
 * class UserApiClient extends ApiClientChildren {
 *   // Implement user-specific API methods here
 * }
 * ```
 *
 * @public
 */
export abstract class ApiClientChildren {
  protected jwtToken: string | null
  protected httpClient: HttpClient

  constructor({ jwtToken }: ApiClientChildrenProps) {
    this.jwtToken = jwtToken
    this.httpClient = new HttpClient({ jwtToken })
  }

  /**
   * Append queries to a URL
   *
   * Note that if I append multiple values for the same key, it will append them as separate query parameters
   * Express will parse them as an array
   *
   * @example
   *
   * /api/v1/userProjects?keys=1&keys=2&keys=3 will be parsed as { keys: [1, 2, 3] }
   */
  protected appendQueriesToUrl(url: string, queries: Record<string, string | number | boolean>) {
    const urlWithQueries = new URL(url)
    Object.entries(queries).forEach(([key, value]) => {
      if (value === undefined) {
        return
      }

      if (Array.isArray(value)) {
        value.forEach((val) => {
          urlWithQueries.searchParams.append(key, val.toString())
        })
        return
      }

      const stringifiedValue = ((): string => {
        switch (typeof value) {
          case 'string':
            return value
          case 'number':
          case 'boolean':
            return value.toString()
        }
      })()
      urlWithQueries.searchParams.append(key, stringifiedValue)
    })
    return urlWithQueries.toString()
  }
}
