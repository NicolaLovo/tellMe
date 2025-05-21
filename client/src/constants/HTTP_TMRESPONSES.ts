import { TmErrorResponse } from '@/types/common/utils/TmResponse'

/**
 * A constant object containing standard HTTP response templates for TellMe client.
 */
export const HTTP_TMRESPONSES: {
  /**
   * The default error response, conforming to the `TmErrorResponse` type,
   *   with a status of 'error' and a generic error message for HTTP requests.
   */
  error: TmErrorResponse
} = {
  error: {
    status: 'error',
    data: {
      message: 'Error in HTTP request',
    },
  },
}
