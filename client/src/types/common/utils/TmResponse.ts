export type TmErrorResponse = {
  status: 'error'
  data: {
    message: string
  }
}

/**
 * Represents a response type that can either indicate success or error.
 *
 * @template T - The type of the data returned in a successful response.
 *
 * @typedef TmResponse
 * @property {'success'} status - Indicates a successful response.
 * @property {T} data - The data returned in a successful response.
 *
 * @property {'error'} status - Indicates an error response.
 * @property {Object} data - The data returned in an error response.
 * @property {string} data.message - The error message describing the issue.
 */
export type TmResponse<T> =
  | {
      status: 'success'
      data: T
    }
  | TmErrorResponse
